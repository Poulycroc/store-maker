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
  if (isNil(str)) return null;
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/\s+/g, "_")
    .toLowerCase();
};

export default {
  isNil,
  toSnakeCase,
};
