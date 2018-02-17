import React from 'react'
import {
  Card,
  Avatar,
  Heading,
  Text,
  Button,
  Box,
  Flex
} from '@hackclub/design-system'
import { lowerCase } from 'lodash'

const PARTIES = 'Republican' | 'Democrat' | 'Independent'

const Profile = ({ data, ...props }) => (
  <Card p={[3, 4]} boxShadowSize="md" {...props}>
    <Flex style={{ position: 'relative' }}>
      <BadgeContainer>
        <Badge party={data.party} />
      </BadgeContainer>
      <Avi
        size="72px"
        src={`https://twitter.com/${data.twitter}/profile_image?size=original`}
        mr={3}
      />
      <Box>
        <Heading.h3 children={data.name} />
      </Box>
    </Flex>
    {/* <Contact
      twitter={data.twitter}
      website={data.website}
      phone={data.phone}
      address={data.address}
    /> */}
  </Card>
)

const Avi = Avatar.extend`
  object-fit: cover;
  object-position: center;
  flex-shrink: 0;
  position: relative;
`

const BadgeContainer = Box.extend`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`

const Badge = ({ party, ...props }) => {
  const Base = Box.extend`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    line-height: 0;
    border-radius: 12px;
  `
  return (
    <Base
      bg={lowerCase(party).slice(0, 3)}
      color="white"
      f={1}
      {...props}
      children={party.slice(0, 1)}
    />
  )
}

export default Profile
