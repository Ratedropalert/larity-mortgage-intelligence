import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            email,
            zip,
            target_rate,
            current_rate,
            balance_range,
            home_type,
            consent
        } = body;

        // Basic validation
        if (!email || !zip || !consent) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Insert into Supabase
        const { data, error } = await supabase
            .from('leads')
            .insert([
                {
                    email,
                    zip,
                    target_rate,
                    current_rate: current_rate || null,
                    balance_range,
                    home_type,
                    consent
                }
            ])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to save lead' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Lead captured successfully', data },
            { status: 201 }
        );

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
