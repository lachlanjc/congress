import React from 'react'
import Head from 'next/head'
import App, { Container } from 'next/app'
import ThemeProvider from 'theme'

const meta = tags =>
  tags.map((m, i) => {
    m.key = i
    return React.createElement('meta', m, null)
  })

const title = 'Congress'
const description = 'Work in progress'
const img = '/static/card.png'

export default class extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Head>
          <title children={title} />
          {meta([
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
          ])}
        </Head>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    )
  }
}
