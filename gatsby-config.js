// this works better than doing the NODE_ENV thing since it isn't pre-defined on my windows machine for some reason
// https://www.gatsbyjs.org/docs/environment-variables/#server-side-nodejs
const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

console.log(`Using environment config: '${activeEnv}'`)
// console.log(`${JSON.stringify(process.env)}`)


require("dotenv").config({
  path: `.env.${activeEnv}`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    // {
    //   resolve: "gatsby-source-graphql",
    //   // https://www.gatsbyjs.org/docs/third-party-graphql/#basic-example
    //   options: {
    //     // Arbitrary name for the remote schema Query type
    //     typeName: "MESSAGESAPI",
    //     // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
    //     fieldName: "messagesApi",
    //     // Url to query from
    //     url: "http://localhost:5000/graphql",
    //   },
    // },
    // {
    //   // Apollo makes things more complicated... I wish I just used Next.js instead...
    //   resolve: 'gatsby-plugin-apollo',
    //   options: {
    //     uri: 'http://localhost:5000/graphql'
    //   }
    // },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
