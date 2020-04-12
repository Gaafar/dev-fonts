import { orderBy } from 'lodash';

const googleFonts = [
  { name: 'Fira Code', ligatures: true, sort: 1 },
  { name: 'Roboto Mono', sort: 2 },
  { name: 'Inconsolata', sort: 2 },
  { name: 'Source Code Pro', sort: 2 },
  { name: 'Anonymous Pro', sort: 2 },
  { name: 'Space Mono', sort: 2 },
  { name: 'Oxygen Mono', sort: 2 },
  { name: 'B612 Mono' },
  { name: 'PT Mono' },
  { name: 'Nanum Gothic Coding' },
  { name: 'Ubuntu Mono' },
  { name: 'IBM Plex Mono' },
  { name: 'Share Tech Mono' },
  // { name: 'VT323' },
  { name: 'Cousine' },
  { name: 'Fira Mono' },
  { name: 'Overpass Mono' },
  { name: 'Courier Prime' },
  { name: 'Cutive Mono' },
  { name: 'Nova Mono' },
];

const rawFonts = [
  {
    displayName: 'Victor Mono',
    familyName: 'Victor Mono',
    sort: 2,
    ligatures: true,
    webPage: 'https://rubjo.github.io/victor-mono/',
    srcLink: 'https://cdn.jsdelivr.net/npm/victormono@latest/dist/index.min.css',
  },
  {
    displayName: 'Noto Mono',
    familyName: 'TypoPRO Noto Mono',
    sort: 3,
    webPage: 'https://www.google.com/get/noto/',
    srcLink: 'https://cdn.jsdelivr.net/npm/@typopro/web-noto@3.7.5/TypoPRO-Noto.css',
  },
  {
    displayName: 'Monoid',
    familyName: 'Monoid Regular',
    sort: 2,
    ligatures: true,
    webPage: 'http://larsenwork.com/monoid/',
    srcLink: '/fonts/monoid/monoid.css',
  },

  ...googleFonts.map((font) => {
    const { name, ligatures } = font;
    const urlPart = name.replace(/\s/g, '+');
    return {
      ...font,
      displayName: name,
      familyName: name,
      webPage: `https://fonts.google.com/specimen/${urlPart}`,
      srcLink: `https://fonts.googleapis.com/css?family=${urlPart}&display=block`,
      ligatures,
    };
  }),
];

export const fonts = orderBy(rawFonts, 'sort');
