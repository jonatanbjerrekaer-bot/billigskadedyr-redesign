import { CERTIFICATE_URL, EM_COUNT, EM_SCORE } from "./TrustSeal";

/**
 * The promises billigskadedyr.dk runs above its own header, set as the
 * paper's dateline: one ruled line of facts above the masthead. The coverage
 * line that used to sit as a tracked-caps label over the hero heading lives
 * here now, where a dateline belongs.
 *
 * ponytail: a static row, not a carousel. A carousel would hide promises
 * behind an interaction nobody performs.
 */
const USPS = [
  { label: "Hele Jylland og Fyn", text: "Base i Risskov" },
  { label: "Hos dig på 1-2 hverdage", text: "Akut: ring 24 24 55 83" },
];

export default function UspBar() {
  return (
    <div className="mast-dateline">
      <div className="container">
        <ul>
          {USPS.map(({ label, text }) => (
            <li key={label}>
              <strong>{label}</strong>
              <span>{text}</span>
            </li>
          ))}
          <li>
            <a href={CERTIFICATE_URL} target="_blank" rel="noopener noreferrer">
              e-mærket {String(EM_SCORE).replace(".", ",")} af 5
            </a>{" "}
            <span>{EM_COUNT} bedømmelser</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
