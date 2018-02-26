const { map, forEach } = require('lodash')
const writeJsonFile = require('write-json-file')
const loadJsonFile = require('load-json-file')

const process = profile => {
  const id = profile.ids.opensecrets
  const contribs = loadJsonFile.sync(`./data/contribs/${id}.json`)
  return {
    ...profile,
    contribs
  }
}

loadJsonFile('./data/people.json')
  .then(profiles => map(profiles, p => process(p)))
  .then(data => writeJsonFile('./data/data.json', data, { indent: '' }))
