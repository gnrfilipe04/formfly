import { z } from "zod";
import { OSHeader } from "./OSHeader";

export const OSFertigation= z.object({
    header: OSHeader,
    locale: z.string(),
    quantity: z.number(),
});
