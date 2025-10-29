import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://blwcbwzhjhmrkadndmip.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsd2Nid3poamhtcmthZG5kbWlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5OTQwNTcsImV4cCI6MjA3NjU3MDA1N30._u7rwYxZsyHykkyEeNssIyFTfAFKwIdyjAFuyA9gUsE'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Export for direct use in components
export default supabase

// Database types for VistaForge
export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string | null
          price: number
          location: string
          property_type: string
          bedrooms: number | null
          bathrooms: number | null
          sqft: number | null
          images: string[] | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description?: string | null
          price: number
          location: string
          property_type: string
          bedrooms?: number | null
          bathrooms?: number | null
          sqft?: number | null
          images?: string[] | null
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string | null
          price?: number
          location?: string
          property_type?: string
          bedrooms?: number | null
          bathrooms?: number | null
          sqft?: number | null
          images?: string[] | null
          user_id?: string
        }
      }
      visualizations: {
        Row: {
          id: string
          created_at: string
          property_id: string
          type: '2d' | '3d'
          style: string
          image_url: string
          metadata: any
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          property_id: string
          type: '2d' | '3d'
          style: string
          image_url: string
          metadata?: any
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          property_id?: string
          type?: '2d' | '3d'
          style?: string
          image_url?: string
          metadata?: any
          user_id?: string
        }
      }
      roi_analyses: {
        Row: {
          id: string
          created_at: string
          property_id: string
          analysis_data: any
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          property_id: string
          analysis_data: any
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          property_id?: string
          analysis_data?: any
          user_id?: string
        }
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
  }
}