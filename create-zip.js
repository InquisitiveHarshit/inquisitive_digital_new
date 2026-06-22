const fs = require('fs');
const { ZipArchive } = require('archiver');
const path = require('path');

console.log('Creating deployment ZIP using Node.js (cross-platform, Linux permissions preserved)...');

const outputDest = path.join(__dirname, '..', 'hostinger-source-deploy.zip');
const output = fs.createWriteStream(outputDest);
const archive = new ZipArchive({
  zlib: { level: 9 } // Sets the compression level
});

output.on('close', function() {
  console.log(`\n✅ Done! ZIP file created at: ${outputDest}`);
  console.log(`Total bytes: ${archive.pointer()}`);
  console.log('Upload this file directly to Hostinger.');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

const directories = [
  '.next',
  'app',
  'assets',
  'backend',
  'components',
  'lib',
  'public'
];

const files = [
  'package.json',
  'package-lock.json',
  'next.config.ts',
  'postcss.config.mjs',
  'eslint.config.mjs',
  'tsconfig.json',
  '.env.local',
  '.env'
];

directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`Adding folder: ${dir}`);
    archive.directory(dir + '/', dir);
  }
});

files.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`Adding file: ${file}`);
    archive.file(file, { name: file });
  }
});

archive.finalize();
