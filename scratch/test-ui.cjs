const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
];

let executablePath = '';
for (const p of chromePaths) {
  if (fs.existsSync(p)) {
    executablePath = p;
    break;
  }
}

if (!executablePath) {
  console.error('Error: Could not find Google Chrome executable on system!');
  process.exit(1);
}

console.log(`Using Chrome: ${executablePath}`);

const routes = [
  '/',
  '/about',
  '/services',
  '/process',
  '/why-us',
  '/requirements',
  '/jobs',
  '/contact'
];

async function runTests() {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Track console errors
  const consoleErrors = [];
  page.on('pageerror', err => {
    consoleErrors.push(`[Page Error] ${err.toString()}`);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Console Error] ${msg.text()}`);
    }
  });

  console.log('Starting UI/UX route verification...');
  let hasFailed = false;

  for (const route of routes) {
    const url = `http://localhost:5174${route}`;
    console.log(`Checking route: ${route} (${url})`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 });
      console.log(`  ✓ Route loaded successfully`);
    } catch (e) {
      console.error(`  ✗ Failed to load route: ${e.message}`);
      hasFailed = true;
    }
  }

  await browser.close();

  if (consoleErrors.length > 0) {
    console.warn('\nWarning: Found the following console errors during testing:');
    consoleErrors.forEach(err => console.warn(`  ${err}`));
  } else {
    console.log('\n✓ No console errors detected!');
  }

  if (hasFailed) {
    console.error('\n✗ Test verification failed due to route loading errors.');
    process.exit(1);
  } else {
    console.log('\n✓ All routes verified successfully!');
    process.exit(0);
  }
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
