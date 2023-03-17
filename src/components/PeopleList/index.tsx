import classNames from 'classnames'
import React, { ComponentPropsWithoutRef } from 'react'
import { MovieHelper } from 'src/services/MovieHelper'
import { Person } from 'src/types/Person'
import { Text } from '../Text'
import css from './styles.module.css'

interface Props extends ComponentPropsWithoutRef<'div'> {
  people: Person[]
  width?: number | 'auto'
}

export function PeopleList({ people, className, width = 'auto' }: Props) {
  const classes = classNames(css.cast, className)
  const style = { width }
  const cast = people.slice(0, 4)

  const getStyle = (person: Person) => {
    const avatar = MovieHelper.getImageUrl(person.profile_path, 200)

    return { backgroundImage: `url(${avatar})` }
  }

  return (
    <div className={classes} style={style}>
      {cast.map((actor, index) => (
        <div key={index} className={css.person} title={actor.name}>
          <div className={css.avatar} style={getStyle(actor)} />
          <Text size="small" alignment="center" className={css.name} isMuted>
            {actor.name}
          </Text>
        </div>
      ))}
    </div>
  )
}
