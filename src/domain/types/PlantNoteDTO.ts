import { plantNoteSchema } from "../entities/PlantNote";
import z from "zod";
export type PlantNoteDTO = z.infer<typeof plantNoteSchema>; 
