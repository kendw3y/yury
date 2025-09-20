import { deleteItemOfCar, getProductCar, addProductToCar } from "@/lib/api/productApi"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { Product } from "@/modules/shopping/interfaces/interfaces"


export const useShoppingCar = () => {
    const queryClient = useQueryClient()

    const {
        data: items,
    } = useQuery({
        queryKey: ['productCar'],
        queryFn: getProductCar
    })

    const deleteProductOfCar = useMutation({
        mutationFn: (id:number)=> deleteItemOfCar(id),
        onError: (error) => console.log("Error" + error),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['productCar']})
    })

    const addProductToCartMutation = useMutation({
        mutationFn: (product: Product) => addProductToCar(product),
        onError: (error) => console.log("Error adding to cart: " + error),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['productCar']})
    })

    return {
        items,
        deleteProductOfCar,
        addProductToCartMutation,
        queryClient
    }
}

