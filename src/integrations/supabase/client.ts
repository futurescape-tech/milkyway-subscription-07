// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lcpcrdpanueafbohhbph.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjcGNyZHBhbnVlYWZib2hoYnBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMDU2ODksImV4cCI6MjA1NjU4MTY4OX0.aQVJpZofwh8SRvkGGXoyR8HSWObaDvobaTxKGyiq8zY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);