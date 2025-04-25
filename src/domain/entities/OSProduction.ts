import { z } from "zod";
import { OSHeader } from "./OSHeader";
export const OSProduction= z.object({
    header: OSHeader,
    locale: z.string(),
    quantity: z.number(),
    equipment: z.string(),
    date: z.date(),
    type: z.enum(["muda", "semente"]),
});

export type OSProductionDTO = z.infer<typeof OSProduction>;
