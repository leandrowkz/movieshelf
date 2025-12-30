import React, { type HTMLAttributes } from 'react'
import { Container } from '../../components/Container'
import { Heading } from '../../components/Heading'
import styles from './styles.module.css'
import { Page } from '../../components/Page'
import { Text } from '../../components/Text'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'

export function NotFound(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <Page {...props}>
      <Container className={styles.container}>
        <div className={styles.icon}>🍿</div>
        <Heading title="Not found." level={1} />
        <Text size="large">The page you requested does not exist.</Text>
        <div className={styles.actions}>
          <Link to="/">
            <Button size="medium">Go home</Button>
          </Link>
        </div>
      </Container>
    </Page>
  )
}
