export interface Product {
  id: number
  name: string
  price: number
  image: string
  color: string
  quantity: number
}

export interface Producto {
  id: number,
  name: string,
  price: number | string,
  quantity?: number
  category: string,
  image: string,
  description: string,
  isCoustom: boolean,
  favorite?: boolean
}

// export interface DeliveryInfo {
//   fullName: string
//   address: string
//   city: string
//   postalCode: string
//   phone: string
//   email: string
// }

