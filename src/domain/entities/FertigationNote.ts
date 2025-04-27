import z from 'zod'
import { OSFertigation } from './OSFertigation';

export const fertigationFormSchema = z.object({
    operatorName: z.string().min(1, "Nome do operador é obrigatório"),
    date: z.string(),
    quantity: z.number().min(0, "Quantidade deve ser maior que 0"),
    observations: z.string().optional(),
    isSkecth: z.boolean().optional(),
    toSend: z.boolean().optional()
});

export const fertigationNoteSchema = z.object({
    id: z.string(),
    order: OSFertigation,
    data: fertigationFormSchema
});