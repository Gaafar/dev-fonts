module.exports = {
  // parser: `@typescript-eslint/parser`,
  extends: [
    'airbnb-typescript'
  ],
  // plugins: ["@typescript-eslint"],
  // parserOptions: {
  //   ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
  //   sourceType: 'module', // Allows for the use of imports
  // },
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'import/prefer-default-export': 0
  }
}
