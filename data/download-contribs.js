const { map, forEach, last, toNumber, isEmpty, deburr } = require('lodash')
const axios = require('axios')
const neatCsv = require('neat-csv')
const writeJsonFile = require('write-json-file')
const loadJsonFile = require('load-json-file')
const retry = require('async-retry')

const makeUrl = id =>
  `https://www.opensecrets.org/members-of-congress/contributors.csv` +
  `?cid=${id}&cycle=2016&type=C`
const makeRecord = record => ({
  name: deburr(record.ultorg),
  total: toNumber(record.total)
})
const processRecords = data => neatCsv(data).then(data => map(data, makeRecord))
async function writeContribs(id) {
  await retry(
    async bail => {
      await axios
        .get(makeUrl(id))
        .catch(res => bail(new Error(`⛔️ error for ${id}`)))
        .then(res => res.data)
        .then(body => {
          processRecords(body).then(data => {
            writeJsonFile(`./data/contribs/${id}.json`, data)
            process.stdout.write('.')
          })
        })
    },
    {
      retries: 16
    }
  )
}

loadJsonFile('./data/people.json').then(data =>
  forEach(data, profile => writeContribs(profile.ids.opensecrets))
)
