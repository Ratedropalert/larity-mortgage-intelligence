import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const createSupabaseClient = () => {
    if (supabaseUrl && supabaseAnonKey) {
        return createClient(supabaseUrl, supabaseAnonKey);
    }
    // Return a mock client or throw a controlled error that doesn't crash the module import
    console.error("Supabase credentials missing! Check .env.local");
    return {
        auth: {
            signUp: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
            signInWithPassword: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
        },
        // Add other properties as needed or use a Proxy for full resilience
    } as any;
};

export const supabase = createSupabaseClient();
