// show brackets, braces, parens, equality ligs, && ||, arrow, gte

export const code = `fonts.forEach(font => {
  const { id, name, rating } = font;

  if (
    rating >= 4
    || (rating === 5 && rating != 0)
    || popular[id]
  ) {
    console.log(\`\${name} is popular\`);
  }
});`;
