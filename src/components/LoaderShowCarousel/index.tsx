import React from 'react'
import ContentLoader from 'react-content-loader'
import { Container } from '../Container'
import styles from './styles.module.css'

export const LoaderShowCarousel = () => (
  <Container className={styles.loader}>
    <ContentLoader
      height="100%"
      width="100%"
      viewBox="0 0 900 250"
      backgroundColor="#d9d9d9"
      foregroundColor="#9CA6AD"
    >
      <rect x="0" y="0" rx="15" ry="15" width="150" height="200" />
      <rect x="0" y="220" rx="4" ry="4" width="100" height="10" />
      <rect x="120" y="220" rx="4" ry="4" width="30" height="10" />
      <rect x="170" y="0" rx="15" ry="15" width="150" height="200" />
      <rect x="170" y="220" rx="4" ry="4" width="100" height="10" />
      <rect x="290" y="220" rx="4" ry="4" width="30" height="10" />
      <rect x="340" y="0" rx="15" ry="15" width="150" height="200" />
      <rect x="340" y="220" rx="4" ry="4" width="100" height="10" />
      <rect x="460" y="220" rx="4" ry="4" width="30" height="10" />
      <rect x="510" y="0" rx="15" ry="15" width="150" height="200" />
      <rect x="510" y="220" rx="4" ry="4" width="100" height="10" />
      <rect x="630" y="220" rx="4" ry="4" width="30" height="10" />
      <rect x="680" y="0" rx="15" ry="15" width="150" height="200" />
      <rect x="680" y="220" rx="4" ry="4" width="100" height="10" />
      <rect x="800" y="220" rx="4" ry="4" width="30" height="10" />
      <rect x="850" y="0" rx="15" ry="15" width="150" height="200" />
      <rect x="850" y="220" rx="4" ry="4" width="100" height="10" />
      <rect x="970" y="220" rx="4" ry="4" width="30" height="10" />
      <rect x="1020" y="0" rx="15" ry="15" width="150" height="200" />
      <rect x="1020" y="220" rx="4" ry="4" width="100" height="10" />
      <rect x="970" y="220" rx="4" ry="4" width="30" height="10" />
    </ContentLoader>
  </Container>
)
