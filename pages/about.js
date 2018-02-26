import React from 'react'
import ThemeProvider from 'theme'
import Link from 'theme/link'
import {
  Container,
  Heading,
  Text,
  Box,
  Button,
  Divider
} from '@hackclub/design-system'
import Bio from 'components/Bio'

export default () => (
  <ThemeProvider>
    <Box bg="primary" color="white" py={4}>
      <Container maxWidth={40} py={5} px={3}>
        <Heading.h1 f={[5, 6]} fontWeight={900}>
          About
        </Heading.h1>
        <Heading.h2 mt={2} mb={[3, 4]} regular>
          Our voices need to be heard in Congress.
        </Heading.h2>
        <Link.btn href="/" inverted children="🏡 Go home" />
      </Container>
    </Box>
    <Container maxWidth={40} py={4} px={3}>
      <Text f={3} my={3}>
        Using data from the Center for Responsive Politics and
        theunitedstates.io. Started at CodeDay DC 2018. Totally open source. Built
        with React, Next.js, styled-components, and the Hack Club Design System.
      </Text>
      <Divider my={4} />
      <Bio />
    </Container>
  </ThemeProvider>
)
