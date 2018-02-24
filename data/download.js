const { map, find, last, toNumber, isEmpty, filter, pick } = require('lodash')
const fs = require('fs')
const axios = require('axios')
const neatCsv = require('neat-csv')
const pBreak = require('p-break')
// const pSeries = require('p-series')
const pWaterfall = require('p-waterfall')
const writeJsonFile = require('write-json-file')
const retry = require('async-retry')
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
const makeId = term => {
  if (term.type === 'rep') {
    let { district } = term
    if (district.toString().length === 1) district = `0${district}`
    return `${term.state}-${district}`
  } else if (term.type === 'sen') {
    return `${term.state}-sen-${term.class}`
  }
}
const getBaseData = () =>
  Promise.all([getProfiles(), getAccounts()])
    .catch(() => {
      console.error('🚨 ERROR GETTING PEOPLE')
    })
    .then(([profiles, accounts]) =>
      map(profiles, async function(profile) {
        const term = last(profile.terms)
        const account = find(accounts, ['id.bioguide', profile.id.bioguide])
        const contribs = await getContribs(profile.id.opensecrets)
        return {
          id: makeId(term),
          name: {
            first: profile.name.first,
            last: profile.name.last,
            full: profile.name.official_full
          },
          contribs,
          role: term.type,
          state: term.state,
          termStart: term.start,
          termEnd: term.end,
          gender: profile.bio.gender,
          ids: pick(profile.id, ['opensecrets', 'bioguide']),
          contact: {
            form: term.contact_form,
            phone: term.phone,
            url: term.url,
            ...(!isEmpty(account) &&
              pick(account.contact, ['twitter', 'facebook']))
          }
        }
      })
    )

const contribsUrl = id =>
  `https://www.opensecrets.org/members-of-congress/contributors.csv` +
  `?cid=${id}&cycle=2016&type=C`
const makeContribRecord = record => ({
  name: record.ultorg,
  total: toNumber(record.total)
})
const processContribs = data =>
  neatCsv(data).then(data => map(data, makeContribRecord))
async function getContribs(id) {
  await retry(
    async bail => {
      const res = await axios(contribsUrl(id))

      if (res.status !== 200) {
        bail(new Error(`${res.status} error for ${id}`))
        return
      } else {
        process.stdout.write(id + ' – ')
      }

      const data = await res.body
      return isEmpty(data) ? [] : processContribs(data)
    },
    {
      retries: 8
    }
  )
}
const save = data => {
  writeJsonFile.sync('./data/people.json', data)
  console.log(`\n✅ Saved ${data.length} people`)
}
getBaseData().then(finalData => save(finalData))
