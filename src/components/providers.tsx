'use client'

import { SessionContextProvider } from '@supabase/auth-helpers-react'
import type { Session } from '@supabase/supabase-js'
import { ReactNode, useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

interface ProvidersProps {
  children: ReactNode
  initialSession?: Session | null
}

export function Providers({ children, initialSession = null }: ProvidersProps) {
  const [supabaseClient] = useState(() => createSupabaseBrowserClient())

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
      {children}
    </SessionContextProvider>
  )
}
