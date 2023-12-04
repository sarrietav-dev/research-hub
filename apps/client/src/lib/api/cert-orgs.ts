import axios from 'axios'
import baseUrl from '../baseUrl'
import type { CertOrg } from '@/models/CertOrgs'

export default async function getCertOrgs() {
  const response = await axios.get<CertOrg[]>(`${baseUrl}/api/cert-orgs`)
  return response.data
}
