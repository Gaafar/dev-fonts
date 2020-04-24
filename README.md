# dev-fonts 

List of the best fonts for coding with live preview [devfonts.gafi.dev](https://devfonts.gafi.dev)

## Features
* Live preview of all fonts with your code samples
* Select specific fonts to compare
* Choose editor themes
* Choose your language for syntax highlights

## Built with 
* Gatsby
* Code Mirror editor
* Ant Design
* Inspired by (code stolen from) https://carbon.now.sh/
* Hosted on Netlify

## Missing a font?
You can open an issue to request adding a new font or open a PR by adding the font under `src/data/fonts.ts` and `static/fonts`
* Be sure to include woff2 (smaller download size) fonts in addition to older formats. Use font squirrel with basic settings for conversion if needed https://www.fontsquirrel.com/tools/webfont-generator 
* Using a font from an official, reliable CDN is preferred. If not available, then add it in `static/fonts`.
