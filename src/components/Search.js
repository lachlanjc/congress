import React, { Component } from 'react'
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
import {
  Box,
  Text,
  Heading,
  Button,
  Flex,
  Input,
  Label
} from '@hackclub/design-system'
import Group from 'components/profile/Group'
import Spinner from 'respin'

import data from '../../data/people.json'
// import Representative, { BlankRepresentative } from './Representative'
import Profile from 'components/profile/Profile'
const BlankProfile = Profile

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      loading: false,
      rep: {}
    }
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
        const divKey = find(keys(res.divisions), key => repKeyMatch(key))
        const state = upperCase(repKeyMatch(divKey)[1])
        const district = state === 'dc' ? 1 : toNumber(divKey.match(/\d+$/)[0])

        const record = res.divisions[divKey]
        const official = res.officials[record.officeIndices[0] + 1]
        console.log('Official', official)

        if (state && district) {
          const lastName = last(words(official.name))
          const stateReps = filter(data, ['term.state', state])
          // console.log(stateReps, lastName)
          const rep = stateReps.find(r =>
            includes(r.name.official_full, lastName)
          )
          console.log('Rep', rep)
          this.setState({ loading: false, rep })
        }
      })
      .catch(e => {
        console.error(e)
      })
  }

  render() {
    const { loading, address, rep } = this.state
    return (
      <section>
        <Searcher align="flex-end" my={3}>
          <Box mr={2} mb={0} w={1}>
            <Label htmlFor="address" mb={2} f={2} color="muted" caps>
              Enter your U.S. address
            </Label>
            <Input
              name="address"
              id="address"
              placeholder="1 Infinite Loop, Cupertino, CA"
              onChange={e => this.onKey(e.target.value, e.key)}
              bg="white"
            />
          </Box>
          <Button
            bg="brand"
            children={loading ? <Spinner /> : 'Search'}
            onClick={e => !isEmpty(trim(address)) && this.fetchData()}
          />
        </Searcher>
        <Group profiles={[rep]} label="Your Representative" />
        <Group profiles={[rep, rep]} label="Your Senators" />
      </section>
    )
  }
}

const Searcher = Flex.extend`
  div {
    flex: 1 1 auto;
  }
  input,
  button {
    height: 36px;
    max-width: none !important;
  }
`

export default Search
