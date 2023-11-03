export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      current_works: {
        Row: {
          approved_amount: number | null
          entity: string | null
          id: number
          product: string | null
          seed_groups_fk: number | null
          start_date: string | null
        }
        Insert: {
          approved_amount?: number | null
          entity?: string | null
          id?: number
          product?: string | null
          seed_groups_fk?: number | null
          start_date?: string | null
        }
        Update: {
          approved_amount?: number | null
          entity?: string | null
          id?: number
          product?: string | null
          seed_groups_fk?: number | null
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "current_works_seed_groups_fk_fkey"
            columns: ["seed_groups_fk"]
            isOneToOne: false
            referencedRelation: "seed_groups"
            referencedColumns: ["id"]
          }
        ]
      }
      finished_works: {
        Row: {
          approved_amount: number | null
          end_date: string | null
          entity: string | null
          id: number
          product: string | null
          seed_groups_fk: number | null
          start_date: string | null
        }
        Insert: {
          approved_amount?: number | null
          end_date?: string | null
          entity?: string | null
          id?: number
          product?: string | null
          seed_groups_fk?: number | null
          start_date?: string | null
        }
        Update: {
          approved_amount?: number | null
          end_date?: string | null
          entity?: string | null
          id?: number
          product?: string | null
          seed_groups_fk?: number | null
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "finished_works_seed_groups_fk_fkey"
            columns: ["seed_groups_fk"]
            isOneToOne: false
            referencedRelation: "seed_groups"
            referencedColumns: ["id"]
          }
        ]
      }
      group_members: {
        Row: {
          body: string | null
          email: string | null
          full_name: string | null
          functions: string | null
          id: number
          id_card: string | null
          is_active: boolean | null
          program: string | null
          seed_group_fk: number | null
          student_code: string | null
          year_of_entry: string | null
        }
        Insert: {
          body?: string | null
          email?: string | null
          full_name?: string | null
          functions?: string | null
          id?: number
          id_card?: string | null
          is_active?: boolean | null
          program?: string | null
          seed_group_fk?: number | null
          student_code?: string | null
          year_of_entry?: string | null
        }
        Update: {
          body?: string | null
          email?: string | null
          full_name?: string | null
          functions?: string | null
          id?: number
          id_card?: string | null
          is_active?: boolean | null
          program?: string | null
          seed_group_fk?: number | null
          student_code?: string | null
          year_of_entry?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_members_seed_group_fk_fkey"
            columns: ["seed_group_fk"]
            isOneToOne: false
            referencedRelation: "seed_groups"
            referencedColumns: ["id"]
          }
        ]
      }
      leaders: {
        Row: {
          email: string | null
          id: number
          name: string | null
          phone: string | null
          seed_groups_fk: number | null
        }
        Insert: {
          email?: string | null
          id?: number
          name?: string | null
          phone?: string | null
          seed_groups_fk?: number | null
        }
        Update: {
          email?: string | null
          id?: number
          name?: string | null
          phone?: string | null
          seed_groups_fk?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "leaders_seed_groups_fk_fkey"
            columns: ["seed_groups_fk"]
            isOneToOne: false
            referencedRelation: "seed_groups"
            referencedColumns: ["id"]
          }
        ]
      }
      researchers: {
        Row: {
          email: string | null
          full_name: string | null
          id: number
          phone_number: string | null
          program: string | null
          seed_group_fk: number | null
        }
        Insert: {
          email?: string | null
          full_name?: string | null
          id?: number
          phone_number?: string | null
          program?: string | null
          seed_group_fk?: number | null
        }
        Update: {
          email?: string | null
          full_name?: string | null
          id?: number
          phone_number?: string | null
          program?: string | null
          seed_group_fk?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "researchers_seed_group_fk_fkey"
            columns: ["seed_group_fk"]
            isOneToOne: false
            referencedRelation: "seed_groups"
            referencedColumns: ["id"]
          }
        ]
      }
      seed_groups: {
        Row: {
          creation_date: string
          description: string | null
          id: number
          international_events: string | null
          local_events: string | null
          name: string
          parent_group: string | null
          program: string | null
          research_tracks: string | null
        }
        Insert: {
          creation_date: string
          description?: string | null
          id?: number
          international_events?: string | null
          local_events?: string | null
          name: string
          parent_group?: string | null
          program?: string | null
          research_tracks?: string | null
        }
        Update: {
          creation_date?: string
          description?: string | null
          id?: number
          international_events?: string | null
          local_events?: string | null
          name?: string
          parent_group?: string | null
          program?: string | null
          research_tracks?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
