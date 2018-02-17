import React from 'react'
import { injectGlobal, ThemeProvider as Root } from 'styled-components'
import theme from './config'

injectGlobal`
  body {
    background-color: ${theme.colors.snow};
    font-family: ${theme.font};
  }
  * {
    box-sizing: border-box;
  }
`

const ThemeProvider = props => (
  <Root theme={theme} {...props} children={<div>{props.children}</div>} />
)

export default ThemeProvider
