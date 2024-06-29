"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/client'
import { Loader2 } from 'lucide-react'

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')

  // Fetch authentication callback data with retry logic
  const { data, error, isLoading } = trpc.authCallback.useQuery(undefined, {
    retry: true,
    retryDelay: 500,
  })

  if (data?.success) {
    // Redirect user to the origin or dashboard if authentication is successful
    router.push(origin ? `/${origin}` : '/dashboard')
  }

  if (error?.data?.code === 'UNAUTHORIZED') {
    // Redirect to sign-in page if unauthorized
    router.push('/sign-in')
  }

  if (isLoading) {
    // Show loading state while authentication callback is in progress
    return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
          <h3 className='font-semibold text-xl'>
            Setting up your account...
          </h3>
          <p>You will be redirected automatically.</p>
        </div>
      </div>
    )
  }

  // Return null if no conditions are met (fallback)
  return null
}

export default Page
