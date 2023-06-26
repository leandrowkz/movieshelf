import { DropdownState } from './types'

export const initialState: DropdownState = {
  isOpen: false,
  close: () => null,
  toggle: () => null,
}
