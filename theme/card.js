const { createElement: h } = require('react')

const width = 512
const widthIcon = 0.75 * width
const padding = 0.125 * width

module.exports = props =>
  h(
    'div',
    {
      style: {
        boxSizing: 'border-box',
        margin: 0,
        padding,
        width,
        height: width,
        backgroundColor: '#9500ff',
        backgroundImage: 'linear-gradient(64deg, #7a6fff, #9500ff)'
      }
    },
    h('img', {
      src: 'https://icon.now.sh/ring_volume/ffffff',
      style: { width: widthIcon }
    })
  )
