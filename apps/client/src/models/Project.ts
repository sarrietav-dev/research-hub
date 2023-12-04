export interface Project {
  name: string
  startDate: Date
  endDate: Date
  approvedAmount: number
  certifyingOrganizationId: number
  type: 'Finished' | 'InProgress'
  directorId: number
  products: {
    name: string
    description: string
    date: Date
    productTypeId: number
    members: { id: number }[]
  }[]
}
