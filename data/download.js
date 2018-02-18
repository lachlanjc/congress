const {
  map,
  forEach,
  find,
  last,
  toNumber,
  kebabCase,
  isEmpty,
  filter,
  pick,
  set
} = require('lodash')
const fs = require('fs')
const axios = require('axios')
const neatCsv = require('neat-csv')
const pBreak = require('p-break')
const pSeries = require('p-series')
const pWaterfall = require('p-waterfall')
const writeJsonFile = require('write-json-file')

const USIO = 'https://theunitedstates.io/congress-legislators'

const getProfiles = () =>
  axios.get(`${USIO}/legislators-current.json`).then(res => {
    console.log('🛬 downloaded main list')
    return res.data
  })
const getAccounts = () =>
  axios.get(`${USIO}/legislators-social-media.json`).then(res => {
    console.log('🍭 downloaded social media')
    return res.data
  })
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
const getBaseData = () =>
  pSeries([() => getProfiles(), () => getAccounts()])
    .catch(() => {
      console.error('🚨 ERROR GETTING PEOPLE')
    })
    .then(([profiles, accounts]) =>
      forEach(profiles, profile => {
        // set attributes
        profile.term = last(profile.terms)
        profile.chamber = profile.term.type
        profile.gender = profile.bio.gender
        const { opensecrets, bioguide } = profile.id
        profile.ids = { opensecrets, bioguide }
        profile.id = makeId(profile)
        // attach social
        const account = find(accounts, ['id.bioguide', bioguide])
        if (account) {
          profile.social = pick(account.social, ['twitter', 'facebook'])
        }
        return profile
      })
    )
const reduceData = profile => {
  delete profile.bio
  delete profile.family
  delete profile.other_names
  delete profile.leadership_roles
  delete profile.term.state_rank
  delete profile.term.address
  delete profile.term.rss_url
  delete profile.term.class
  delete profile.term.type
  delete profile.term.rep
  delete profile.terms
  return profile
}
const addContribs = profile => {
  const url =
    `https://www.opensecrets.org/members-of-congress/contributors.csv` +
    `?cid=${profile.ids.opensecrets}&cycle=2016&type=C`
  const makeRecord = record => ({
    name: record.ultorg,
    total: toNumber(record.total)
  })
  axios(url)
    .then(res => res.data)
    .catch(err => {
      console.error('⛔️', url)
    })
    .then(prev => set(profile, 'contribs', prev))
    .then(() => process.stdout.write('.'))
  return profile
}
const save = data => {
  fs.writeFile('./data/people.json', JSON.stringify(data), err => {
    if (err) {
      console.error('🚨 ERROR SAVING FILE', err)
    } else {
      console.log(`\n✅ Saved ${data.length} people`)
    }
  })
}
getBaseData()
  .then(fullData => map(fullData, reduceData))
  .then(data => save(data))
