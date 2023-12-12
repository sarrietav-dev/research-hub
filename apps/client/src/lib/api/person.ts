import type Person from '@/models/Person'
import axios from 'axios'
import baseUrl from '../baseUrl'

export async function getPersons(page: number = 1, take: number = 10, query?: string) {
  const response = await axios.get<{ data: Person[]; count: number }>(`${baseUrl}/api/person`, {
    params: {
      query,
      page,
      take
    }
  })

  return response.data
}
