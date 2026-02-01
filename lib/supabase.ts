import { createClient } from '@supabase/supabase-js';

// Hardcoded Supabase credentials for easy deployment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zxkynlqqllvamxxxqylx.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4a3lubHFxbGx2YW14eHhxeWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4OTQ5MjQsImV4cCI6MjA4NTQ3MDkyNH0.aPEP1gt2WhhTlFbxBU5315lFiS3CIj18t7XrJOgfDjo';

const createSupabaseClient = () => {
    if (supabaseUrl && supabaseAnonKey) {
        return createClient(supabaseUrl, supabaseAnonKey);
    }
    // Fallback - should never reach here with hardcoded values
    console.error("Supabase credentials missing!");
    return {
        auth: {
            signUp: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
            signInWithPassword: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
        },
        // Add other properties as needed or use a Proxy for full resilience
    } as any;
};

export const supabase = createSupabaseClient();
