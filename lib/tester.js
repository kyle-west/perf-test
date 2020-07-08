const { extractData, totalData } = require('./process-data')

module.exports = async function (url, puppeteer, rounds = 1) {
  const timings = []
  
  for(let i = 1; i <= rounds; ++i) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const performanceTiming = JSON.parse(
      await page.evaluate(() => JSON.stringify(window.performance.timing))
    );
    timings.push(extractData(performanceTiming))
    await browser.close();
  }
    
  return { timings, total: totalData(timings) }
}
