import type { Product, Producto } from '@/modules/shopping/interfaces/interfaces'
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
