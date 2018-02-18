import React from 'react'
import { Circle, Box, Flex, Link } from '@hackclub/design-system'
import { replace } from 'lodash'

const Base = Flex.extend.attrs({ mt: 2 })`line-height: 0;`

const Contact = ({ phone, callCount, form, twitter, facebook, ...props }) => (
  <Base mx={[-1, -2]} {...props}>
    {phone && <Phone data={phone} />}
    {address && <Form data={address} />}
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
    icon={icon}
    bg={bg}
  />
)

const Phone = ({ data }) => (
  <Item
    href={`tel:${replace(data, /\D/, '')}`}
    label={`Phone number: ${data}`}
    icon="phone"
    bg="brand"
  />
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
