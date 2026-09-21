const fs=require('fs');const p='components/museum/Museum.tsx';let s=fs.readFileSync(p,'utf8');s+='\nimport "./guide-presence.css";\n';fs.writeFileSync(p,s);
