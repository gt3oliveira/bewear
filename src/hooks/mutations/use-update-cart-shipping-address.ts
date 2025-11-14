import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCartShippingAddress } from "@/actions/update-address";
import { UpdateCartShippingAddressSchema } from "@/actions/update-address/schema";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getUpdateCartShippingAddressMutationKey = () => [
    "update-cart-shipping-address",
];

export const useUpdateCartShippingAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: getUpdateCartShippingAddressMutationKey(),
        mutationFn: (data: UpdateCartShippingAddressSchema) =>
            updateCartShippingAddress(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getUseCartQueryKey(),
            });
        },
    });
};
