import { z } from "zod";
import { OSHeader } from "./OSHeader";

export const OSSupply= z.object({
    header: OSHeader,
    locale: z.string(),
    quantity: z.number(),
    internalCode: z.boolean(),
    date: z.date(),
});

export type OSSupplyDTO = z.infer<typeof OSSupply>;


