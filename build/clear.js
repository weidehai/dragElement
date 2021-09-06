const { exec } = require('child_process');
const path = require('path');

function main() {
  exec(`rmdir /s/q ${path.resolve(process.cwd(), 'dist')}`);
}

main();
