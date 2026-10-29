/**
 * The headers are stated once and the rows carry only the content, the two
 * sides told apart by their column: the trade's way quiet, ours in ink. A
 * table, because it is one: four rows, two columns, read across.
 */
const ROWS: { other: string; us: string }[] = [
  {
    other: "“Kontakt os for pris”. Du ved først noget, når du har ringet",
    us: "Prisen står på siden. Regn den ud, før du kontakter os",
  },
  {
    other: "Du skal kende midlets navn, før du kan finde det",
    us: "Kategorier efter skadedyr. Du tænker “rotter”, ikke “smækfælde”",
  },
  {
    other: "Alt sælges som en opgave for en fagmand",
    us: "Vi siger det ligeud, når du selv kan klare det med et middel til 49 kr.",
  },
  {
    other: "Garanti og dokumentation er med i prisen. Også hvis du aldrig får brug for dem",
    us: "94 % af vores kunder har i 2026 kun haft brug for én behandling. Vi har ingen garanti eller inkluderede genbesøg, og derfor kan vi holde prisen lavere",
  },
];

export default function Comparison() {
  return (
    <div id="saa-dan" className="versus">
      <h3>Sådan gør vi det anderledes</h3>
      <p className="versus__line">Fire steder branchen gør det besværligt, og hvad vi gør i stedet.</p>
      <table>
        <caption>Sammenligning mod typisk branchepraksis, ikke mod specifikke firmaer.</caption>
        <thead>
          <tr>
            <th scope="col">Sådan gør andre</th>
            <th scope="col">Sådan gør vi</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.us}>
              <td>{r.other}</td>
              <td>{r.us}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
