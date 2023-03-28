import React, { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'img'>

export function Image(props: Props) {
  return <img {...props} alt={props.alt || 'Image'} />
}
