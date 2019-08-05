const { createElement: h } = require('react')

const width = 1024
const padding = 0.125 * width

module.exports = () =>
  h(
    'div',
    {
      style: {
        boxSizing: 'border-box',
        margin: 0,
        padding,
        width,
        height: width / 2,
        backgroundImage: 'url(https://congress.now.sh/static/hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    h(
      'h1',
      {
        style: {
          fontFamily: 'gt-america-bold',
          fontSize: 128,
          color: 'white',
          textAlign: 'center',
          textShadow: '0 3px 6px rgba(0, 0, 0, .5)'
        }
      },
      'Congress'
    )
  )
