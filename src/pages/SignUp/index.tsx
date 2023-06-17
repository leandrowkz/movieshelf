import React, { HTMLAttributes, useContext, useEffect } from 'react'
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
import { User, UserSchema } from 'src/types/User'
import { AuthContext } from 'src/context/AuthContext'

export function SignUp(props: HTMLAttributes<HTMLDivElement>) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(UserSchema.required({ password: true })),
  })
  const { signUp, isLoadingSignUp, signUpErrors, clearSignUpErrors } =
    useContext(AuthContext)
  const navigate = useNavigate()

  const onSubmit = async (data: User) => {
    try {
      await signUp(data)
      navigate('/')
    } catch {
      /* empty */
    }
  }

  useEffect(() => {
    clearSignUpErrors()
  }, [])

  return (
    <Page {...props}>
      <Container className={styles.container}>
        <Heading title="🍿 Create an account" level={2} />
        <Text isParagraph isMuted>
          Sign up to movieshelf to save your favorite movies and TV shows,
          create lists and more. It&apos;s that easy.
        </Text>
        {signUpErrors && (
          <Text variant="error" isParagraph>
            {signUpErrors.message}
          </Text>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Controller
            name="name"
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Input
                {...field}
                type="name"
                placeholder="😌 Your name"
                data-testid="input-name"
                errorMessage={errors.name?.message}
              />
            )}
          />

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
                placeholder="🔐 Define a password"
                data-testid="input-password"
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            type="submit"
            disabled={isLoadingSignUp}
            data-testid="btn-submit"
          >
            Sign up
          </Button>
        </form>
        <div className={styles.alreadyHaveAccount}>
          <Text>
            Already have an account? Try <Link to="/sign-in">Sign in</Link>.
          </Text>
        </div>
      </Container>
    </Page>
  )
}
