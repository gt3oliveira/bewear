import { increaseProductFromCart } from "@/actions/increase-cart-product-quantity"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getUserCartQueryKey } from "../queries/use-cart"

export const getIncreaseProductFromCartMutationKey = (cartItemId: string) =>
    ['add-product-cart', cartItemId] as const

export const useIncreaseProductFromCart = (cartItemId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: getIncreaseProductFromCartMutationKey(cartItemId),
        mutationFn: () => increaseProductFromCart({ cartItemId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getUserCartQueryKey() })
        },
    })
}