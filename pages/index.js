import React from 'react'
import styled from 'styled-components'
import ThemeProvider from 'theme'
import {
  Container,
  BackgroundImage,
  Heading,
  Text,
  Card,
  Link as A
} from '@hackclub/design-system'
import Search from 'components/Search'
import Footer from 'components/Footer'

const Mark = styled(Text.withComponent('mark'))`
  background: transparent url(/underline.svg) bottom left no-repeat;
  background-size: 100% 0.75rem;
  padding-bottom: 0.375rem;
  color: inherit;
`

export default () => (
  <ThemeProvider>
    <BackgroundImage
      image="/static/hero.jpg"
      bg="primary"
      py={[5, 6]}
      px={2}
      align="center"
    >
      <Heading.h1 color="white" fontSize={6} mt={0}>
        Let’s <Mark>take back</Mark> Congress.
      </Heading.h1>
      <Container w={1} maxWidth={36}>
        <Heading.h2 color="white" fontSize={[3, 4]} my={3} regular>
          Our members of Congress work for us, the people. But they’re only
          listening to their big donors.
          <br />
          <strong>Make your voice heard.</strong>
        </Heading.h2>
      </Container>
    </BackgroundImage>
    <Container w={1} maxWidth={36} py={[4, 5]} px={3}>
      <Heading.h2 fontSize={4} mb={2}>
        Find out who represents you
      </Heading.h2>
      <Search />
      <Card
        p={[3, 4]}
        mx={[-3, -4]}
        bg="#fffae5"
        boxShadowSize="md"
        mt={[4, 5]}
      >
        <Heading.h2 fontSize={4} mb={2}>
          Why should I call?
        </Heading.h2>
        <Text color="steel" fontSize={2}>
          Calling your House Representative and State Senators is one of the
          most effective ways to make your voice heard. Emails and letters are
          often batched, and Tweets ignored, but speaking to a staffer on the
          phone makes sure a real conversation happens with your
          representatives. Check out Emily Ellsworth’s great{' '}
          <A href="http://theslot.jezebel.com/how-to-effectively-lobby-your-congressperson-1788958124">
            article
          </A>
          {' and '}
          <A href="http://www.attn.com/stories/12768/former-congressional-staffer-explains-how-to-make-congressman-listen">
            series of Tweets
          </A>{' '}
          to read more.
        </Text>
      </Card>
    </Container>
    <Footer />
  </ThemeProvider>
)
