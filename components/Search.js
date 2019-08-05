import React, { Component } from 'react'
import styled from 'styled-components'
import {
  trim,
  isEmpty,
  toNumber,
  map,
  join,
  keys,
  find,
  filter,
  first,
  last,
  words,
  upperCase,
  includes
} from 'lodash'
import axios from 'axios'
import { Box, Button, Flex, Input, Label } from '@hackclub/design-system'
import Group from 'components/profile/Group'
import Spinner from 'respin'

import data from '../data/data.json'
import Profile from 'components/profile/Profile'

class Search extends Component {
  state = {
    address: '',
    loading: false,
    rep: {},
    sen1: {},
    sen2: {}
  }

  onKey(value, key) {
    const address = trim(value)
    this.setState({ address })
    if (key === 'Enter') this.fetchData()
  }

  fetchData() {
    const { address } = this.state
    console.log('Address', address)
    this.setState({ loading: true })
    const payload = {
      key: 'AIzaSyAC098ZQK-jP_Q5fRpG_0of9LCTvOtdEFA',
      address,
      fields: 'divisions,officials',
      includeOffices: true.toString()
    }
    const query = join(
      map(keys(payload), key =>
        join(map([key, payload[key]], encodeURIComponent), '=')
      ),
      '&'
    )
    const senKeyMatch = key =>
      key.match(/ocd-division\/country:us\/state:(\w+)/)
    const repKeyMatch = key =>
      key.match(
        /ocd-division\/country:us\/(?:state|district):(\w+)(?:\/cd:)(\d+)/
      )
    const url = `https://www.googleapis.com/civicinfo/v2/representatives?${query}`
    axios
      .get(url)
      .then(res => res.data)
      .then(res => {
        console.log('Res', res)
        window.res = res
        const divKey = find(keys(res.divisions), key => repKeyMatch(key))
        const state = upperCase(repKeyMatch(divKey)[1])
        const district = state === 'dc' ? 1 : toNumber(divKey.match(/\d+$/)[0])

        const record = res.divisions[divKey]
        const GRep = res.officials[record.officeIndices[0] + 1]
        console.log('Official rep', GRep)

        const GSens = filter(res.officials, o =>
          includes(first(o.urls), 'senate.gov')
        )
        console.log('Official sens', GSens)

        if (state && district) {
          const statePpl = filter(data, ['state', state])
          const rep = find(
            statePpl,
            r =>
              r.role === 'rep' && includes(r.name.full, last(words(GRep.name)))
          )
          console.log('Rep', rep)
          const sens = filter(statePpl, ['role', 'sen'])
          console.log('Sens', sens)
          this.setState({ loading: false, rep, sen0: sens[0], sen1: sens[1] })
        }
      })
      .catch(e => {
        console.error(e)
      })
  }

  render() {
    const { loading, address, rep, sen0, sen1 } = this.state
    return (
      <Box my={3}>
        <Label htmlFor="address" mb={2} fontSize={2} color="muted" caps>
          Enter your home (U.S.) address
        </Label>
        <Searcher align="flex-end" width={1}>
          <Input
            name="address"
            id="address"
            placeholder="1 Infinite Loop, Cupertino, CA"
            onChange={e => this.onKey(e.target.value, e.key)}
            bg="white"
            style={{ maxWidth: '100%' }}
          />
          <Button
            ml={2}
            bg="accent"
            children={loading ? <Spinner /> : 'Search'}
            onClick={e => !isEmpty(trim(address)) && this.fetchData()}
          />
        </Searcher>
        <Group profiles={[rep]} label="Your Representative" />
        <Group profiles={[sen0, sen1]} label="Your Senators" />
      </Box>
    )
  }
}

const Searcher = styled(Flex)`
  input,
  button {
    height: 36px;
  }
`

export default Search
