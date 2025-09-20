import {products} from '@/data/data.json'

export const useCalculateTotal = () => {
    const subtotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0)
    const tax = subtotal * 0.08
    const delivery = 29.99

    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      delivery: delivery.toFixed(2),
      total: (subtotal + tax + delivery).toFixed(2),
    }
  }