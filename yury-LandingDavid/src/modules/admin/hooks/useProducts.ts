import { getProducts, updateProduct, addProductRequest, deleteProductRequest } from "@/lib/api/productApi"
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

    const addProductMutation = useMutation({
        mutationFn: (newProduct: Omit<Producto, 'id'>) => addProductRequest(newProduct),
        onSuccess: () => {
            // Invalidar y refrescar la lista de productos después de agregar
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
        onError: (error) => {
            console.error('Error al agregar producto:', error)
        }
    })

    const deleteProductMutation = useMutation({
        mutationFn: (productId: number) => deleteProductRequest(productId),
        onSuccess: () => {
            // Invalidar y refrescar la lista de productos después de eliminar
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
        onError: (error) => {
            console.error('Error al eliminar producto:', error)
        }
    })
    

    return {
        products: data ?? [],
        updateProductMutation,
        addProductMutation,
        deleteProductMutation
    }
}