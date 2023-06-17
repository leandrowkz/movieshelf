import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().nonempty().min(6).optional(),
})

export type User = z.infer<typeof UserSchema>
