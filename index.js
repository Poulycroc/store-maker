/**
 * Check if element is null or undefined
 * @param {*} any - String to convert
 * @return {Boolean}
 */
const isNil = (any) => {
  return (
    any === undefined || any === null || any === "undefined" || any === "null"
  );
};

/**
 * Convert CamelCaseString to snake_case
 * @param {String} str - String to convert
 * @return {String}
 */
const toSnakeCase = (str) => {
  console.log({ toSnakeCase: str });
  if (isNil(str)) return null;
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/\s+/g, "_")
    .toLowerCase();
};

/**
 * Returns a snake cased uppercased version of a string with a prefix
 *
 * @param property
 * @param prefix
 * @returns {string}
 */
const getMutationName = (property, prefix) => {
  const name = prefix + "_" + toSnakeCase(property);
  return name.toUpperCase();
};

/**
 * Creates mutations for a simple setter
 *
 * @param {Array} properties
 * @return {Object}
 */
const rendStoreMutation = (properties = [], prefix) => {
  if (properties === []) return [];

  const mutations = {};
  for (const property of properties) {
    const mutationName = getMutationName(property, prefix);
    mutations[mutationName] = (state, arg) => {
      state[property] = arg;
    };
  }
  return mutations;
};

/**
 * Creates mutations for a simple setter
 *
 * @param {Array} properties
 * @return {Object}
 */
export const makeSetters = (properties = []) => {
  if (properties === []) return {};
  return rendStoreMutation(properties, "set");
};

/**
 * Creates mutations for a simpler flusher
 *
 * @param {Array} properties
 * @return {Object}
 */
export const makeFlushers = (properties = []) => {
  if (properties === []) return {};
  return rendStoreMutation(properties, "flush");
};

/**
 * Creates mutations for a simpler flusher
 *
 * @param {Array} properties
 * @return {Object}
 */
export const makeToggles = (properties = []) => {
  if (properties === []) return {};
  return rendStoreMutation(properties, "toggle");
};

/**
 * Create getters list from keys
 *
 * @param {Array} getters
 * @return {Object}
 */
export const makeGetters = (getters = []) => {
  if (getters === []) return {};
  let res = {};
  getters.forEach((g) => (res = { ...res, [g]: (state) => state[g] }));
  return res;
};

/**
 * @param {Object} object
 * @return {JSON}
 */
export const stateClone = (object) => {
  return JSON.parse(JSON.stringify(object));
};

/**
 * @param {Object} object
 * @return {JSON}
 */
export const toggleMutation = ({ commit, state }, stateName) => {
  return commit(rendStoreMutation(stateName), !state[stateName]);
};

/**
 * @param {Object} object
 * @param {String} stateName
 * @param {*} value
 * @return {JSON}
 */
export const setMutation = ({ commit }, stateName, value) => {
  return commit(rendStoreMutation(stateName), value);
};
