"""Minimal CDP client for scripts/prerender.py (lost /tmp/cdp.py replacement).

Implements only what prerender.py uses: Tab(url, port) with .js(expr, timeout)
and .close(). Talks to the chromium listening on the CDP port, creates a tab,
and evaluates JS with awaitPromise.
"""
import asyncio
import json
import threading
import urllib.request

import websockets

_loop = None
_lock = threading.Lock()


def _get_loop():
    global _loop
    with _lock:
        if _loop is None:
            _loop = asyncio.new_event_loop()
            threading.Thread(target=_loop.run_forever, daemon=True).start()
        return _loop


def _run(coro, timeout):
    return asyncio.run_coroutine_threadsafe(coro, _get_loop()).result(timeout)


async def _open(url, port):
    version = json.load(urllib.request.urlopen(f"http://127.0.0.1:{port}/json/version"))
    ws = await websockets.connect(version["webSocketDebuggerUrl"], max_size=None)
    state = {"id": 0}

    async def cmd(method, params=None, session=None):
        state["id"] += 1
        msg = {"id": state["id"], "method": method, "params": params or {}}
        if session:
            msg["sessionId"] = session
        await ws.send(json.dumps(msg))
        while True:
            raw = json.loads(await ws.recv())
            if raw.get("id") == msg["id"]:
                if "error" in raw:
                    raise RuntimeError(raw["error"])
                return raw.get("result", {})

    target = (await cmd("Target.createTarget", {"url": url}))["targetId"]
    session = (await cmd("Target.attachToTarget", {"targetId": target, "flatten": True}))["sessionId"]
    await cmd("Runtime.enable", session=session)
    return ws, cmd, session, target


class Tab:
    def __init__(self, url, port):
        self._state = _run(_open(url, port), 30)

    def js(self, expr, timeout=30):
        ws, cmd, session, _ = self._state
        r = _run(
            cmd("Runtime.evaluate",
                {"expression": expr, "awaitPromise": True, "returnByValue": True},
                session),
            timeout + 10,
        )
        res = r.get("result", {})
        if res.get("subtype") == "error":
            raise RuntimeError(res.get("description"))
        return res.get("value")

    def close(self):
        ws, cmd, _, target = self._state
        for coro in (cmd("Target.closeTarget", {"targetId": target}), ws.close()):
            try:
                _run(coro, 10)
            except Exception:
                pass
