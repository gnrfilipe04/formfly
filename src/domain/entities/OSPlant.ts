import { z } from "zod";
import { OSHeader } from "./OSHeader";
export const OSPlant= z.object({
    header: OSHeader,
    locale: z.string(),
    quantity: z.number(),
    type: z.enum(["muda", "semente"]),
});

export type OSPlantDTO = z.infer<typeof OSPlant>;
