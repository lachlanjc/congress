import React from 'react'
import styled from 'styled-components'
import { Flex, Link, IconButton, Button } from '@hackclub/design-system'

const Base = styled(Flex)`
  line-height: 0;
`

const Contact = ({ phone, form, twitter, facebook, ...props }) => (
  <Base mt={3} mr={[-1, -2]} align="center" {...props}>
    {phone && <Phone data={phone} />}
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

const tel = (data) => `tel:${data.match(/\d+/g).join('')}`
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
