import axios from 'axios'
import baseUrl from '../baseUrl'

export interface ProductType {
  id: number
  name: string
}

export default async function getProductTypes() {
  const response = await axios.get<ProductType[]>(`${baseUrl}/api/products/types`)
  return response.data
}
