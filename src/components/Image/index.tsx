import React, { ComponentPropsWithoutRef } from 'react'
import { MovieHelper } from 'src/services/MovieHelper'

interface Props extends ComponentPropsWithoutRef<'img'> {}

export function Image(props: Props) {

  return (
    <img {...props} alt={props.alt || 'Image'} onError={MovieHelper.hideBrokenImage} />
  )
}
