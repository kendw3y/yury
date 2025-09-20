import { deleteOrderById, getAllOrder, updateOrderById } from "@/lib/api/orderApi";
import type { Encargo } from "@/types/Product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useOrder = () => {
  const queryClient = useQueryClient();
  const { data: encargos } = useQuery({
    queryKey: ["encargos"],
    queryFn: getAllOrder,
    initialData: [],
  });

  const deleteOrderByIdMutation = useMutation({
    mutationFn: deleteOrderById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["encargos"] });
    },
  });
  const updateOrderByIdMutation = useMutation({
    mutationFn: updateOrderById,
    onMutate: async (update) => {
                await queryClient.cancelQueries({ queryKey: ['products'] })
    
                const prevQuery = queryClient.getQueryData(['products'])
    
                queryClient.setQueryData<Encargo[]>(['encargos'], (old) => old?.map(encargo => encargo.id === update.id ? { ...encargo, status: update.status } : encargo) || [])
                return prevQuery
            }
  });
  return {
    encargos,
    deleteOrderByIdMutation,
    updateOrderByIdMutation,
  };
};
