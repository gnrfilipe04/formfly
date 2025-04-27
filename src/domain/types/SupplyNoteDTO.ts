import z from "zod";
import { supplyNoteSchema } from "../entities/SupplyNote";

export type SuppyNoteDTO = z.infer<typeof supplyNoteSchema>; 
