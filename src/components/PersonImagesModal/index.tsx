import React, { type HTMLAttributes, useContext } from 'react'
import classNames from 'classnames'
import css from './styles.module.css'
import { useHelpers } from 'src/hooks/useHelpers'
import { Image } from '../Image'
import { PeopleContext } from 'src/context/PeopleContext'
import { Avatar } from '../Avatar'

export function PersonImagesModal(props: HTMLAttributes<HTMLDivElement>) {
  const { getShowImageUrl } = useHelpers()

  const { images, closeModalImage, setActiveImage } = useContext(PeopleContext)

  const { open, data, active } = images
  const imageUrl = getShowImageUrl(active.file_path)

  return (
    <div
      {...props}
      className={classNames(css.activeImageBackdrop, {
        [css.open]: open,
      })}
      onClick={() => closeModalImage()}
    >
      <Image
        className={css.activeImage}
        src={imageUrl}
        onClick={(e) => e.stopPropagation()}
      />
      <div className={css.images}>
        {data.map((image, index) => (
          <Avatar
            key={`person-image-modal-${index}`}
            image={getShowImageUrl(image.file_path)}
            className={css.image}
            onClick={(e) => {
              e.stopPropagation()
              setActiveImage(image)
            }}
            data-testid="person-image-modal-item"
          />
        ))}
      </div>
    </div>
  )
}
