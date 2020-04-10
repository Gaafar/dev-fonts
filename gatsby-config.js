module.exports = {
  siteMetadata: {
    siteName: `Using TypeScript Example`,
    exampleUrl: `https://github.com/gatsbyjs/gatsby/tree/master/examples/using-typescript`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-antd`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
        omitGoogleFont: true,
      },
    },
  ],
}
