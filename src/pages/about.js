import React from 'react'
import {
  Container,
  Heading,
  Text,
  Box,
  Button,
  Link,
  Divider
} from '@hackclub/design-system'
import Bio from 'components/Bio'

export default () => (
  <Container maxWidth={36} py={5}>
    <Heading.h1 color="primary" f={[5, 6]}>
      About
    </Heading.h1>
    <Text f={3} my={3}>
      Work in progress app to rescue democracy.
    </Text>
    <Divider mx={0} />
    <Bio />
  </Container>
)
