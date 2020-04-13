// show brackets, braces, parens, equality ligs, && ||, arrow, gte

export const code = `fonts.forEach(font => {
  const { id, name, likes } = font;
  if (
    likes >= 30
    || (likes === 50 && likes != 0)
    || favorites[id]
  ) {
    coolFonts++;
    console.log(\`\${name} is cool!\`);
  }
});`;
