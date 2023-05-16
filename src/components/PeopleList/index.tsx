import classNames from 'classnames'
import React, { HTMLAttributes } from 'react'
import { MovieHelper } from '../../services/MovieHelper'
import { Person } from '../../types/Person'
import { Text } from '../Text'
import css from './styles.module.css'
import { Motion } from '../Motion'

interface Props extends HTMLAttributes<HTMLDivElement> {
  people: Person[]
  size?: number
}

export function PeopleList({ people, className, size = 4, ...props }: Props) {
  const classes = classNames(css.cast, className)
  const cast = people.slice(0, size)

  const getStyle = (person: Person) => {
    const avatar = MovieHelper.getImageUrl(person.profile_path, 200)

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
