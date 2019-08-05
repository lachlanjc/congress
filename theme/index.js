import React from 'react'
import { injectGlobal, ThemeProvider as Root } from 'styled-components'
import theme from './config'

const ThemeProvider = props => (
  <Root theme={theme} {...props} children={<>{props.children}</>} />
)

export default ThemeProvider
