
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://iscerxrvbmhzmflnqjht.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzY2VyeHJ2Ym1oem1mbG5xamh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzOTMxNzAsImV4cCI6MjA2NDk2OTE3MH0.Z-cfTPcYCQC8_HMFGDa69QvI1XAoy77gL2hrjplxR08"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;