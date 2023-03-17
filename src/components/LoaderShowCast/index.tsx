import React from 'react'
import ContentLoader from 'react-content-loader'
import styles from './styles.module.css'

export const LoaderShowCast = () => (
  <div className={styles.cast}>
    <ContentLoader
      width={400}
      height={100}
      viewBox="0 0 500 120"
      backgroundColor="#f6f6ef"
      foregroundColor="#9CA6AD"
    >
      <circle cx="40" cy="40" r="40" />
      <rect x="20" y="100" rx="5" ry="5" width="40" height="10" />
      <circle cx="150" cy="40" r="40" />
      <rect x="130" y="100" rx="5" ry="5" width="40" height="10" />
      <circle cx="260" cy="40" r="40" />
      <rect x="240" y="100" rx="5" ry="5" width="40" height="10" />
      <circle cx="370" cy="40" r="40" />
      <rect x="350" y="100" rx="5" ry="5" width="40" height="10" />
    </ContentLoader>
  </div>
)
