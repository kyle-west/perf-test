const { chromium, firefox, webkit } = require('playwright');
const { saveVideo } = require('playwright-video');
const { resolve } = require('path');

const getEngine = (name) => ({ chromium, firefox, webkit }[name] || chromium)

async function run (filename, options) {
  const getValuedFlag = (value) => {
    const idx = options.findIndex((flag) => flag === `--${value}`);
    return idx !== -1 ? options[idx + 1] : null;
  }
  const getFlag = (flag) => options.includes(`--${flag}`);

  // ------------------------------------------------------------
  
  const record = getFlag(`record-video`);
  const videoName = getValuedFlag('record-video');

  const engineName = getValuedFlag('engine')
  const engine = getEngine(engineName);
  const browser = await engine.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  Object.assign(global, { browser, engine, engineName, context, page });
  
  // ------------------------------------------------------------

  let capture;
  if (record) {
    capture = await saveVideo(page, `${videoName || 'perf-test'}.mp4`)
  }
  
  let filepath = filename.startsWith('/') ? filename : resolve('.', filename);
  const script = require(filepath);
  
  await script();
  
  if (record) {
    await capture.stop();
  }

  await browser.close();
}

module.exports = run