const { map, forEach, find, last, toNumber } = require('lodash')
const fs = require('fs')
const axios = require('axios')

const USIO = 'https://theunitedstates.io/congress-legislators'

const getProfiles = axios
  .get(`${USIO}/legislators-current.json`)
  .then(res => res.data)
const getAccounts = axios
  .get(`${USIO}/legislators-social-media.json`)
  .then(res => res.data)
    })
const getPeople = () =>
  Promise.all([getProfiles, getAccounts])
    .catch(() => {
      console.error('🚨 ERROR GETTING PEOPLE')
      return [[], []]
    })
    .then(([profiles, accounts]) => {
      forEach(profiles, profile => {
        // reduce data
        const { opensecrets, bioguide } = profile.id
        profile.ids = { opensecrets, bioguide }
        delete profile.id
        profile.gender = profile.bio.gender
        delete profile.bio
        profile.term = last(profile.terms)
        delete profile.term.rss_url
        delete profile.term.state_rank
        delete profile.term.class
        delete profile.terms
        delete profile.leadership_roles
        // attach social
        const account = find(accounts, ['id.bioguide', bioguide])
        if (account) profile.social = account.social
        return profile
      })
      return profiles
    })
getPeople().then(data => {
  fs.writeFile('./data/people.json', JSON.stringify(data), err => {
    if (err) {
      console.error('🚨 ERROR SAVING FILE', err)
    } else {
      console.log(`\n✅ Saved ${data.length} people`)
    }
  })
})
