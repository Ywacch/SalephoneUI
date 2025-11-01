'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Mail, CheckCircle, AlertCircle, RefreshCw, Key } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import type { Database } from '@/lib/supabase/types'

export default function ConfirmEmailPage() {
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { refreshProfile } = useAuthStore()

  const [email, setEmail] = useState('')
  const [confirmationCode, setConfirmationCode] = useState('')
  const [isResending, setIsResending] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [hasAutoSent, setHasAutoSent] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
        const emailParam = searchParams?.get('email')

        if (emailParam) {
          setEmail(emailParam)
        }

        const { data } = await supabase.auth.getSession()
        const session = data.session

        if (session?.user?.email_confirmed_at) {
          await refreshProfile()
          router.replace('/dashboard')
          return
        }

        if (!emailParam && session?.user?.email) {
          setEmail(session.user.email)
        }
      } catch (error) {
        console.error('Error initializing confirm email flow', error)
      } finally {
        setIsCheckingSession(false)
      }
    }

    init()
  }, [router, searchParams, supabase, refreshProfile])

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user?.email_confirmed_at) {
        await refreshProfile()
        router.replace('/dashboard')
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, refreshProfile, router])

  useEffect(() => {
    if (!email || hasAutoSent) return

    let timeout: ReturnType<typeof setTimeout>

    const autoSend = async () => {
      try {
        setHasAutoSent(true)
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email,
        })

        if (error) {
          setHasAutoSent(false)
          if (!error.message.toLowerCase().includes('rate limit')) {
            toast.error(error.message)
          }
          return
        }

        setResendCooldown(30)
      } catch (err) {
        console.error('Failed to auto-send confirmation code', err)
        setHasAutoSent(false)
      }
    }

    timeout = setTimeout(autoSend, 800)

    return () => clearTimeout(timeout)
  }, [email, supabase, hasAutoSent])

  useEffect(() => {
    if (resendCooldown <= 0) return

    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [resendCooldown])

  const handleResendConfirmation = async () => {
    if (!email || isResending || resendCooldown > 0) return

    setIsResending(true)

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      })

      if (error) {
        if (error.message.toLowerCase().includes('for security purposes')) {
          const match = error.message.match(/(\d+) seconds/)
          setResendCooldown(match ? parseInt(match[1], 10) : 30)
        }
        toast.error(error.message)
        return
      }

      toast.success('Confirmation code sent!')
      setResendCooldown(30)
    } catch (err) {
      console.error('Resend confirmation error', err)
      toast.error('Failed to resend confirmation code')
    } finally {
      setIsResending(false)
    }
  }

  const handleSubmitConfirmation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!confirmationCode.trim()) {
      toast.error('Please enter the confirmation code')
      return
    }

    setIsSubmitting(true)

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: confirmationCode,
        type: 'signup',
      })

      if (error) {
        toast.error(error.message)
        return
      }

      if (data.user) {
        await refreshProfile()
        toast.success('Email confirmed successfully!')
        router.replace('/dashboard')
      }
    } catch (err) {
      console.error('Verification error', err)
      toast.error('Failed to confirm email')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.replace('/signin')
  }

  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Confirm Your Email</CardTitle>
          <CardDescription>
            We&apos;ve sent a 6-digit confirmation code to your email address
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Email sent to:</p>
            {email ? (
              <p className="font-medium text-gray-900">{email}</p>
            ) : (
              <p className="text-sm text-gray-500">Loading email address...</p>
            )}
          </div>

          <Separator />

          <form onSubmit={handleSubmitConfirmation} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="confirmationCode">Confirmation Code</Label>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmationCode"
                  type="text"
                  placeholder="Enter the 6-digit code from your email"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  className="pl-10"
                  maxLength={6}
                  required
                  disabled={isSubmitting || !email}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !email || confirmationCode.trim().length !== 6}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Confirming...
                </>
              ) : (
                'Confirm Email'
              )}
            </Button>
          </form>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="font-medium mb-1">Check your email</p>
                <p>Enter the 6-digit confirmation code sent to your email address.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="font-medium mb-1">Can&apos;t find the email?</p>
                <p>Check your spam folder or resend the confirmation code. There&apos;s a 30-second cooldown between requests.</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Button
              onClick={handleResendConfirmation}
              disabled={isResending || !email || resendCooldown > 0}
              className="w-full"
              variant="outline"
            >
              {isResending ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : resendCooldown > 0 ? (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Resend Code ({resendCooldown}s)
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Resend Confirmation Code
                </>
              )}
            </Button>

            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="w-full"
            >
              Sign Out
            </Button>
          </div>

          <div className="text-center text-xs text-gray-500">
            <p>This page will automatically redirect you once your email is confirmed.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

