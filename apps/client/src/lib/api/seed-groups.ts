import axios from 'axios'

export async function createSeedGroup(seedGroup: ResearchGroup): Promise<{ id: number }> {
  const response = await axios.post<{ id: number }>('/api/seed-groups', seedGroup)
  return response.data
}

interface Member {
  affiliationDate: string
  functions: string[]
  isActive: boolean
  roleId: number
  id: number
}

interface Event {
  description: string
  startDate: string
  endDate: string
  type: 'Local' | 'International'
}

interface Product {
  name: string
  description: string
  date: string
  productTypeId: number
  members: { id: number }[]
}

interface Project {
  name: string
  startDate: string
  endDate?: string
  approvedAmount: number
  certifyingOrganizationId: number
  type: 'Finished' | 'Inprogress'
  directorId: number
  products: Product[]
}

interface ResearchGroup {
  name: string
  acronym: string
  description: string
  researchGroupId: number
  researchLines: string[]
  creationDate: string
  programId: number
  period: `${number}-${number}`
  members: Member[]
  leaderId: number
  coResearchers: { id: number }[]
  events: Event[]
  projects: Project[]
}