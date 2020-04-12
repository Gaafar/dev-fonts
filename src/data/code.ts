import { fonts } from './fonts';

// show brackets, braces, parens, equality ligs, && ||, arrow, gte

export const code = `fonts.forEach(({ id, name, rating }) => {
  if (favorite[id]) {
    console.log(\`favorite font: \${name}\`);
  }
  if (rating >= 4 || (rating == 5 && rating !== 0)) {
    console.log('popular font');
  }
});`;
