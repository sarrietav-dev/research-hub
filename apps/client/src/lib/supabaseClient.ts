import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/supabase'

const supabaseUrl = 'https://sgojwoguzfgendyttegn.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnb2p3b2d1emZnZW5keXR0ZWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgyMDc0MzEsImV4cCI6MjAxMzc4MzQzMX0.ZCfui1YBGK4bQuZNJ-sALvGCOOUNP6gkQwU0q_L-pAU'
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
