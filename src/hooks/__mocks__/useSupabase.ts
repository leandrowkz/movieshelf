import { mockSession } from 'src/__mocks__/mockSession'

export const useSupabase = () => ({
  supabase: {
    auth: {
      getSession: () => ({ ...mockSession }),
      signInWithPassword: () => ({ ...mockSession }),
      signUp: () => ({ ...mockSession }),
      signOut: () => null,
    },
  },
  transformSession: jest.fn(),
})
