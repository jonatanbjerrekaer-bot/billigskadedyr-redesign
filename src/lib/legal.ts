/**
 * The facts the privacy and cookie pages are written from, in one place so a
 * change of host, form service or retention period is one edit here rather
 * than a hunt through prose. The analytics tools come from lib/analytics: the
 * pages only describe a tool once its ID is set there.
 *
 * Controller details are from the CVR register (CVR 40306633), read 2026-10-24.
 */
export const controller = {
  name: "DFN v/Daniel Nemborg",
  trade: "Billigskadedyr",
  form: "enkeltmandsvirksomhed",
  cvr: "40306633",
  address: "Viengevej 6A, 8240 Risskov",
  email: "info@billigskadedyr.dk",
  phone: "24 24 55 83",
};

/** Date shown as "Sidst opdateret". Change it whenever either page changes. */
export const updated = "24. oktober 2026";

/**
 * Who handles data for us. Named only where it is settled; the form service
 * stays a category until the form actually sends somewhere.
 */
export const processors = {
  hosting: "GitHub Pages (GitHub Inc., USA)",
  formService: "", // e.g. "Web3Forms (Web3Forms, EU)" once the contact form is wired up
};

/** How long an enquiry that never became a job is kept. Confirm with the owner. */
export const enquiryRetentionMonths = 12;
