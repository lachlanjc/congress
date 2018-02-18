import React from 'react'
import {
  Container,
  BackgroundImage,
  Heading,
  Text,
  Button,
  Box,
  Divider,
  Link as A
} from '@hackclub/design-system'
import Link from 'gatsby-link'

A.link = A.withComponent(Link)

const Footer = () => (
  <Container w={1} maxWidth={36} px={3} pb={5}>
    <Divider />
    <Text color="muted" f={2} align="center" py={3}>
      A project by <A href="https://lachlanjc.me">@lachlanjc</A>
      {' — '}
      <A.link to="/about">read more</A.link>
    </Text>
  </Container>
)

export default Footer
