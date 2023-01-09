import { injectGlobal } from 'styled-components'
import { theme as base } from '@hackclub/design-system'
import palx from 'palx'

const primary = '#0069ff'
export const palette = palx(primary)

export const grays = {
  black: palette.black,
  slate: palette.gray[9],
  silver: palette.gray[7],
  smoke: palette.gray[2],
  snow: palette.gray[0],
  white: '#ffffff',
}

export const brand = {
  primary,
  accent: palette.red[5],
  brand: palette.violet[5],
  success: palette.teal[5],
  info: palette.blue[5],
  warning: palette.orange[5],
  error: palette.red[7],
  muted: grays.silver,

  dem: palette.blue[5],
  rep: palette.red[5],
  ind: palette.violet[5],
  lib: palette.orange[5],
}

export const colors = {
  ...brand,
  ...grays,
  ...palette,
}

export const font =
  'GT-America,system-ui,"Segoe UI",Roboto,"Helvetica Neue",sans-serif'

const theme = {
  ...base,
  colors,
  font,
}

export default theme

injectGlobal`
  @font-face {
    src: url('/fonts/gt-america-ultralight.woff') format('woff');
    font-family: GT-America;
    font-weight: 100;
  }
  @font-face {
    src: url('/fonts/gt-america-thin.woff') format('woff');
    font-family: GT-America;
    font-weight: 200;
  }
  @font-face {
    src: url('/fonts/gt-america-light.woff') format('woff');
    font-family: GT-America;
    font-weight: 300;
  }
  @font-face {
    src: url('/fonts/gt-america-regular.woff') format('woff');
    font-family: GT-America;
    font-weight: 400;
  }
  @font-face {
    src: url('/fonts/gt-america-medium.woff') format('woff');
    font-family: GT-America;
    font-weight: 500;
  }
  @font-face {
    src: url('/fonts/gt-america-bold.woff') format('woff');
    font-family: GT-America;
    font-weight: 700;
  }
  @font-face {
    src: url('/fonts/gt-america-black.woff') format('woff');
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
