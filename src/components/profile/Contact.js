import React from 'react'
import { Box, Flex, Link, Text } from '@hackclub/design-system'

const Base = Flex.extend.attrs({ mt: 2 })`line-height: 0;`

const Contact = ({ phone, callCount, form, twitter, facebook, ...props }) => (
  <Base mx={[-1, -2]} {...props}>
    {phone && <Phone data={phone} />}
    {callCount && <Calling data={phone} count={callCount} />}
    {form && <Form data={form} />}
    {twitter && <Twitter data={twitter} />}
    {facebook && <Facebook data={facebook} />}
  </Base>
)

export default Contact

const ItemLink = Link.extend.attrs({ mx: [1, 2] })`
  display: inline-block;
  background-image: url(//icon.now.sh/${props => props.icon}/ffffff);
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 48px;
`

const Item = ({ href, label, icon, bg = 'brand', ...props }) => (
  <ItemLink
    href={href}
    target="_blank"
    aria-label={label}
    title={label}
    icon={icon}
    bg={bg}
  />
)

const tel = data => `tel:${data.match(/\d+/g).join('')}`
const Phone = ({ data }) => (
  <Item
    href={tel(data)}
    label={`Phone number: ${data}`}
    icon="phone"
    bg="brand"
  />
)
const FlexLink = Link.extend`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
`
const Calling = ({ count, data }) => (
  <FlexLink href={tel(data)} pl={1} pr={3} color="brand">
    <Text mb={3} w={1} f={3} bold children={count} />
    <Text mt={1} f={0} caps>
      calling
    </Text>
  </FlexLink>
)

const Form = ({ data }) => (
  <Item href={data} label="Contact" icon="chat" bg="warning" />
)

const Twitter = ({ data }) => (
  <Item
    href={`https://twitter.com/${data}`}
    label="Twitter"
    icon="twitter"
    bg="#1da1f2"
  />
)

const Facebook = ({ data }) => (
  <Item
    href={`https://facebook.com/${data}`}
    label="Facebook"
    icon="facebook"
    bg="#3b5998"
  />
)
