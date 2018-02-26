import React, { Fragment } from 'react'
import { Heading, Box, Flex, Link, Text } from '@hackclub/design-system'
import { map } from 'lodash'
import commaNumber from 'comma-number'

const List = Box.withComponent('ol').extend`
  column-gap: 0.5rem;
  column-width: 10rem;
  list-style: none;
  max-height: 8rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
	background-image: 
    linear-gradient(to right, white, white),
    linear-gradient(to right, white, white),
    linear-gradient(to right, rgba(57,74,63,.0625), rgba(255,255,255,0)),
    linear-gradient(to left, rgba(57,74,63,.0625), rgba(255,255,255,0));   
  background-position: left center, right center, left center, right center;
	background-repeat: no-repeat;
	background-color: white;
	background-size: 1rem 100%, 1rem 100%, 1rem 100%, 1rem 100%;
	background-attachment: local, local, scroll, scroll;
`

const Item = Text.withComponent('li').extend`
	-webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
  line-height: 1.25;
`

const Contribs = ({ data, id, ...props }) => (
  <Fragment>
    <Heading.h5 color='slate' f={2} mt={3} mb={1}>
      Contributors
    </Heading.h5>
    <List m={0} mx={[-3, -4]} pl={[3, 4]}>
      {map(data, row => (
        <Item f={1} pb={1} mb={1}>
          <Text.span mr={1} children={row.name} />
          <Text.span color="muted" children={`$${commaNumber(row.total)}`} />
        </Item>
      ))}
      <Item f={1}>
        <Link
          target="_blank"
          href={`https://www.opensecrets.org/members-of-congress/contributors?cid=${id}&cycle=2016&type=C`}
        >
          See more on OpenSecrets ↗
        </Link>
      </Item>
    </List>
  </Fragment>
)

export default Contribs
