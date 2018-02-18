import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import {
  Container,
  BackgroundImage,
  Heading,
  Text,
  Button,
  Box,
  Flex
} from '@hackclub/design-system'
import Search from 'components/Search'

const Mark = Text.withComponent('mark').extend`
  background: transparent url(/underline.svg) bottom left no-repeat;
  background-size: 100% 0.5rem;
  padding-bottom: 0.25rem;
  color: inherit;
`

export default () => (
  <Fragment>
    <BackgroundImage
      image="/hero.jpg"
      bg="primary"
      py={[5, 6]}
      px={3}
      align="center"
    >
      <Heading.h1 color="white" f={[5, 6]} mt={0}>
        Let’s <Mark>take back</Mark> Congress.
      </Heading.h1>
      <Container w={1} maxWidth={36}>
        <Heading.h2 color="white" f={[3, 4]} my={3} regular>
          Our members of Congress work for us, the people. But they’re only
          listening to their big donors.
          <br />
          <strong>Make your voice heard.</strong>
        </Heading.h2>
      </Container>
    </BackgroundImage>
    <Container w={1} maxWidth={36} py={4} px={3}>
      <Heading.h2 f={4} mb={2}>
        Find your Congresspeople
      </Heading.h2>
      <Search />
    </Container>
  </Fragment>
)
