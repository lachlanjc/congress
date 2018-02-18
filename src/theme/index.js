import React, { Fragment } from 'react'
import { injectGlobal, ThemeProvider as Root } from 'styled-components'
import theme from './config'

injectGlobal`
  @font-face {
    src: url('/gt-america-ultralight.woff') format('woff');
    font-family: GT-America;
    font-weight: 100;
  }
  @font-face {
    src: url('/gt-america-thin.woff') format('woff');
    font-family: GT-America;
    font-weight: 200;
  }
  @font-face {
    src: url('/gt-america-light.woff') format('woff');
    font-family: GT-America;
    font-weight: 300;
  }
  @font-face {
    src: url('/gt-america-regular.woff') format('woff');
    font-family: GT-America;
    font-weight: 400;
  }
  @font-face {
    src: url('/gt-america-medium.woff') format('woff');
    font-family: GT-America;
    font-weight: 500;
  }
  @font-face {
    src: url('/gt-america-bold.woff') format('woff');
    font-family: GT-America;
    font-weight: 700;
  }
  @font-face {
    src: url('/gt-america-black.woff') format('woff');
    font-family: GT-America;
    font-weight: 900;
  }

  body {
    background-color: ${theme.colors.snow};
    font-family: ${theme.font};
  }
  * {
    box-sizing: border-box;
  }
`

const ThemeProvider = props => (
  <Root
    theme={theme}
    {...props}
    children={<Fragment>{props.children}</Fragment>}
  />
)

export default ThemeProvider
