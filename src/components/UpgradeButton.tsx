"use client"

import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { trpc } from '@/app/_trpc/client'

const UpgradeButton = () => {

  const {mutate: createStripeSession} = trpc.createStripeSession.useMutation({
    onSuccess: ({url}) => {
      console.log('Stripe session created successfully. URL:', url)
      window.location.href = url ?? "/dashboard/billing"
    },
    onError: (error) => {
      console.error('Error creating Stripe session:', error)
    },
  })

  console.log('UpgradeButton component rendered')

  return (
    <Button onClick={() => {
      console.log('Upgrade button clicked')
      createStripeSession()
    }} className='w-full'>
      Upgrade now <ArrowRight className='h-5 w-5 ml-1.5' />
    </Button>
  )
}

export default UpgradeButton