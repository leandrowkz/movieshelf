import React from 'react'
import ContentLoader from 'react-content-loader'
import styles from './styles.module.css'

export const LoaderShowActions = () => (
  <div className={styles.actions}>
    <ContentLoader
      viewBox="0 0 400 75"
      height={75}
      width={400}
      backgroundColor="#f6f6ef"
      foregroundColor="#9CA6AD"
    >
      <rect x="0" y="0" rx="10" ry="10" width="170" height="70" />
      <rect x="200" y="0" rx="10" ry="10" width="170" height="70" />
    </ContentLoader>
  </div>
)
