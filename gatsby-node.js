const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
}

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    // Query for rep nodes to create district pages
    resolve(
      graphql(
        `
          {
            allPeopleJson {
              edges {
                node {
                  type
                  term {
                    state
                  }
                  fields {
                    label
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) reject(result.errors)

        // Create a page for each district
        // const component = path.resolve('./src/templates/district.js')
        // _.forEach(_.filter(result.data.people, ['type', 'rep']), ({ node }) => {
        //   createPage({
        //     path: node.type,
        //     component,
        //     context: {
        //       slug: node.fields.label,
        //       state: node.term.state
        //     }
        //   })
        // })
      })
    )
  })
}
