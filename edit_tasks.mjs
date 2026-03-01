import fs from 'fs';
let content = fs.readFileSync('tasks.md', 'utf8');
content = content.replace(/- \[ \]/g, '- [x]'); 
// Wait, that completes Phase 5 too. Let's not do that.
