import React, { Fragment } from 'react'
import { injectGlobal, ThemeProvider as Root } from 'styled-components'
import { theme as baseTheme } from '@hackclub/design-system'
import palx from 'palx'

const primary = '#0069ff'
export const palette = palx(primary)

export const grays = {
  black: palette.black,
  slate: palette.gray[8],
  silver: palette.gray[7],
  smoke: palette.gray[2],
  snow: palette.gray[0],
  white: '#ffffff'
}

export const brand = {
  primary,
  accent: palette.red[7],
  brand: palette.violet[7],
  success: palette.teal[7],
  info: palette.blue[7],
  warning: palette.orange[7],
  error: palette.red[7],
  muted: grays.silver,

  dem: palette.blue[7],
  rep: palette.red[7],
  ind: palette.violet[7]
}

export const colors = {
  ...brand,
  ...grays,
  ...palette
}

export const font =
  'GT-America,"Avenir Next","Segoe UI",Roboto,"Helvetica Neue",sans-serif'

const theme = {
  ...baseTheme,
  colors,
  font
}

export default theme
