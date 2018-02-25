import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import { Container, Heading, Text, Box } from '@hackclub/design-system'
import Group from 'components/profile/Group'

export default ({ data: { markdownRemark } }) => {
  const rep = {}
  return (
    <Container maxWidth={36} p={3}>
      <Helmet title={name} />
      <Heading.h1 f={6} m={0}>
        {name}
      </Heading.h1>
      {/* <Group profiles={[rep]} label="Representative" /> */}
      {/* <Group profiles={[rep, rep]} label="Senators" /> */}
    </Container>
  )
}

/*
export const pageQuery = graphql`
  fragment ProfileFragment on PeopleJson {
    role
    id
    name {
      full
    }
    ids {
      bioguide
    }
    term {
      end
      start
      state
      party
      phone
      contact_form
    }
    social {
      twitter
      facebook
    }
  }

  query DistrictQuery($slug: String!, $state: String!) {
    allPeopleJson(filter: { term__state: { eq: $state } }) {
      edges {
        node {
          ...ProfileFragment
        }
      }
    }
  }
`
*/
