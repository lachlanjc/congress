import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import {
  Container,
  Heading,
  Text,
  Button,
  Box,
  Flex
} from '@hackclub/design-system'
import Search from 'components/Search'

export default () => (
  <main>
    <Box bg="primary">
      <Container w={1} maxWidth={36} py={5}>
        <Heading.h1 color="white" f={[5, 6]} mt={0}>
          Congress
        </Heading.h1>
        <Text color="white" f={3} my={3}>
          Work in progress
        </Text>
      </Container>
    </Box>
    <Container w={1} maxWidth={36} py={4}>
      <Heading.h2 f={2} color="muted" caps regular mb={2}>
        Your Representative
      </Heading.h2>
      <Search />
    </Container>
  </main>
)

// export const pageQuery = graphql``
