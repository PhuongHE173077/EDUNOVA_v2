import { Button } from '@/components/ui/button'
import { LoginForm } from '@/modules/auth/sign-in/login-form'
import { MoveLeftIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='min-h-svh bg-muted p-6 md:p-10'>
      <div className='bg-muted'>
        <Link href="/landing">
          <Button >
            <MoveLeftIcon className='mr-1 h-4 w-3' />
            Back
          </Button>
        </Link>

      </div>
      <div className="flex  flex-col items-center justify-center ">

        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm />
        </div>
      </div>
    </div>

  )
}
