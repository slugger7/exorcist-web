/**
  * @param {string} param
  * @param {number} def
  * @returns {number}
  */
export const getIntSearchParamOrDefault = (param, def) => {
  const params = new URLSearchParams(window.location.search);
  const val = parseInt(params.get(param));
  if (isNaN(val)) {
    return def;
  }
  return val;
};

/**
 * @param {string} param
 * @param {string} def
 * @returns {string}
 */
export const getStringSearchParamOrDefault = (param, def) => {
  const params = new URLSearchParams(window.location.search)

  const val = params.get(param)

  if (!val) {
    return def
  }

  return val
}

/**
 * @param {string} param
 * @param {string[]} def
 * @returns {string[]}
 */
export const getArrayOfStringsSearchParamOrDefault = (param, def) => {
  const params = new URLSearchParams(window.location.search)

  const val = params.getAll(param)

  if (!val) {
    return def
  }

  return val
}