import type { Encargo } from '@/types/Product'
import axios from 'axios'

const orderApi = axios.create({
    baseURL: 'http://localhost:3000/encargos'
})

export const getAllOrder = async () => {
    try{
        const resp = await orderApi.get('/')
        const data = resp.data
        return data
    }catch(error){
        throw error
    }
}

export const deleteOrderById = async (id: string|number) => {
    try{
        const resp = await orderApi.delete(`/${id}`)
        const data = resp.data
        return data
    }catch(error){
        throw error
    }
}

export const updateOrderById = async (encargo: Encargo) => {
    try{
        const resp = await orderApi.patch(`/${encargo.id}`,encargo)
        const data = resp.data
        return data
    }catch(error){
        throw error
    }
}
