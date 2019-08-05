import React from 'react'
import styled from 'styled-components'
import { Flex, Link, Text, IconButton, Button } from '@hackclub/design-system'

const Base = styled(Flex)`
  line-height: 0;
`

const Contact = ({ phone, callCount, form, twitter, facebook, ...props }) => (
  <Base mt={3} mr={[-1, -2]} align="center" {...props}>
    {phone && <Phone data={phone} />}
    {callCount && <Calling data={phone} count={callCount} />}
    {form && <Form data={form} />}
    {twitter && <Twitter data={twitter} />}
    {facebook && <Facebook data={facebook} />}
  </Base>
)

export default Contact

const Item = ({ href, label, icon, bg = 'brand', ...props }) => (
  <IconButton
    href={href}
    target="_blank"
    title={label}
    glyph={icon}
    bg={bg}
    mx={[1, 2]}
    circle
    {...props}
  />
)

const tel = data => `tel:${data.match(/\d+/g).join('')}`
const Phone = ({ data }) => (
  <Button
    href={tel(data)}
    title={`Phone number: ${data}`}
    aria-label={`Phone number: ${data}`}
    bg="brand"
  >
    Call
  </Button>
)
const FlexLink = Flex.withComponent(Link)
const Calling = ({ count, data }) => (
  <FlexLink flex="1 1 auto" align="center" href={tel(data)} px={[2, 3]}>
    <Text.span fontSize={3} color="brand" bold>
      {count}
    </Text.span>
    <Text.span ml={1} mt={1} fontSize={0} color="muted" caps>
      calling
    </Text.span>
  </FlexLink>
)

const Form = ({ data }) => (
  <Item href={data} label="Contact" icon="message" bg="warning" />
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
