import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import ThemeProvider from 'theme'

const meta = tags =>
  tags.map((m, i) => {
    m.key = i
    return React.createElement('meta', m, null)
  })

const title = 'Congress'
const description = 'Work in progress'
const img = '/static/card.png'

export default class extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(
        <ThemeProvider>
          <App {...props} />
        </ThemeProvider>
      )
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
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
          {this.props.styleTags}
        </Head>
        <body>
          <ThemeProvider>
            <Main />
          </ThemeProvider>
          <NextScript />
        </body>
      </html>
    )
  }
}
