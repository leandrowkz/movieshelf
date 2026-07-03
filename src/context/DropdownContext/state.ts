import type { DropdownState } from './types'

export const initialState: DropdownState = {
  isOpen: false,
  open: () => null,
  close: () => null,
  toggle: () => null,
}
