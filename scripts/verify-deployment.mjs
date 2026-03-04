#!/usr/bin/env node
/**
 * Post-deployment verification script for steelmade.co.in
 * Validates asset consistency and cache health across critical routes
 * 
 * Usage: node scripts/verify-deployment.mjs
 * Related: steelmade-e6o (beads investigation)
 */

import https from 'https';

const SITE_URL = 'https://steelmade.co.in';
const ROUTES_TO_CHECK = ['/', '/chairs', '/desks', '/chairs/director-series'];

/**
 * Fetch a URL and return response metadata
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({
        url,
        statusCode: res.statusCode,
        headers: res.headers,
        body: data
      }));
    }).on('error', reject);
  });
}

/**
 * Check HEAD for an asset URL
 */
function checkAsset(url) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      resolve({
        url,
        statusCode: res.statusCode,
        contentType: res.headers['content-type'],
        cacheControl: res.headers['cache-control'],
        age: res.headers['age']
      });
    });
    req.on('error', reject);
    req.end();
  });
}

/**
 * Extract CSS and JS assets from HTML
 */
function extractAssets(html) {
  const css = [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)]
    .map(m => m[1]);
  const js = [...html.matchAll(/<script[^>]*src="([^"]+)"/g)]
    .map(m => m[1])
    .filter(s => s.includes('/_next/static/'));
  return { css, js };
}

/**
 * Main verification routine
 */
async function verify() {
  console.log('🔍 Verifying deployment health for', SITE_URL);
  console.log('');

  const results = {
    timestamp: new Date().toISOString(),
    routes: [],
    overallStatus: 'pass',
    issues: []
  };

  for (const route of ROUTES_TO_CHECK) {
    const url = `${SITE_URL}${route}`;
    console.log(`📄 Checking route: ${route}`);
    
    try {
      const page = await fetchUrl(url);
      const { css, js } = extractAssets(page.body);
      
      const routeResult = {
        route,
        pageStatus: page.statusCode,
        cacheAge: page.headers['age'],
        cssCount: css.length,
        jsCount: js.length,
        cssAssets: [],
        jsAssets: []
      };

      // Check CSS assets
      for (const assetPath of css) {
        const assetUrl = assetPath.startsWith('http') ? assetPath : `${SITE_URL}${assetPath}`;
        const result = await checkAsset(assetUrl);
        routeResult.cssAssets.push(result);
        
        if (result.statusCode !== 200) {
          results.issues.push(`❌ ${route}: CSS asset ${assetPath} returned ${result.statusCode}`);
          results.overallStatus = 'fail';
          console.log(`   ❌ CSS ${assetPath} → ${result.statusCode}`);
        } else {
          console.log(`   ✅ CSS ${assetPath.slice(-40)} → 200`);
        }
      }

      // Check first 5 JS assets (representative sample)
      for (const assetPath of js.slice(0, 5)) {
        const assetUrl = assetPath.startsWith('http') ? assetPath : `${SITE_URL}${assetPath}`;
        const result = await checkAsset(assetUrl);
        routeResult.jsAssets.push(result);
        
        if (result.statusCode !== 200) {
          results.issues.push(`❌ ${route}: JS asset ${assetPath} returned ${result.statusCode}`);
          results.overallStatus = 'fail';
          console.log(`   ❌ JS ${assetPath.split('/').pop()} → ${result.statusCode}`);
        } else {
          console.log(`   ✅ JS ${assetPath.split('/').pop()} → 200`);
        }
      }

      routeResult.allAssetsOk = routeResult.cssAssets.every(a => a.statusCode === 200) &&
                                routeResult.jsAssets.every(a => a.statusCode === 200);
      
      results.routes.push(routeResult);
      console.log('');
      
    } catch (error) {
      results.issues.push(`❌ ${route}: Failed to check - ${error.message}`);
      results.overallStatus = 'fail';
      console.error(`   ❌ Error checking ${route}:`, error.message);
    }
  }

  // Summary
  console.log('');
  console.log('═══════════════════════════════════════');
  console.log('📊 VERIFICATION SUMMARY');
  console.log('═══════════════════════════════════════');
  console.log(`Status: ${results.overallStatus === 'pass' ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Routes checked: ${results.routes.length}`);
  console.log(`Issues found: ${results.issues.length}`);
  
  if (results.issues.length > 0) {
    console.log('');
    console.log('Issues:');
    results.issues.forEach(issue => console.log(`  ${issue}`));
  }

  // Write detailed results to file
  const fs = await import('fs');
  const outputPath = './deployment-verification-results.json';
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log('');
  console.log(`📝 Detailed results saved to: ${outputPath}`);
  
  process.exit(results.overallStatus === 'pass' ? 0 : 1);
}

verify().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
