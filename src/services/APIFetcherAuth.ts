import { useSupabase } from 'src/hooks/useSupabase'
import { APIFetcherPublic } from './APIFetcherPublic'

export abstract class APIFetcherAuth extends APIFetcherPublic {
  constructor(url: string) {
    super(url)
  }

  public async initializeAuthentication() {
    const { supabase } = useSupabase()

    const { data } = await supabase.auth.getSession()

    if (data.session) {
      const { session } = data

      this.addHeader('Authorization', `Bearer ${session.access_token}`)
    }
  }
}
