import z from 'zod'
import { fertigationNoteSchema } from '../entities/FertigationNote';

export type FertigationNoteDTO = z.infer<typeof fertigationNoteSchema>;