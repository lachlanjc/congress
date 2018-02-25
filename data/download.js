const { map, find, last, toNumber, isEmpty, filter, pick } = require('lodash')
const fs = require('fs')
const axios = require('axios')
const neatCsv = require('neat-csv')
const writeJsonFile = require('write-json-file')

const USIO = 'https://theunitedstates.io/congress-legislators'

const getProfiles = () =>
  axios(`${USIO}/legislators-current.json`).then(res => {
    console.log('🛬 downloaded main list')
    return res.data
  })
const getAccounts = () =>
  axios(`${USIO}/legislators-social-media.json`).then(res => {
    console.log('🍭 downloaded social media')
    return res.data
  })
const findAccount = (profile, accounts) =>
  find(accounts, ['id.bioguide', profile.id.bioguide])
const makeId = term => {
  if (term.type === 'rep') {
    let { district } = term
    if (district.toString().length === 1) district = `0${district}`
    return `${term.state}-${district}`
  } else if (term.type === 'sen') {
    return `${term.state}-sen-${term.class}`
  }
}
const processProfile = (profile, account) => {
  const term = last(profile.terms)
  return {
    id: makeId(term),
    name: {
      first: profile.name.first,
      last: profile.name.last,
      full: profile.name.official_full
    },
    role: term.type,
    party: term.party,
    state: term.state,
    termStart: term.start,
    termEnd: term.end,
    gender: profile.bio.gender,
    ids: pick(profile.id, ['opensecrets', 'bioguide']),
    contact: {
      form: term.contact_form,
      phone: term.phone,
      url: term.url,
      ...(!isEmpty(account) && pick(account.contact, ['twitter', 'facebook']))
    }
  }
}
const getData = () =>
  Promise.all([getProfiles(), getAccounts()])
    .catch(() => {
      console.error('🚨 ERROR GETTING PEOPLE')
    })
    .then(([profiles, accounts]) =>
      map(profiles, p => processProfile(p, findAccount(p, accounts)))
    )
const save = data => {
  writeJsonFile('./data/people.json', data).then(() => {
    console.log(`\n✅ Saved ${data.length} people`)
  })
}
getData().then(data => save(data))
