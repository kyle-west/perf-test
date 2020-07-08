function avg (dataSet, key) {
  return dataSet.reduce((a, b) => a + b[key], 0) / dataSet.length
}

module.exports = {
  extractData: ({
    navigationStart,
    responseEnd,
    domInteractive,
    domContentLoadedEventEnd,
    loadEventEnd,
  }) => ({
    responseEnd: responseEnd - navigationStart,
    domInteractive: domInteractive - navigationStart,
    domContentLoadedEventEnd: domContentLoadedEventEnd - navigationStart,
    loadEventEnd: loadEventEnd - navigationStart,
  }),
  totalData: (data) => ({
    responseEnd: avg(data, 'responseEnd'),
    domInteractive: avg(data, 'domInteractive'),
    domContentLoadedEventEnd: avg(data, 'domContentLoadedEventEnd'),
    loadEventEnd: avg(data, 'loadEventEnd'),
  }) 
}
