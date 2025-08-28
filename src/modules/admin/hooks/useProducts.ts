import { getProducts, updateProduct } from "@/lib/api/productApi"
import type { Producto } from "@/modules/shopping/interfaces/interfaces"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useProduct = () => {
    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })
    const updateProductMutation = useMutation({
        mutationFn: (newProduct: Producto) => updateProduct(newProduct),
        onMutate: async (update) => {
            await queryClient.cancelQueries({ queryKey: ['products'] })

            const prevQuery = queryClient.getQueryData(['products'])

            queryClient.setQueryData<Producto[]>(['products'], (old) => old?.map(product => product.id === update.id ? { ...product, favorite: update.favorite } : product) || [])
            return prevQuery
        }
    })
    

    return {
        products: data ?? [],
        updateProductMutation
    }
}