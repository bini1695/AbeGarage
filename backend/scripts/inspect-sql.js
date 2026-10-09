const fs = require('fs');
const path = require('path');
const p = path.resolve(__dirname, '..', '..', '..', '..', 'Ressources', 'DB Designs', 'initial-queries.sql');
const s = fs.readFileSync(p, 'utf8');
const qs = s.split(';').map(q => q.trim()).filter(q => q && !q.startsWith('--') && !q.startsWith('/*'));
console.log('queries:', qs.length);
qs.forEach((q, i) => {
  console.log('---', i, '---');
  console.log(q.slice(0, 400));
});
