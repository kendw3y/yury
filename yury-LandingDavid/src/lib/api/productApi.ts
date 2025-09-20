import type { Product, Producto } from '@/modules/shopping/interfaces/interfaces'
import axios from 'axios'

const productApi = axios.create({
    baseURL: 'http://localhost:3000/'
})

export const getProductCar = async():Promise<Product[]> => {
    const resp = await productApi.get('productsCar')
    const data = resp.data
    return data
}

export const deleteItemOfCar = (id:number)=> {
    return  productApi.delete(`productsCar/${id}`).catch(error => console.log(error))
}

export const addProductToCar = async (product: Product): Promise<Product> => {
    try {
        const response = await productApi.post('productsCar', product);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getProducts = async () : Promise<Producto[]> => {
    const resp = await productApi.get('products')
    const data = resp.data
    return data
}
export const updateProduct = async (newProduct:Producto) => {
    try{
        return await productApi.patch(`products/${newProduct.id}`,newProduct)
    }catch(error){
        throw error
    }
    
}

export const addProductRequest = async (newProduct: Omit<Producto, 'id'>): Promise<Producto> => {
    try {
        const response = await productApi.post('products', newProduct);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteProductRequest = async (productId: number): Promise<void> => {
    try {
        await productApi.delete(`products/${productId}`);
    } catch (error) {
        throw error;
    }
}