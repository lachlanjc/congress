const { map, forEach, find, last } = require('lodash')
const fs = require('fs')
const axios = require('axios')

const USIO = 'https://theunitedstates.io/congress-legislators'

const getProfiles = axios
  .get(`${USIO}/legislators-current.json`)
  .then(res => res.data)
const getAccounts = axios
  .get(`${USIO}/legislators-social-media.json`)
  .then(res => res.data)

Promise.all([getProfiles, getAccounts])
  .then(([profiles, accounts]) => {
    const people = []
    forEach(profiles, profile => {
      const account = find(accounts, ['id.bioguide', profile.id.bioguide])
      if (account) profile.social = account.social
      // reduce data
      const { opensecrets, bioguide } = profile.id
      profile.id = { opensecrets, bioguide }
      profile.gender = profile.bio.gender
      delete profile.bio
      profile.term = last(profile.terms)
      delete profile.terms
      people.push(profile)
    })
    return people
  })
  .then(data => {
    fs.writeFile('./data/people.json', JSON.stringify(data), err => {
      if (err) {
        console.log(err)
      } else {
        console.log(`✅ Saved ${data.length} people`)
      }
    })
  })
