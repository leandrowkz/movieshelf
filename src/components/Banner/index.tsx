import React, { HTMLAttributes, ReactElement } from 'react'
import styles from './styles.module.css'
import { Heading } from '../Heading'
import { Movie } from 'src/types/Movie'
import classNames from 'classnames'
import { BannerLoader } from './loader'
import { BannerPages } from './pages'
import { Container } from '../Container'

interface Props extends HTMLAttributes<HTMLElement> {
  shows: Movie[]
  isLoading?: boolean
}

export function Banner({
  shows,
  isLoading = false,
  className,
  ...props
}: Props) {
  const classes = classNames(className, styles.container)

  const content = (children: ReactElement) => (
    <Container {...props}>
      <section className={classes}>
        <div className={styles.heading} data-testid="header">
          <Heading title="Trending&nbsp;" level={1} />
          <Heading title="now" level={1} isThin />
        </div>
        {children}
      </section>
    </Container>
  )

  if (isLoading) {
    return content(<BannerLoader data-testid="loader" />)
  }

  return content(<BannerPages shows={shows} data-testid="pages" />)
}
