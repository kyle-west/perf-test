# Web Page Load Performance Tester

CLI to test performance page load trials on Chromium, Firefox, and WebKit.

Uses the beautiful [playwright](https://github.com/microsoft/playwright) package underneath.

_Note: This package is still in pre-release and subject to possible change._

## Install

Install globally using NPM.

```sh
npm install -g @kyle-west/perf-test
```

## Usage

The `perf` CLI simply needs a URL to test against, and a count for the number of trials to run (defaults to 3).

```sh
perf <url> [<number of trials>]
```

### Example

Running: `perf https://github.com/kyle-west 3` will test 3 page load trials of loading github.com. It will output something of the following:

```
Time Trials for https://github.com/kyle-west on Thu Jul 09 2020


Time Trials for Chromium Browser
┌─────────┬─────────────┬────────────────┬──────────────────────────┬──────────────┐
│ (index) │ responseEnd │ domInteractive │ domContentLoadedEventEnd │ loadEventEnd │
├─────────┼─────────────┼────────────────┼──────────────────────────┼──────────────┤
│    0    │    2269     │      2420      │           2420           │     2772     │
│    1    │     388     │      553       │           554            │     891      │
│    2    │     372     │      675       │           675            │     841      │
└─────────┴─────────────┴────────────────┴──────────────────────────┴──────────────┘
Chromium Averages
┌──────────────────────────┬────────────────────┐
│         (index)          │       Values       │
├──────────────────────────┼────────────────────┤
│       responseEnd        │ 1009.6666666666666 │
│      domInteractive      │        1216        │
│ domContentLoadedEventEnd │ 1216.3333333333333 │
│       loadEventEnd       │ 1501.3333333333333 │
└──────────────────────────┴────────────────────┘


Time Trials for Firefox Browser
┌─────────┬─────────────┬────────────────┬──────────────────────────┬──────────────┐
│ (index) │ responseEnd │ domInteractive │ domContentLoadedEventEnd │ loadEventEnd │
├─────────┼─────────────┼────────────────┼──────────────────────────┼──────────────┤
│    0    │     532     │      906       │           910            │     1096     │
│    1    │     542     │      916       │           920            │     1105     │
│    2    │     546     │      920       │           947            │     1129     │
└─────────┴─────────────┴────────────────┴──────────────────────────┴──────────────┘
Firefox Averages
┌──────────────────────────┬───────────────────┐
│         (index)          │      Values       │
├──────────────────────────┼───────────────────┤
│       responseEnd        │        540        │
│      domInteractive      │        914        │
│ domContentLoadedEventEnd │ 925.6666666666666 │
│       loadEventEnd       │       1110        │
└──────────────────────────┴───────────────────┘


Time Trials for WebKit Browser
┌─────────┬─────────────┬────────────────┬──────────────────────────┬──────────────┐
│ (index) │ responseEnd │ domInteractive │ domContentLoadedEventEnd │ loadEventEnd │
├─────────┼─────────────┼────────────────┼──────────────────────────┼──────────────┤
│    0    │     305     │      502       │           502            │     828      │
│    1    │     315     │      529       │           529            │     846      │
│    2    │     304     │      497       │           498            │     819      │
└─────────┴─────────────┴────────────────┴──────────────────────────┴──────────────┘
WebKit Averages
┌──────────────────────────┬───────────────────┐
│         (index)          │      Values       │
├──────────────────────────┼───────────────────┤
│       responseEnd        │        308        │
│      domInteractive      │ 509.3333333333333 │
│ domContentLoadedEventEnd │ 509.6666666666667 │
│       loadEventEnd       │        831        │
└──────────────────────────┴───────────────────┘
```

### Run a script

```sh
perf --script <filename> [--engine <chromium|firefox|webkit>]
```

Scripts must be modules of the form:

```js
module.exports = async () => {
  // page, browser, engine, engineName, context available globally
  await page.goto("https://google.com")
}
```

### Record Video

Include the `--record-video` in the arguments list to save a local file. _Note this feature only works in script mode for Chromium browsers_

```sh
perf --script <filename> --record-video <video-name>
```

File will be saved to `<video-name>.mp4`
