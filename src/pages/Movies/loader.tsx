import React, { type HTMLAttributes } from 'react'
import { Page } from '../../components/Page'
import { Container } from 'src/components/Container'
import { ShowListLoader } from 'src/components/ShowList/loader'
import { Loader, Rectangle } from 'src/components/Loader'

export function MoviesLoader(
  props: HTMLAttributes<HTMLDivElement>
): JSX.Element {
  return (
    <Page {...props}>
      <Container>
        <Loader>
          <Rectangle width={250} height={40} />
        </Loader>
        <ShowListLoader />
      </Container>
    </Page>
  )
}
