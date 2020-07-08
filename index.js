const puppeteer = require('puppeteer');
const puppeteerFF = require('puppeteer-firefox');

const test = require('./lib/tester');

const trial = async (engine, name, url, numTests) => {
  const { timings, total } = await test(
    url,
    engine,
    numTests
  )
  console.log(`Time Trials for ${name} Browser`)
  console.table(timings)
  console.log('Averages')
  console.table(total)
}

let [ _, __, url, numTrials ] = process.argv;

if (!url) {
  console.error(new Error('No URL specified for page load test'))
} else {
  if (!numTrials) {
    console.warn('No number of trials specified, defaulting to 3')
  }
  numTrials = numTrials ? parseInt(numTrials, 10) : 3;

  (async () => {
    await trial(puppeteer, 'Chromium', url, numTrials)
    console.log('\n')
    await trial(puppeteerFF, 'FireFox', url, numTrials)
  })();
}
