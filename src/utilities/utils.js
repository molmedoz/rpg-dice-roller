const btoaImpl = (str) => {
  try {
    return btoa(str);
  } catch (e) {
    return Buffer.from(`${str}`).toString('base64');
  }
};

const atobImpl = (b64Encoded) => {
  try {
    return atob(b64Encoded);
  } catch (e) {
    return Buffer.from(b64Encoded, 'base64').toString('latin1');
  }
};

/**
 * Check if the value is a valid base64 encoded string.
 *
 * @param {string} val
 *
 * @returns {boolean} `true` if it is valid base64 encoded, `false` otherwise
 */
const isBase64 = (val) => {
  try {
    return !!(val && (btoaImpl(atobImpl(val)) === val));
  } catch (e) {
    return false;
  }
};

/**
 * Check if the value is a valid JSON encoded string.
 *
 * @param {string} val
 *
 * @returns {boolean} `true` if the value is valid JSON, `false` otherwise
 */
const isJson = (val) => {
  try {
    const parsed = val ? JSON.parse(val) : false;

    return !!(parsed && (typeof parsed === 'object'));
  } catch (e) {
    return false;
  }
};

export {
  btoaImpl,
  atobImpl,
  isBase64,
  isJson,
};
