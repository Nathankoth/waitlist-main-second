import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vhugicmqspbuytqqimnx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZodWdpY21xc3BidXl0cXFpbW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4MTAxNDUsImV4cCI6MjA3MzM4NjE0NX0.DXnRmusOZqKDd6K458MMQFzGkN5cmkN4v2V18s3FDZM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)