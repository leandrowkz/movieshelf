import React, { type HTMLAttributes, useContext } from 'react'
import classNames from 'classnames'
import css from './styles.module.css'
import { Text } from '../Text'
import { Motion } from '../Motion'
import type { Image as PersonImage } from '@leandrowkz/tmdb'
import { useHelpers } from 'src/hooks/useHelpers'
import { PersonImagesLoader } from './loader'
import { PeopleContext } from 'src/context/PeopleContext'
import { Avatar } from '../Avatar'

interface PersonImagesProps extends HTMLAttributes<HTMLDivElement> {
  images: PersonImage[]
  isLoading?: boolean
}

export function PersonImages({
  images,
  isLoading = false,
  ...props
}: PersonImagesProps) {
  const { openModalImage } = useContext(PeopleContext)
  const { getShowImageUrl } = useHelpers()

  if (isLoading) {
    return <PersonImagesLoader {...props} data-testid="person-images-loader" />
  }

  const countImages = images.length
  const previewImages = images.slice(0, 3)

  return (
    <Motion
      {...props}
      tag="div"
      className={classNames(css.images, props.className)}
    >
      {previewImages.map((image, index) => {
        const imageUrl = getShowImageUrl(image.file_path)
        const title =
          index === 2 ? (
            <Text className={css.moreTitle} isBold>
              +{countImages - 2} Photos
            </Text>
          ) : (
            ''
          )
        const classes = classNames(css.image, {
          [css.moreBackdrop]: index === 2,
        })

        return (
          <Avatar
            {...props}
            key={`person-image-${index}`}
            className={classes}
            image={imageUrl}
            onClick={() => openModalImage(image)}
            data-testid="person-image"
          >
            {title}
          </Avatar>
        )
      })}
    </Motion>
  )
}
