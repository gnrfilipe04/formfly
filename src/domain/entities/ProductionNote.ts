import { z } from 'zod'
import { OSProduction } from './OSProduction';

export const productionFormSchema = z.object({
    operatorName: z.string().min(1, "Nome do operador é obrigatório"),
    date: z.string(),
    quantity: z.number().min(0, "Quantidade deve ser maior que 0"),
    equipment: z.string().min(1, "Equipamento é obrigatório"),
    type: z.enum(["muda", "semente"], {
        required_error: "Tipo é obrigatório",
    }),
    observations: z.string().optional(),
    toSend: z.boolean().optional()
});

export const productionNoteSchema = z.object({
    id: z.string(),
    order: OSProduction,
    data: productionFormSchema
});