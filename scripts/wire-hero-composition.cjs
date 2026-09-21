const fs = require('fs');
const path = 'app/layout.tsx';
const source = fs.readFileSync(path, 'utf8');
if (!source.includes('./hero-composition.css')) fs.writeFileSync(path, source + '\nimport "./hero-composition.css";\n');
