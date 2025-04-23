'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectTo = params.get('redirectTo') || '/dashboard';

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === 'SIGNED_IN') {
          router.push(redirectTo);
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, [router, supabase]);

  return (
    <div className="flex items-center justify-center min-h-screen font-[family-name:var(--font-catamaran)]">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Authenticating...</h2>
        <p>Please wait while we verify your session.</p>
      </div>
    </div>
  );
}
