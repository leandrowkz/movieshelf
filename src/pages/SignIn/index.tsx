import React, { type HTMLAttributes, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

export function SignIn(props: HTMLAttributes<HTMLDivElement>) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(
      UserSchema.partial().required({ email: true, password: true })
    ),
  })
  const { signIn, isLoadingSignIn, signInErrors, clearSignInErrors } =
    useContext(AuthContext)
  const navigate = useNavigate()

  const onSubmit = async (data: User) => {
    try {
      await signIn(data)
      navigate('/')
    } catch {
      /* empty */
    }
  }

  useEffect(() => {
    clearSignInErrors()
  }, [])

  return (
    <Page {...props}>
      <Container className={styles.container}>
        <Heading title="➡️ Login to movieshelf" level={2} />
        <Text isParagraph isMuted>
          Sign in to movieshelf to continue saving your favorite movies and TV
          shows.
        </Text>
        {signInErrors && (
          <Text variant="error" isParagraph>
            {signInErrors.message}
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

          <Controller
            name="password"
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="🔐 Your password"
                data-testid="input-password"
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            type="submit"
            disabled={isLoadingSignIn}
            data-testid="btn-submit"
          >
            Sign in
          </Button>
        </form>
        <div className={styles.alreadyHaveAccount}>
          <Text>
            Do not have an account yet? <Link to="/sign-up">Sign up</Link> now.
          </Text>
        </div>
      </Container>
    </Page>
  )
}
