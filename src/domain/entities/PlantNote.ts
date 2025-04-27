import { z } from 'zod'
import { OSPlant } from './OSPlant';

export const plantFormSchema = z.object({
    operatorName: z.string().min(1, "Nome do operador é obrigatório"),
    date: z.date(),
    quantity: z.number().min(0, "Quantidade deve ser maior que 0"),
    type: z.enum(["muda", "semente"], {
        required_error: "Tipo é obrigatório",
    }),
    observations: z.string().optional(),
    toSend: z.boolean().optional()
});

export const plantNoteSchema = z.object({
    id: z.string(),
    order: OSPlant,
    data: plantFormSchema
});
