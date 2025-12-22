#!/usr/bin/env node

/**
 * Script to verify and download assets for About Us page
 * Run: node scripts/download-assets.js
 */

const fs = require('fs');
const path = require('path');

const imagesDir = path.join(process.cwd(), 'public', 'images');

// Required assets for About Us page
const requiredAssets = {
  hero: 'efdf1ab711ffad6d48b3163655ede5890772aaf2.png',
  team1: '573ac6c833b631241442f52f9339c8f43a7bcb76.png',
  team2: 'd7fbbc268730dca1329c17ec05aad7e281134f4f.png',
  team3: 'af0d73906f117e3a32a5cb2964335364aff6973e.png',
  team4: 'e87e7e5ce49a5f43a07cdf9755cceca7ff36ee28.png',
  vidyanand: 'ea9ab769881ecbef17a1ee8f61ef0d854e440010.png',
  sujith: '1ff65672b25e8ee1fea3e17ba66c200d1c3294f2.png',
  sreeprabha: '229320ea590322c52ad0db8e7533da4cd67039f2.png',
  stallon: '933fecc62b2892d17dfc22100b977c6d0d0c8765.png',
  vineetha: '7677f8afea32b88a8e5c37524020b9e07fcacbd5.png',
  himanshu: '397fbb475b8669ae9e88c4783d18e3330f7e69ec.png',
  sreekanth: '26ae0043f4b22f49b21a70a7456c7256843e767c.png',
};

// Core values SVG icons
const coreValuesIcons = [
  'c1.png'// Make progress over perfection
];

function checkAsset(filename) {
  const filePath = path.join(imagesDir, filename);
  const exists = fs.existsSync(filePath);
  
  // Also check for .jpg version (some assets might be downloaded as .jpg)
  if (!exists && filename.endsWith('.png')) {
    const jpgPath = filePath.replace('.png', '.jpg');
    if (fs.existsSync(jpgPath)) {
      return { exists: true, actualPath: jpgPath, needsRename: true };
    }
  }
  
  return { exists, actualPath: filePath, needsRename: false };
}

function main() {
  console.log('🔍 Checking About Us page assets...\n');
  
  const missing = [];
  const found = [];
  const needsRename = [];
  
  // Check all required assets
  Object.entries(requiredAssets).forEach(([name, filename]) => {
    const result = checkAsset(filename);
    if (result.exists) {
      if (result.needsRename) {
        needsRename.push({ name, filename, actualPath: result.actualPath });
        console.log(`⚠️  ${name}: Found as .jpg, needs rename to .png`);
      } else {
        found.push({ name, filename });
        console.log(`✅ ${name}: ${filename}`);
      }
    } else {
      missing.push({ name, filename });
      console.log(`❌ ${name}: ${filename} - MISSING`);
    }
  });
  
  // Check core values icons (these might be in a different location or format)
  console.log('\n📋 Core Values Icons:');
  coreValuesIcons.forEach(icon => {
    const result = checkAsset(icon);
    if (result.exists) {
      console.log(`✅ ${icon}`);
    } else {
      console.log(`⚠️  ${icon} - May be embedded SVG`);
    }
  });
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log(`✅ Found: ${found.length}`);
  console.log(`⚠️  Needs rename: ${needsRename.length}`);
  console.log(`❌ Missing: ${missing.length}`);
  
  if (needsRename.length > 0) {
    console.log('\n🔄 Files that need renaming:');
    needsRename.forEach(({ name, filename, actualPath }) => {
      console.log(`   ${name}: ${path.basename(actualPath)} → ${filename}`);
    });
    console.log('\n💡 To rename files, run:');
    needsRename.forEach(({ filename, actualPath }) => {
      const newPath = actualPath.replace(/\.jpg$/, '.png');
      console.log(`   mv "${actualPath}" "${newPath}"`);
    });
  }
  
  if (missing.length > 0) {
    console.log('\n📥 Missing assets:');
    missing.forEach(({ name, filename }) => {
      console.log(`   - ${filename} (${name})`);
    });
    console.log('\n💡 To download missing assets:');
    console.log('   1. Open Figma Desktop');
    console.log('   2. Select the About Us page');
    console.log('   3. The assets should auto-download via Figma MCP');
    console.log('   4. Or manually export images from Figma');
  }
  
  if (missing.length === 0 && needsRename.length === 0) {
    console.log('\n🎉 All assets are present and correctly named!');
  }
}

main();
