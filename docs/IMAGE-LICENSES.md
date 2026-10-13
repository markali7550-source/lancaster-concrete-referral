# Image License Record

Each image used on the site, with its source and license basis.

| File | Used on | Source | Content ID | License | Status |
|---|---|---|---|---|---|
| `public/images/services/concrete-foundations/concrete-foundations-hero.webp` | `/services/concrete-foundations` (hero) | iStock | 1418215833 | iStock Standard License (user-confirmed purchase/download) | Confirmed by user |
| `public/images/services/concrete-walkways/concrete-walkways-hero.webp` | `/services/concrete-walkways` (hero) | iStock | 2097212421 | iStock Standard License (user-confirmed purchase/download) | Confirmed by user |
| `public/images/services/stamped-concrete/stamped-concrete-hero.webp` | `/services/stamped-concrete` (hero) | iStock | 876439542 | iStock Standard License (user-confirmed purchase/download) | Confirmed by user |
| `public/images/services/concrete-steps/concrete-steps-hero.webp` | `/services/concrete-steps` (hero, with caption) | iStock | 2222087639 | iStock Standard License (user-provided file; confirm in iStock download history) | Replaced in-progress photo 1210328306 with a finished stoop photo. Caption states work is by independent local providers |
| `public/images/services/concrete-slabs/concrete-slabs-detail.webp` | `/services/concrete-slabs` (detail band) | iStock | 1475642604 | iStock Standard License (user-provided file; confirm in iStock download history) | Shows precast slab panels on a brick base, not a poured slab. Replaces duplicate patio photo |
| `public/images/services/concrete-steps/concrete-steps-process.webp` | `/services/concrete-steps` (process section) | iStock | 1210328306 | iStock Standard License (user-provided file; confirm in iStock download history) | In-progress steps photo, labeled as an example in alt text |
| `public/images/services/stamped-concrete/stamped-concrete-process.webp` | `/services/stamped-concrete` (process section) | iStock | 2189302811 | iStock Standard License (user-provided file; confirm in iStock download history) | Stamping tool on concrete; alt text labels it as an example |
| `public/images/services/concrete-foundations/concrete-foundations-process.webp` | `/services/concrete-foundations` (process section) | iStock | 1182417821 | iStock Standard License (user-provided file; confirm in iStock download history) | Crews screeding over rebar mesh; alt text labels it as an example |
| `public/images/services/concrete-walkways/concrete-walkways-process.webp` | `/services/concrete-walkways` (process section) | iStock | 1474354593 | iStock Standard License (user-provided file; confirm in iStock download history) | Crew finishing walkway edge; alt text labels it as an example |
| `public/images/services/concrete-slabs/concrete-slabs-process.webp` | `/services/concrete-slabs` (process section) | iStock | not provided | iStock Standard License (user-confirmed) | Stacked precast slab panels; content ID still needed for the record |
| `public/images/services/concrete-patios/concrete-patios-hero.webp` | `/services/concrete-patios` (hero) | Source not documented | not provided | Not confirmed. User approved use on 2026-10-13; the photo may look AI-generated | Now the hero for `/services/concrete-patios` and the Lancaster SC patios card and page (via `location-services.ts`). Re-encoded to WebP at quality 80 (93 KB, 800×436). Replaces `lancaster-sc-patios.webp`, which was stamped-looking and is no longer used on the patios service page. Needs a license record before launch |
| `public/images/services/concrete-patios/concrete-patios-detail.webp` | `/services/concrete-patios` (detail band) | Client-supplied (`Patios Detail.jpg`, commit de90f39) | not applicable (client-supplied) | Client-supplied verified asset. Client attests ownership or rights to use. No stock license applies | New concrete patio slab in wood edge forms beside a vinyl-sided house, no people visible. Converted to WebP at quality 75 (54 KB, 671×457 source). Surface is smooth, not broom-finished. Different file from the hero, so the page does not repeat a photo |
| `public/images/services/concrete-patios/concrete-patios-process.webp` | `/services/concrete-patios` (process section) | iStock | 1009641366 | iStock Standard License (user-provided file; confirm in iStock download history) | Screed board on fresh concrete; replaces interim generated image |

## Not in use
- `istockphoto-818630724` (iStock, not used): wall formwork, not a steps match. Kept only in local scratch, not committed.
- Wikimedia Commons candidates "Concrete being stamped" (CC BY-SA 3.0) and "Concrete steps" (CC BY-SA 4.0): not downloaded.

## Notes
- iStock Standard licenses permit use on websites. Keep the iStock content ID and the license on file in your iStock account download history.

## Notes (2026-10-13)

- **Size rule override (client-confirmed):** hero and band images target 90–97 KB WebP for crisp HD quality. This overrides the general 25–60 KB range for those slots.
- **Process bands with people removed:** the process photos for driveways, foundations, walkways, stamped concrete, and repair showed visible people, hands, or running equipment. They are no longer used. Those process sections now render text only, with no image, until compliant photos are supplied.
- **Detail bands:** the foundations and stamped-concrete detail bands had no compliant repo photo and now render text only. The walkways detail band uses `concrete-steps-hero.webp` (a porch-stoop photo, no people). It is not repeated on the walkways page. Its iStock record is in the table above, and it appears on the steps page as well.
- **Pending files:** no new foundation, walkway, or stamped hero photos were found in the workspace. Those three heroes still use the current files.
