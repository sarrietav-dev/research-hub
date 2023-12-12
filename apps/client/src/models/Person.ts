export default interface Person {
  id: number
  name: string
  email: string
  identityCard: string
  institutionalCode: string
  phone: string
  program: {
    id: number
    name: string
  }
}
