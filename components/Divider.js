import styled from 'styled-components'
import { Box } from '@hackclub/design-system'

const Divider = styled(Box.withComponent('hr'))`
  height: 1px;
  height: 0.5px;
  border: 0;
  border-radius: ${({ theme }) => theme.pill};
  background-color: currentColor;
`

Divider.displayName = 'Divider'

Divider.defaultProps = {
  mx: 0,
  color: 'smoke'
}

export default Divider
