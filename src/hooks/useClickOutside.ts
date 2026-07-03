import { type RefObject, useEffect } from 'react'

export function useClickOutside(
  ref: RefObject<HTMLDivElement>,
  handleClickOutside: () => void
) {
  useEffect(() => {
    function onHandleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClickOutside()
      }
    }

    document.addEventListener('mousedown', onHandleClickOutside)

    return () => {
      document.removeEventListener('mousedown', onHandleClickOutside)
    }
  }, [ref, handleClickOutside])
}
