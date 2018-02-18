const { map, forEach, find, last, toNumber, kebabCase } = require('lodash')
const fs = require('fs')
const axios = require('axios')

const USIO = 'https://theunitedstates.io/congress-legislators'

const getProfiles = axios.get(`${USIO}/legislators-current.json`).then(res => {
  console.log('🛬 downloaded main list')
  return res.data
})
const getAccounts = axios
  .get(`${USIO}/legislators-social-media.json`)
  .then(res => {
    console.log('🍭 downloaded social media')
    return res.data
  }) /*
    })
*/
const makeId = profile => {
  const { state } = last(profile.terms)
  if (profile.chamber === 'rep') {
    let { district } = profile.term
    if (district.toString().length === 1) district = `0${district}`
    return `${state}-${district}`
  } else {
    return `${state}-${kebabCase(profile.name.official_full)}`
  }
}
const getPeople = () =>
  Promise.all([getProfiles, getAccounts])
    .catch(() => {
      console.error('🚨 ERROR GETTING PEOPLE')
      return [[], []]
    })
    .then(([profiles, accounts]) => {
      forEach(profiles, profile => {
        // set attributes
        profile.term = last(profile.terms)
        profile.chamber = profile.term.type
        const { opensecrets, bioguide } = profile.id
        profile.ids = { opensecrets, bioguide }
        profile.id = makeId(profile)
        // reduce data size
        profile.gender = profile.bio.gender
        delete profile.bio
        delete profile.leadership_roles
        delete profile.term.state_rank
        delete profile.term.rss_url
        delete profile.term.class
        delete profile.term.type
        delete profile.term.rep
        delete profile.terms
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
