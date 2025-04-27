
import z from "zod";
import { productionNoteSchema } from "../entities/ProductionNote";

export type ProductionNoteDTO = z.infer<typeof productionNoteSchema>; 
