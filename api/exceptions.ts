type AuthorizationErrorTypes = 'INVALID_ACCESS_TOKEN' | 'UNAUTHORIZED'

export class AuthorizationError extends Error {
  constructor(message: AuthorizationErrorTypes) {
    super(message)
  }
}
