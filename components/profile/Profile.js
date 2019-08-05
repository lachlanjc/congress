import React from 'react'
import styled from 'styled-components'
import { Card, Avatar, Heading, Text, Box, Flex } from '@hackclub/design-system'
import Contact from './Contact'
import Contribs from './Contribs'
import { lowerCase, random } from 'lodash'

const getYear = date => date.slice(0, 4)

const Profile = ({ data, ...props }) => (
  <Card bg="white" p={[3, 4]} mx={[-3, -4]} boxShadowSize="md" {...props}>
    <Flex align="center" style={{ position: 'relative' }}>
      <BadgeContainer>
        <Badge party={data.party} />
      </BadgeContainer>
      <Avi
        size={64}
        src={`https://theunitedstates.io/images/congress/225x275/${
          data.ids.bioguide
        }.jpg`}
        mr={3}
      />
      <Box align="left">
        <Heading.h4 fontSize={4} fontWeight="bold" children={data.name.full} />
        <Text color="muted" fontSize={2}>
          {data.role === 'rep' ? `${data.id}, c` : 'C'}
          {'urrent term '}
          {getYear(data.termStart)}–{getYear(data.termEnd)}
        </Text>
      </Box>
    </Flex>
    <Contribs data={data.contribs} id={data.ids.opensecrets} />
    <Contact
      phone={data.contact.phone}
      callCount={random(4, 64)}
      form={data.contact.form}
      twitter={data.contact.twitter}
      facebook={data.contact.facebook}
    />
  </Card>
)

const Avi = styled(Avatar)`
  object-fit: cover;
  object-position: center;
  flex-shrink: 0;
  position: relative;
`

const BadgeContainer = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`

const BadgeBase = styled(Box)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  line-height: 0;
  border-radius: 12px;
`

const Badge = ({ party, ...props }) => (
  <BadgeBase
    bg={lowerCase(party).slice(0, 3)}
    color="white"
    fontSize={1}
    {...props}
    children={party.slice(0, 1)}
  />
)

export default Profile
