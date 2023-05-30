import React from 'react'
import styles from './styles.module.css'
import { Loader, Paragraph, Rectangle } from '../Loader'
import { Motion } from '../Motion'
import { TVEpisodeListLoader } from '../TVEpisodeList/loader'
import { Container } from '../Container'

export function TVSeasonDetailsLoader() {
  return (
    <Container>
      <Motion>
        <Loader>
          <Paragraph className={styles.loaderOverview} lines={3} />
          <Rectangle className={styles.loaderEpisodeCount} width="150px" />
        </Loader>
        <TVEpisodeListLoader />
      </Motion>
    </Container>
  )
}
