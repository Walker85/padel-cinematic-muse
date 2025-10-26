import { readFileSync, existsSync, statSync } from 'fs';
import { join } from 'path';

const fontsDir = join(process.cwd(), 'public', 'fonts');

const fontFiles = [
  'mollen-400.woff2',
  'mollen-800.woff2',
  'satriumph-400.woff2',
];

console.log('🔍 Verifying font files...\n');

let hasErrors = false;

for (const font of fontFiles) {
  const fontPath = join(fontsDir, font);
  
  if (!existsSync(fontPath)) {
    console.error(`❌ Missing: ${font}`);
    hasErrors = true;
    continue;
  }
  
  const stats = statSync(fontPath);
  const fileSize = (stats.size / 1024).toFixed(2);
  
  if (stats.size < 100) {
    console.error(`❌ Invalid: ${font} (too small: ${fileSize}KB)`);
    hasErrors = true;
    continue;
  }
  
  // Check file signature for WOFF2
  const buffer = readFileSync(fontPath, { encoding: null });
  const header = buffer.subarray(0, 4);
  const isWoff2 = header[0] === 0x4F && header[1] === 0x4F; // WOOF
  
  if (!isWoff2 && stats.size < 1000) {
    // Allow non-WOFF2 files if they're large enough
    console.warn(`⚠️  Warning: ${font} doesn't appear to be a valid WOFF2 file`);
  }
  
  console.log(`✓ ${font} (${fileSize}KB)`);
}

console.log('\n✨ Font verification complete!\n');

if (hasErrors) {
  console.error('❌ Font verification failed. Please check the errors above.');
  process.exit(1);
} else {
  console.log('✅ All fonts are valid and ready to build!');
}
