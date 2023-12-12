import axios from 'axios'
import baseUrl from '../baseUrl'

export interface Program {
  id: number
  name: string
}

export async function getPrograms(): Promise<Program[]> {
  const response = await axios.get<Program[]>(`${baseUrl}/api/programs`)
  return response.data
}

interface ResearchGroupResponse {
  id: number
  name: string
  researchGroup: { id: number; name: string }[]
}

export async function getResearchGroups(programId: number) {
  const response = await axios.get<ResearchGroupResponse[]>(
    `${baseUrl}/api/programs/${programId}/research-groups`
  )
  console.log(response.data)
  return response.data[0].researchGroup
}
