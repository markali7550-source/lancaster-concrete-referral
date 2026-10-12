import { z } from "zod";
import type { AttributionSnapshot } from "./model";

/** §5.2 attribution contract, validated server side. Kept out of `model.ts`
 * so the client bundle does not ship zod. */
export const attributionSnapshotSchema = z.object({
  visitorId: z.string().optional(),
  sessionId: z.string().optional(),
  landingPath: z.string().optional(),
  referrer: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  gclid: z.string().optional(),
  gbraid: z.string().optional(),
  wbraid: z.string().optional(),
  msclkid: z.string().optional(),
});

// Compile-time check that the schema and the client type describe the same shape.
type Same<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
const _shapeMatches: Same<z.infer<typeof attributionSnapshotSchema>, AttributionSnapshot> = true;
void _shapeMatches;
