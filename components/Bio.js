import React from 'react'
import { Flex, Avatar, Text, Link } from '@hackclub/design-system'

const Bio = () => (
  <Flex align="center" my={2}>
    <Avatar
      src="//lachlanjc.me/static/portrait-96.jpg"
      alt="Lachlan Campbell"
      size="48px"
      mr={3}
      style={{ flexShrink: '0' }}
    />
    <Text align="left" fontSize={2}>
      A project by <strong>Lachlan Campbell</strong>, a web designer-developer
      and high schooler.{' '}
      <Link color="info" href="https://twitter.com/lachlanjc">
        Follow them on Twitter
      </Link>
    </Text>
  </Flex>
)

export default Bio
