'use client';

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallbackPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const supabase = createClient()

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                const redirectTo = searchParams.get('redirectTo') || '/dashboard'
                router.push(redirectTo)
            }
        })
    }, [router, searchParams])

    return (
        <div className="flex items-center justify-center min-h-screen font-[family-name:var(--font-catamaran)]">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Authenticating...</h2>
                <p>Please wait while we verify your session.</p>
            </div>
        </div>
    );
}