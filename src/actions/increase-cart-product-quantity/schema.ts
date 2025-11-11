import z from "zod";

export const increaseProductQuantitySchema = z.object({
    cartItemId: z.uuid(),
})

export type IncreaseProductQuantitySchema = z.infer<typeof increaseProductQuantitySchema>