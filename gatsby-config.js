module.exports = {
  plugins: [
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     path: `${__dirname}/data/states`,
    //     name: 'states'
    //   }
    // },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data/people.json`,
        name: 'people'
      }
    },
    'gatsby-transformer-json',
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-react-next',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components'
  ]
}
