const splitter = (promises, options, cb) => new Promise(async (resolve, reject) => {
  if (!promises.length) return resolve();

  const defaultOptions = {
    chunkSize: 5,
    retryLimit: 3,
    startChunk: 1,
    verbose: false,
    logger: {
      log: console.log,
      error: console.error
    }
  };

  if (typeof options === 'function') {
    cb = options;
    options = {};
  } else if (typeof options === 'undefined') {
    options = {};
  }

  options = Object.assign(defaultOptions, options);

  const { chunkSize, retryLimit, verbose, startChunk, logger } = options;

  const l = promises.length;
  const chunkTotal = Math.ceil(l / chunkSize);
  const out = [];
  if (verbose) logger.log(`Splitting promise list in ${chunkTotal} chunk${chunkTotal > 1 ? 's': ''} of ${chunkSize} promise${chunkSize > 1 ? 's' : ''}, starting from chunk ${startChunk}.`);
  for (let i = (startChunk - 1) * chunkSize; i < l; i+=chunkSize) {
    const chunkIndex = i / chunkSize + 1;
    let retryCount = retryLimit || 1;
    if (verbose) logger.log(`chunk ${chunkIndex}`);
    while (retryCount) try {
      const result = await Promise.all(promises.slice(i, i + chunkSize).map(fn => fn(chunkIndex)));
      out.push(result);
      if (cb) cb(null, result);
      break;
    } catch (err) {
      err.chunkIndex = chunkIndex;
      logger.error(err);
      logger.log(`retry ${retryLimit - retryCount + 1}/${retryLimit}...`);
      retryCount--;
      if (retryCount === 0) {
        return reject(err);
      }
      if (cb) cb(err);
    }
  }
  resolve(out);
});

module.exports = splitter;
