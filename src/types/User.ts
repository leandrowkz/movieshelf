export type User = {
  id: number
  name: string
  email: string
}

export type WithPassword<T> = T & { password: string }

export type EmailAndPasswordOnly = Pick<
  WithPassword<User>,
  'email' | 'password'
>
