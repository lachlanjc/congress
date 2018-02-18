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
import Contact from './Contact'
import { lowerCase } from 'lodash'

const PARTIES = 'Republican' | 'Democrat' | 'Independent'
const getYear = date => date.slice(0, 4)

const Profile = ({ data, ...props }) => (
  <Card bg="white" p={[3, 4]} mx={[-3, -4]} boxShadowSize="md" {...props}>
    <Flex align="center" style={{ position: 'relative' }}>
      <BadgeContainer>
        <Badge party={data.term.party} />
      </BadgeContainer>
      <Avi
        size={64}
        src={`https://theunitedstates.io/images/congress/225x275/${
          data.id.bioguide
        }.jpg`}
        mr={3}
      />
      <Box align="left">
        <Heading.h4
          f={4}
          fontWeight="bold"
          children={data.name.official_full}
        />
        <Text color="muted" f={2}>
          {data.term.state}-
          {data.term.district.toString.length === 1 ? 0 : null}
          {data.term.district}
          , current term {getYear(data.term.start)}–{getYear(data.term.end)}
        </Text>
      </Box>
    </Flex>
    <Heading.h5 f={3} mt={3} fontWeight="bold">
      Contact
    </Heading.h5>
    <Contact
      phone={data.term.phone}
      callCount={4}
      form={data.term.contact_form}
      twitter={data.social.twitter}
      facebook={data.social.facebook}
    />
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
