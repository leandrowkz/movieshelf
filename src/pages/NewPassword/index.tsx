import React, { type HTMLAttributes, useContext, useEffect } from 'react'
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
import { type ResetPassword, ResetPasswordSchema } from 'src/types'
import { AuthContext } from 'src/context/AuthContext'

const formSchema = ResetPasswordSchema.refine(
  ({ confirmPassword, password }) => confirmPassword === password,
  {
    message: `Passwords don't match`,
    path: ['confirmPassword'],
  }
)

export function NewPassword(props: HTMLAttributes<HTMLDivElement>) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPassword>({
    resolver: zodResolver(formSchema),
  })
  const {
    updatePassword,
    updatePasswordErrors,
    clearUpdatePasswordErrors,
    isLoadingUpdatePassword,
  } = useContext(AuthContext)
  const navigate = useNavigate()

  const onSubmit = async (data: ResetPassword) => {
    try {
      if (data.password) {
        await updatePassword(data.password)
      }
      // navigate('/')
    } catch (e) {
      console.log(e)
      /* empty */
    }
  }

  useEffect(() => {
    clearUpdatePasswordErrors()
  }, [])

  return (
    <Page {...props}>
      <Container className={styles.container}>
        <Text className={styles.icon}>🔏</Text>
        <Heading title="New password" level={2} />
        <Text isParagraph isMuted className={styles.description}>
          You got here through a magic link, which means you are already logged
          in. We still recommend you to reset your password through the form
          below.
        </Text>
        {updatePasswordErrors && (
          <Text variant="error" isParagraph>
            {updatePasswordErrors.message}
          </Text>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Controller
            name="password"
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="🔐 New password"
                data-testid="input-password"
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="🔐 Confirm your new password"
                data-testid="input-new-password"
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />

          <Button
            type="submit"
            disabled={isLoadingUpdatePassword}
            data-testid="btn-submit"
          >
            Set new password
          </Button>
          <Button onClick={() => navigate('/')} variant="outlined">
            Go home
          </Button>
        </form>
      </Container>
    </Page>
  )
}
