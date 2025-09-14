import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vhugicmqspbuytqqimnx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZodWdpY21xc3BidXl0cXFpbW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0MTY2NDcsImV4cCI6MjA0MTk5MjY0N30.nOA9LItWyXNL3KaLhAW6zOv4_lk5ZA-4X4Tv8-W8RgA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)