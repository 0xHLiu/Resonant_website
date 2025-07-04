import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          password_hash: string
          account_type: "regular" | "voice_talent"
          agreed_to_terms: boolean
          agreed_to_marketing: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          password_hash: string
          account_type: "regular" | "voice_talent"
          agreed_to_terms: boolean
          agreed_to_marketing: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          password_hash?: string
          account_type?: "regular" | "voice_talent"
          agreed_to_terms?: boolean
          agreed_to_marketing?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
