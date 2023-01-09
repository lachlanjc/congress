const { map, trimEnd, toNumber, deburr } = require('lodash')
const neatCsv = require('neat-csv')
const writeJsonFile = require('write-json-file')
const loadJsonFile = require('load-json-file')
const fs = require('fs')

const makeRecord = (record) => ({
  name: deburr(trimEnd(record.ultorg)),
  total: toNumber(record.total),
})
const processRecords = (data) =>
  neatCsv(data).then((data) => map(data, makeRecord))
async function writeContribs(id) {
  const csv = fs.readFileSync(`./data/contribs/${id}.csv`, { encoding: 'utf8' })
  const data = await processRecords(csv)
  writeJsonFile(`./data/contribs/${id}.json`, data)
  process.stdout.write('.')
}

loadJsonFile('./data/people.json').then((data) =>
  Promise.all(
    data
      .filter((profile) => profile.ids.opensecrets)
      .map((profile) => writeContribs(profile.ids.opensecrets))
  )
)
