import { beforeEach } from 'node:test'
import { getSeedGroupsByProgram } from '../database'
import { supabase } from '../supabaseClient' // Assuming supabase is imported from another file
import { groupBy } from 'lodash'
import { vi, describe, it, expect } from 'vitest'

const mockData = [
  { program: 'Program A', seed_group: 'Group 1' },
  { program: 'Program B', seed_group: 'Group 2' }
]

const supabaseSelect = vi.fn().mockReturnValue({ data: mockData, error: null })

describe('getSeedGroupsByProgram', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return seed groups grouped by program', async () => {
    const mockGroupedData = {
      'Program A': [{ program: 'Program A', seed_group: 'Group 1' }],
      'Program B': [{ program: 'Program B', seed_group: 'Group 2' }]
    }

    const { data } = supabaseSelect()

    const seedGroupsByProgram = groupBy(data, 'program')

    expect(seedGroupsByProgram).toEqual(mockGroupedData)
  })
})
