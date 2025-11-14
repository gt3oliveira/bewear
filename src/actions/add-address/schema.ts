import z from "zod";

export const createShippingAddressSchema = z.object({
    recipientName: z
        .string()
        .trim()
        .min(3, 'Nome do destinatário é obrigatório.'),
    street: z.string().trim().min(3, 'Rua é obrigatória.'),
    number: z.string().trim().min(1, 'Número é obrigatório.'),
    complement: z.string().trim().optional(),
    city: z.string().trim().min(3, 'Cidade é obrigatória.'),
    state: z.string().trim().min(2, 'Estado é obrigatório.'),
    neighborhood: z.string().trim().min(3, 'Bairro é obrigatório.'),
    zipCode: z.string().trim().min(8, 'CEP deve ter no mínimo 8 caracteres.'),
    country: z.string().trim().min(3, 'País é obrigatório.'),
    phone: z
        .string()
        .trim()
        .min(10, 'Telefone deve ter no mínimo 10 caracteres.'),
    email: z.email('Email inválido.'),
    cpf: z
        .string()
        .trim()
        .min(11, 'CPF ou CNPJ deve ter no mínimo 11 caracteres.'),
})

export type CreateShippingAddressSchema = z.infer<typeof createShippingAddressSchema>