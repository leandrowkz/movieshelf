import React, { type HTMLAttributes } from 'react'
import { Page } from '../../components/Page'
import { Container } from '../../components/Container'
import { ShowListLoader } from '../../components/ShowList/loader'
import { Loader, Rectangle } from '../../components/Loader'

export function TVShowsLoader(
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
