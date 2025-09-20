import type { User } from "@/types/types";
import axios from "axios";

const userApi = axios.create({
    baseURL: 'http://localhost:3000/usuarios'
})

export const getAllUser = async (): Promise<User[]> => {
    try {
        const resp = await userApi.get('/')
        const data = resp.data
        return data
    } catch (error) {
        throw error
    }
}

export const EditUserRequest = async ({ id, newUser }: { id: string, newUser: User }) => {
    try {
        return await userApi.put(`/${id}`, newUser).catch(error => console.log(error))
    } catch (error) {
        throw error
    }
    
}

export const AddUserRequest = async ({ data }: { data: User }) => {
    try {
        return await userApi.post('/', data).catch(error => console.log(error))
    } catch (error) {
        throw error
    }
}

export const DeletOneUserRequest = async(id:string) => {
    try {
        return await userApi.delete(`/${id}`)
    } catch (error) {
        throw error
    }
}

export const DeletSomeUserRequest = async (ids: string[]) => {
    try {
        const request = ids.map(id => userApi.delete(`/${id}`))
        const response = await Promise.all(request)
        return response
    } catch (error) {
        throw error
    }
}