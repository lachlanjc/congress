import React from 'react'
import Helmet from 'react-helmet'
import ThemeProvider from '../theme'
import Link from 'gatsby-link'

const title = 'Congress'
const description = 'Work in progress'
const img = '/card.png'

const Template = ({ children, ...props }) => (
  <ThemeProvider {...props}>
    <Helmet
      meta={[
        { name: 'description', content: description },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:description', content: description },
        { name: 'twitter:title', content: title },
        { name: 'twitter:image:src', content: img },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: img },
        { property: 'og:image:height', content: 512 },
        { property: 'og:image:width', content: 512 }
      ]}
    >
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
    </Helmet>
    {children()}
  </ThemeProvider>
)

export default Template
