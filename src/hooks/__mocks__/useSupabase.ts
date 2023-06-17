export const useSupabase = () => ({
  supabase: {
    auth: jest.fn(),
  },
  transformSession: jest.fn(),
})
