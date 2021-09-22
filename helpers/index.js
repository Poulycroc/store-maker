/**
 * Convert CamelCaseString to snake_case
 * @param {String} str - String to convert
 * @return {String}
 */
export const toSnakeCase = (str) => {
  if (isNil(str)) return null;
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/\s+/g, "_")
    .toLowerCase();
};
