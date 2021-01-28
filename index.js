#!/usr/bin/env node
const { chromium, firefox, webkit } = require('playwright');

const test = require('./lib/tester');
const runScript = require('./lib/run-script');

const trial = async (engine, displayName, url, numTests) => {
  const { timings, total } = await test(
    url,
    engine,
    numTests
  )
  console.log(`Time Trials for ${displayName} Browser`)
  console.table(timings)
  console.log(`${displayName} Averages`)
  console.table(total)
}

let [ _, __, url, numTrials, ...options ] = process.argv;

if (!url) {
  console.error(new Error('No URL specified for page load test'))
} else if (url === '--script') {
  const filename = numTrials
  runScript(filename, options)
} else {
  if (!numTrials) {
    console.warn('No number of trials specified, defaulting to 3')
  }
  numTrials = numTrials ? parseInt(numTrials, 10) : 3;

  (async () => {
    console.log(`Time Trials against ${url} on ${new Date().toDateString()}\n\n`)
    await trial(chromium, 'Chromium', url, numTrials)
    console.log('\n')
    await trial(firefox, 'Firefox', url, numTrials)
    console.log('\n')
    await trial(webkit, 'WebKit', url, numTrials)
  })();
}
