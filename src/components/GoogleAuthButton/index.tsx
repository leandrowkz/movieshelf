import React, { useContext, type HTMLAttributes } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '../Button'
import { AuthContext } from 'src/context/AuthContext'

interface GoogleAuthButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label?: string
}

export function GoogleAuthButton({
  label = 'Sign in with Google',
  ...props
}: GoogleAuthButtonProps) {
  const { signInSocial } = useContext(AuthContext)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = (e: any) => {
    e.preventDefault()
    signInSocial('google')
  }

  return (
    <Button {...props} variant="outlined" onClick={handleLogin}>
      <FcGoogle />
      {label}
    </Button>
  )
}
