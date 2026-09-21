const fs = require('fs');
for (const file of ['app/page.tsx', 'refresh-brand.cjs']) {
  const source = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, source.replace(/<Image className="hero-raycat"[^>]*\/>/g, ''));
}
const css = fs.readFileSync('app/brand.css', 'utf8');
fs.writeFileSync('app/brand.css', css.replace(/\.hero-raycat\{[^}]*\}/g, ''));
