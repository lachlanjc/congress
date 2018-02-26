import React, { Fragment } from 'react'
import Profile from './Profile'
import { Heading } from '@hackclub/design-system'
import { isEmpty, first } from 'lodash'

const Group = ({ profiles, label, children }) =>
  isEmpty(first(profiles)) ? null : (
    <Fragment>
      <Heading.h2 mt={4} f={2} color="muted" caps regular children={label} />
      {profiles.map(
        profile =>
          !isEmpty(profile) && (
            <Profile my={3} data={profile} key={profile.name.last} />
          )
      )}
    </Fragment>
  )

export default Group
