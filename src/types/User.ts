import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().nonempty().min(6).optional(),
  confirmPassword: z.string().nonempty().min(6).optional(),
})

export const ResetPasswordSchema = z.object({
  password: z.string().nonempty().min(6),
  confirmPassword: z.string().nonempty().min(6),
})

export type ResetPassword = z.infer<typeof ResetPasswordSchema>

export type User = z.infer<typeof UserSchema>
