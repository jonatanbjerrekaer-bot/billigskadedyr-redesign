# Migration: match the professional site's 16 pests

Owner approved 2026-09-07. Source of truth is billigskadedyrprof.dk, the
call-out site. billigskadedyr.dk is the webshop and is not a source for what he
treats in person.

## The list

Drop `rotter`. He has no rats page on the professional site, and the rats
material on billigskadedyr.dk is shop stock, not a call-out service.

Keep, already built: myrer, hvepse, vaeggelus, soelvfisk, borebiller,
kakerlakker, fluer, edderkopper.

Add: skaegkrae, gaasebiller, moel, myg, klannere, stankelben, snegle,
muldvarpe.

## What exists per pest, checked not assumed

| | icon | intro | why bullets | species | process | FAQ |
| --- | --- | --- | --- | --- | --- | --- |
| myrer | his svg (generic `inse.svg`) | yes | 5 | ours | yes | 8 his |
| edderkopper | his svg | yes | 5 | ours | yes | 8 his |
| borebiller | his svg | yes | 5 | ours | none | 8 his |
| skaegkrae | his svg | yes | none | none | none | not yet scraped |
| kakerlakker | his svg (same file as myrer) | yes | none | ours | none | none on his site |
| hvepse, vaeggelus, soelvfisk, fluer | none | yes | none | ours | some | 8 his (not hvepse) |
| gaasebiller, moel, myg, klannere, stankelben, snegle, muldvarpe | none | short, four share one placeholder | none | none | none | none |

Two facts that shape the work:

- He has **three** real pest SVGs. `myrer.svg` and `kakerlakker.svg` are the
  same file, a generic insect glyph he reuses. Eleven pages carry no SVG.
- Seven of the new pests have one short paragraph and nothing else. Four of
  them share an identical 278-character intro, which reads as placeholder text
  on his side.

## Steps, each one committable on its own

1. **Drop rotter.** Registry, serviceContent, the `Rotter` price row, the
   `service/rotter/` shell, the vite input list, and the three copy places that
   use rats as the acute example: the service-page trust panel, the FAQ answer
   about response time, and any hero or UspBar mention. Build and verify no
   dead link is left behind pointing at the removed page.
2. **Add skaegkrae.** Fully sourced: his icon, his 1.000 kr price up to
   200 m², his intro. Scrape his skaegkrae FAQ first, the way the other seven
   were done. `species` and `whyProfessional` become optional on the type so a
   pest can ship without invented content.
3. **Glyphs for the six with no artwork anywhere**: gaasebiller, moel, myg,
   klannere, stankelben, snegle, muldvarpe. Drawn to match the existing set,
   single colour, same optical weight as the Flaticon PNGs. Muldvarpe is a
   mammal and will not sit in an insect set without care.
4. **Content for the seven thin pests.** Write intro, why-bullets and a process
   note in the site's voice, from his page where there is anything to work
   from. Everything new is a claim about his business, so it goes to him for
   review before it ships. Mark each with a source comment.
5. **Verify**: every grid card resolves to a page that exists, every service
   page carries estimator, contact, process and FAQ, no reference to rats
   survives in src or dist.

## Non-goals

- No new prices. He publishes three, and the rest stay "fast pris efter en
  kort snak".
- No DIY or webshop references anywhere. He would rather lose the sale.
