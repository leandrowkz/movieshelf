import React from 'react'
import ContentLoader from 'react-content-loader'
import styles from './styles.module.css'

export const LoaderShowDetails = () => (
  <div>
    <div className={styles.header}>
      <ContentLoader
        speed={1}
        width={500}
        height={80}
        viewBox="0 0 500 80"
        backgroundColor="#f6f6ef"
        foregroundColor="#9CA6AD"
      >
        <rect x="0" y="0" rx="8" ry="8" width="500" height="30" />
        <rect x="0" y="60" rx="5" ry="5" width="108" height="13" />
        <rect x="129" y="60" rx="5" ry="5" width="60" height="13" />
        <rect x="210" y="60" rx="5" ry="5" width="60" height="13" />
        <rect x="300" y="60" rx="5" ry="5" width="80" height="13" />
      </ContentLoader>
    </div>
    <div>
      <ContentLoader
        viewBox="0 0 600 100"
        height={100}
        width={600}
        backgroundColor="#f6f6ef"
        foregroundColor="#9CA6AD"
      >
        <rect x="0" y="0" rx="4" ry="4" width="550" height="10" />
        <rect x="0" y="30" rx="4" ry="4" width="600" height="10" />
        <rect x="0" y="60" rx="4" ry="4" width="500" height="10" />
        <rect x="0" y="90" rx="4" ry="4" width="580" height="10" />
      </ContentLoader>
    </div>
  </div>
)
