import React, { type HTMLAttributes } from 'react'
import classNames from 'classnames'
import css from './styles.module.css'
import { Text } from '../Text'
import { Motion } from '../Motion'
import type { Image as PersonImage, Person } from '@leandrowkz/tmdb'
import { useHelpers } from 'src/hooks/useHelpers'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { Avatar } from '../Avatar'
import { Heading } from '../Heading'
import { MdCake, MdPlace } from 'react-icons/md'
import { PersonLoader } from './loader'

interface PersonImagesProps extends HTMLAttributes<HTMLDivElement> {
  images: PersonImage[]
  isLoading?: boolean
}

export function PersonImages({
  images,
  isLoading = false,
  ...props
}: PersonImagesProps) {
  const { getShowImageUrl } = useHelpers()

  if (isLoading) {
    return <PersonLoader data-testid="person-loader" />
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
          <div
            {...props}
            key={`person-image-${index}`}
            className={classes}
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            {title}
          </div>
        )
      })}
    </Motion>
  )
}
