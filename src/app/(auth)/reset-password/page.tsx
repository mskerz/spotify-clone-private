"use client";

import { useSearchParams } from 'next/navigation'

function ResetPasswordPage() {
      const searchParams = useSearchParams()
      const token = searchParams.get('token')

  return (
    <div>Token: {token ? token : 'No token'}</div>
  )
}
export default ResetPasswordPage