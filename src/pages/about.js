import React, { Fragment } from 'react'
import {
  Container,
  Heading,
  Text,
  Box,
  Button,
  Divider
} from '@hackclub/design-system'
import Link from 'gatsby-link'
import Bio from 'components/Bio'

Button.link = Button.withComponent(Link)

export default () => (
  <Fragment>
    <Box bg="primary" color="white" py={4}>
      <Container maxWidth={40} py={5} px={3}>
        <Heading.h1 f={[5, 6]} fontWeight={900}>
          About
        </Heading.h1>
        <Heading.h2 mt={2} mb={[3, 4]} regular>
          Our voices need to be heard in Congress.
        </Heading.h2>
        <Button.link to="/" inverted children="🏡 Go home" />
      </Container>
    </Box>
    <Container maxWidth={40} py={4} px={3}>
      <Text f={3} my={3}>
        Using data from the Center for Responsive Politics and
        theunitedstates.io. Made at CodeDay DC 2018. Totally open source. Built
        with React, Gatsby, styled-components, and the Hack Club Design System.
      </Text>
      <Divider my={4} />
      <Bio />
    </Container>
  </Fragment>
)
