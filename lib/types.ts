export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          tenant_id: string
          name: string
          email: string
          phone: string | null
          subject: string | null
          message: string | null
          status: 'new' | 'contacted' | 'converted' | 'archived' | 'deleted'
          source: string | null
          client_id: string | null
          created_at: string
          contacted_at: string | null
          archived_at: string | null
          deleted_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
      }
      site_content: {
        Row: {
          id: string
          tenant_id: string
          page_key: string
          section_key: string
          content: Json
          is_enabled: boolean
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['site_content']['Row'], 'id' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['site_content']['Insert']>
      }
      site_settings: {
        Row: {
          id: string
          tenant_id: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['site_settings']['Row'], 'id' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['site_settings']['Insert']>
      }
      email_templates: {
        Row: {
          id: string
          tenant_id: string
          type: string
          subject: string
          body: string
          logo_url: string | null
          signature_text: string | null
          signature_image_url: string | null
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['email_templates']['Row'], 'id' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['email_templates']['Insert']>
      }
    }
  }
}

export type Lead = Database['public']['Tables']['leads']['Row']
export type LeadInsert = Database['public']['Tables']['leads']['Insert']
export type SiteContent = Database['public']['Tables']['site_content']['Row']
export type SiteSetting = Database['public']['Tables']['site_settings']['Row']
export type EmailTemplate = Database['public']['Tables']['email_templates']['Row']

export type LeadStatus = Lead['status']
