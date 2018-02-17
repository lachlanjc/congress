import React from 'react'
import { Heading, Text } from '@hackclub/design-system'
import Link from 'gatsby-link'

const Header = props => (
  <Link to="/">
    <Heading.h1 color="primary" my={3} f={6} {...props}>
      Congress
    </Heading.h1>
  </Link>
)

export default Header
