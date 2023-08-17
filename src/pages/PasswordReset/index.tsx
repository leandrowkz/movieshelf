import React, {
  type HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Container } from 'src/components/Container'
import { Heading } from 'src/components/Heading'
import styles from './styles.module.css'
import { Page } from 'src/components/Page'
import { Text } from 'src/components/Text'
import { Button } from 'src/components/Button'
import { Controller, useForm } from 'react-hook-form'
import { Input } from 'src/components/Input'
import { type User, UserSchema } from 'src/types'
import { AuthContext } from 'src/context/AuthContext'
import { MdArrowBack } from 'react-icons/md'
import { Result } from 'src/components/Result'

export function PasswordReset(props: HTMLAttributes<HTMLDivElement>) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(UserSchema.partial().required({ email: true })),
  })

  const {
    resetPassword,
    resetPasswordErrors,
    clearResetPasswordErrors,
    isLoadingResetPassword,
  } = useContext(AuthContext)

  const [complete, setComplete] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (data: User) => {
    try {
      await resetPassword(data.email)
      setComplete(true)
    } catch {
      /* empty */
    }
  }

  useEffect(() => {
    clearResetPasswordErrors()
  }, [])

  if (complete) {
    return (
      <Page>
        <Result
          icon="✉️"
          title="We are almost there."
          description="We sent you an email with a magic login link. With this you will be able to login again and reset your password."
          actions={
            <Button size="medium" onClick={() => navigate('/')}>
              Go home
            </Button>
          }
          data-testid="password-reset-success"
        />
      </Page>
    )
  }

  return (
    <Page {...props}>
      <Container className={styles.container}>
        <Text className={styles.icon}>🔐</Text>
        <Heading title="Reset your password" level={2} />
        <Text isParagraph isMuted className={styles.description}>
          We will send you a magic link which you will be able to login and
          reset your account password.
        </Text>
        {resetPasswordErrors && (
          <Text variant="error" isParagraph>
            {resetPasswordErrors.message}
          </Text>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Controller
            name="email"
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder="📧 Your email"
                data-testid="input-email"
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Button
            type="submit"
            disabled={isLoadingResetPassword}
            data-testid="btn-submit"
          >
            Send me a magic link
          </Button>
          <Button onClick={() => navigate('/sign-in')} variant="outlined">
            <MdArrowBack />
            Back
          </Button>
        </form>
      </Container>
    </Page>
  )
}
