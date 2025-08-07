import { deleteItemOfCar, getProductCar } from "@/lib/api/productApi"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"


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

    return {
        items,
        deleteProductOfCar,
        queryClient
    }
}

