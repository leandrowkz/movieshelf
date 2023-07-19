import React, { type HTMLAttributes } from 'react'
import { CountryFlag, Country } from 'src/types'
import styles from './styles.module.css'
import classNames from 'classnames'
import type { Movie, TVShow } from '@leandrowkz/tmdb'

interface Props extends HTMLAttributes<HTMLDivElement> {
  show: Movie | TVShow
  separator?: string
}

export function ShowCountries({
  show,
  separator = ' ',
  className,
  ...props
}: Props) {
  const classes = classNames(styles.flags, className)

  return (
    <div className={classes} {...props}>
      {show.production_countries?.map((country, index) => {
        const { iso_3166_1: countryCode } = country
        const name = Country[countryCode as unknown as keyof typeof Country]
        const flag = CountryFlag[countryCode as unknown as keyof typeof Country]

        return (
          <span key={index} className={styles.flag}>
            {index > 0 ? <span>{separator}</span> : ''}
            <span title={name}>{flag}</span>
          </span>
        )
      })}
    </div>
  )
}
