module.exports = {
  siteMetadata: {
    siteName: `Dev Fonts`,
    exampleUrl: `https://devfonts.gaif.dev/`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    // `gatsby-plugin-antd`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
        omitGoogleFont: true,
      },
    },
  ],
}
