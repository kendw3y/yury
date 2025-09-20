import { AddUserRequest, DeletOneUserRequest, DeletSomeUserRequest, EditUserRequest, getAllUser } from "@/lib/api/userApi";
import type { User } from "@/types/types";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";


export const useUser = () => {

    const queryClient = useQueryClient()

    const {
        data : users,
        status,
        error,
        isLoading: isLoadingUser
    } = useQuery({
        queryKey: ['user'],
        queryFn: getAllUser
    })

    if(error) console.log("Error getAllUser:"+ error)

    const editOneUserMutation = useMutation({
        mutationFn: ({id,user}:{id:string,user:User}) => EditUserRequest({id,newUser:user}),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['user']})
    })

    const addUserMutation = useMutation({
        mutationFn: (data:User) => AddUserRequest({data}),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['user']})
    })

    const deletOneUserMutation = useMutation({
        mutationFn: (id:string) => DeletOneUserRequest(id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['user']})
    })

    const deleteSomeUserMutation = useMutation({
        mutationFn: (ids: string[]) => DeletSomeUserRequest(ids),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['user']})
    })

    return {
        users,
        status,
        queryClient,
        isLoadingUser,
        editOneUserMutation,
        addUserMutation,
        deletOneUserMutation,
        deleteSomeUserMutation
    }
}