const { extractData, totalData } = require('./process-data')

module.exports = async function (url, engine, rounds = 1) {
  const timings = []
  
  for(let i = 1; i <= rounds; ++i) {
    const browser = await engine.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto(url);
    const perfData = extractData(JSON.parse(
      await page.evaluate(() => JSON.stringify(window.performance.timing))
    ));

    timings.push(perfData);
    await browser.close();
  }
    
  return { timings, total: totalData(timings) }
}
