import { getAllOrder } from "@/lib/api/orderApi"
import { useQuery } from "@tanstack/react-query"

export const useOrder = () => {
    const {data:encargos} = useQuery({
        queryKey: ['encargos'],
        queryFn: getAllOrder,
        initialData:[]
    })

    return{
        encargos
    }
}