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
  const { data, error } = await supabase.from('student_info').select('*').eq('seed_group', name)
  if (error) {
    throw error
  }
  return data
}

export async function getStudentInfo(name: string) {
  const { data, error } = await supabase.from('student_info').select('*').eq('full name', name)
  if (error) {
    throw error
  }
  return data
}

export async function searchByStudent(name: string) {
  const { data, error } = await supabase
    .from('student_info')
    .select('full name')
    .textSearch('full name', name)
  if (error) {
    throw error
  }
  return data
}

export async function searchBySeedGroup(name: string) {
  const { data, error } = await supabase
    .from('student_info')
    .select('seed_group')
    .textSearch('seed_group', name)
  if (error) {
    throw error
  }
  return data
}

export async function searchByProgram(name: string) {
  const { data, error } = await supabase
    .from('student_info')
    .select('program')
    .textSearch('program', name)
  if (error) {
    throw error
  }
  return data
}

export async function searchByLeader(name: string) {
  const { data, error } = await supabase
    .from('student_info')
    .select('leader, seed_group')
    .textSearch('leader', name)
  if (error) {
    throw error
  }
  return data
}

export async function searchAll(query: string) {
  const [student, seedGroup, program, leader] = await Promise.all([
    searchByStudent(query),
    searchBySeedGroup(query),
    searchByProgram(query),
    searchByLeader(query)
  ])

  const searchResults = {
    student,
    seedGroup,
    program,
    leader
  }

  return searchResults
}
