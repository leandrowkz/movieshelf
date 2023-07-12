import React, { type HTMLAttributes } from 'react'
import classNames from 'classnames'
import { Text } from '../Text'
import css from './styles.module.css'
import { Motion } from '../Motion'
import type { PersonCast } from '@leandrowkz/tmdb'
import { useHelpers } from 'src/hooks/useHelpers'
import { useScreenSize } from 'src/hooks/useScreenSize'

interface Props extends HTMLAttributes<HTMLDivElement> {
  people: PersonCast[]
  size?: number
}

export function PeopleList({ people, className, size = 4, ...props }: Props) {
  const { getShowImageUrl } = useHelpers()
  const isMobile = useScreenSize('mobile')
  const cast = people.slice(0, size)
  const classes = classNames(css.cast, className, {
    [css.mobile]: isMobile,
  })

  const getStyle = (person: PersonCast) => {
    const avatar = getShowImageUrl(person.profile_path || '', 200)

    return { backgroundImage: `url(${avatar})` }
  }

  return (
    <Motion tag="div" className={classes} {...props}>
      {cast.map((actor, index) => (
        <div key={index} className={css.person} title={actor.name}>
          <div
            className={css.avatar}
            style={getStyle(actor)}
            data-testid="person-avatar"
          />
          <Text
            size="small"
            alignment="center"
            className={css.name}
            isMuted
            data-testid="person-name"
          >
            {actor.name}
          </Text>
        </div>
      ))}
    </Motion>
  )
}
