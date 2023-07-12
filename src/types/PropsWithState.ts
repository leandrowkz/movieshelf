import type { PropsWithChildren } from 'react'

export type PropsWithState<T> = PropsWithChildren & { state?: T }
