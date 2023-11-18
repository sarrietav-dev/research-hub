import { supabase } from './supabaseClient'
import { groupBy } from 'lodash'

export async function getPrograms(): Promise<{ program: string | null }[]> {
  const { data, error } = await supabase.from('programs').select()
  if (error) {
    throw error
  }
  return data
}

export async function getSeedGroupsByProgram() {
  const { data, error } = await supabase.from('programs_seedgroups').select()
  if (error) {
    throw error
  }

  const seedGroupsByProgram = groupBy(data, 'program')
  return seedGroupsByProgram
}

export async function getSeedGroup(name: string) {
  const { data, error } = await supabase.from('student_info').select().eq('name', name).single()
  if (error) {
    throw error
  }
  return data
}

export async function getStudentInfo(name: string) {
  const { data, error } = await supabase.from('student_info').select('*').eq('name', name)
  if (error) {
    throw error
  }
  return data
}
