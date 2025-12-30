import React, {
  type HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Container } from '../../components/Container'
import { Heading } from '../../components/Heading'
import styles from './styles.module.css'
import { Page } from '../../components/Page'
import { Text } from '../../components/Text'
import { Button } from '../../components/Button'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '../../components/Input'
import { type User, UserSchema } from '../../types'
import { AuthContext } from '../../context/AuthContext'
import { Result } from '../../components/Result'
import { GoogleAuthButton } from '../../components/GoogleAuthButton'

type UserForm = User & { confirmPassword: string }
const formSchema = UserSchema.required({
  password: true,
  confirmPassword: true,
}).refine(({ confirmPassword, password }) => confirmPassword === password, {
  message: `Passwords don't match`,
  path: ['confirmPassword'],
})

export function SignUp(props: HTMLAttributes<HTMLDivElement>) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(formSchema),
  })
  const { signUp, isLoadingSignUp, signUpErrors, clearSignUpErrors } =
    useContext(AuthContext)
  const [complete, setComplete] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (data: User) => {
    try {
      await signUp(data)
      setComplete(true)
    } catch {
      /* empty */
    }
  }

  useEffect(() => {
    clearSignUpErrors()
  }, [])

  if (complete) {
    return (
      <Page>
        <Result
          icon="✉️"
          title="We are almost there."
          description="You need to confirm your account through the link we sent you by email."
          actions={
            <Button size="medium" onClick={() => navigate('/')}>
              Go home
            </Button>
          }
          data-testid="signup-success"
        />
      </Page>
    )
  }

  return (
    <Page {...props}>
      <Container className={styles.container}>
        <Text className={styles.icon}>🎬</Text>
        <Heading title="Create an account" level={2} />
        <Text isParagraph isMuted className={styles.description}>
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
                placeholder="🔐 Set your password"
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
                placeholder="🔐 Confirm your password"
                data-testid="input-password-confirm"
                errorMessage={errors.confirmPassword?.message}
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
          <GoogleAuthButton
            label="Sign up with google"
            data-testid="btn-google"
          />
        </form>
        <div className={styles.alreadyHaveAccount}>
          <Text isMuted>
            Already have an account? <Link to="/sign-in">Try Sign in</Link>.
          </Text>
        </div>
      </Container>
    </Page>
  )
}
