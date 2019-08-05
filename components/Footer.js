import React from 'react'
import { Container, Text, Divider, Link as A } from '@hackclub/design-system'
import Link from '../theme/link'

const Footer = () => (
  <Container width={1} maxWidth={36} px={3} pb={5}>
    <Divider />
    <Text color="muted" fontSize={2} align="center" py={3}>
      A project by <A href="https://lachlanjc.me">@lachlanjc</A>
      {' — '}
      <Link href="/about">read more</Link>
    </Text>
  </Container>
)

export default Footer
