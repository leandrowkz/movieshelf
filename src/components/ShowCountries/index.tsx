import React, { HTMLAttributes } from 'react'
import { Movie } from 'src/types/Movie'
import { CountryFlag } from 'src/types/CountryFlag'
import { Country } from 'src/types/Country'
import styles from './styles.module.css'
import classNames from 'classnames'

interface Props extends HTMLAttributes<HTMLDivElement> {
  show: Movie
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
