import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import { Container, Card, Heading, Text, Box } from '@hackclub/design-system'

export default ({ data: { markdownRemark } }) => (
  <Container maxWidth={36} p={3}>
    <Helmet title={name} />
    <Heading.h1 f={6} m={0}>
      {name}
    </Heading.h1>
    <Text mt={2} f={2} color="grey" caps>
      This is a profile
    </Text>
  </Container>
)

// export const pageQuery = graphql``
