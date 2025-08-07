import type { Product } from '@/modules/shopping/interfaces/interfaces'
import axios from 'axios'

const productApi = axios.create({
    baseURL: 'http://localhost:3000/'
})

export const getProductCar = async():Promise<Product[]> => {
    const resp = await productApi.get('products')
    const data = resp.data
    return data
}

export const deleteItemOfCar = (id:number)=> {
    return  productApi.delete(`products/${id}`).catch(error => console.log(error))
}