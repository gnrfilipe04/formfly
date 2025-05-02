import { z } from 'zod'
import { OSProduction } from './OSProduction';

export const productionFormSchema = z.object({
    operatorName: z.string().min(1, "Nome do operador é obrigatório"),
    date: z.string(),
    quantity: z.number().min(0, "Quantidade deve ser maior que 0"),
    equipment: z.string().min(1, "Equipamento é obrigatório"),
    property: z.boolean(),
    observations: z.string().optional(),
    toSend: z.boolean().optional(),
    isSkecth: z.boolean().optional(),
});

export const productionNoteSchema = z.object({
    id: z.string(),
    order: OSProduction,
    data: productionFormSchema
});