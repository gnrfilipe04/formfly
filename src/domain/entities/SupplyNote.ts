import { z } from 'zod'
import { OSSupply } from './OSSupply';

export const supplyFormSchema = z.object({
    operatorName: z.string().min(1, "Nome do operador é obrigatório"),
    date: z.string(),
    quantity: z.number().min(0, "Quantidade deve ser maior que 0"),
    internalCode: z.boolean(),
    observations: z.string().optional(),
    toSend: z.boolean().optional(),
    isSkecth: z.boolean().optional(),
});

export const supplyNoteSchema = z.object({
    id: z.string(),
    order: OSSupply,
    data: supplyFormSchema
});