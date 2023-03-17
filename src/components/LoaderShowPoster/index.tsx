import React from 'react'
import ContentLoader from 'react-content-loader'

export const LoaderShowPoster = () => (
  <div>
    <ContentLoader
      speed={1}
      width={300}
      height={450}
      viewBox="0 0 300 450"
      backgroundColor="#f6f6ef"
      foregroundColor="#9CA6AD"
    >
      <rect x="0" y="0" rx="12" ry="12" width="300" height="450" />
    </ContentLoader>
  </div>
)
