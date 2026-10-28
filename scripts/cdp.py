"""The little CDP client prerender.py drives: open a tab, evaluate JS, close it.

Lived in /tmp until a reboot took it; now it sits next to its one caller.
"""
import json
import urllib.parse
import urllib.request

from websockets.sync.client import connect


class Tab:
    def __init__(self, url: str, port: int = 9222):
        self.base = f"http://127.0.0.1:{port}"
        req = urllib.request.Request(f"{self.base}/json/new?{urllib.parse.quote(url, safe='')}", method="PUT")
        info = json.load(urllib.request.urlopen(req, timeout=10))
        self.id = info["id"]
        self.ws = connect(info["webSocketDebuggerUrl"], max_size=None)
        self.n = 0

    def js(self, expr: str, timeout: float = 15):
        """The value of expr, with promises awaited; a JS exception raises."""
        self.n += 1
        self.ws.send(json.dumps({"id": self.n, "method": "Runtime.evaluate", "params": {
            "expression": expr, "awaitPromise": True, "returnByValue": True, "timeout": int(timeout * 1000)}}))
        while True:
            msg = json.loads(self.ws.recv(timeout=timeout + 5))
            if msg.get("id") == self.n:
                break
        res = msg.get("result", {})
        if "exceptionDetails" in res:
            raise RuntimeError(res["exceptionDetails"].get("exception", {}).get("description") or res["exceptionDetails"])
        return res.get("result", {}).get("value")

    def close(self):
        self.ws.close()
        urllib.request.urlopen(f"{self.base}/json/close/{self.id}", timeout=10).read()
