// /**
//  * Create an object composed of the picked object properties
//  * @param {Object} object
//  * @param {string[]} keys
//  * @returns {Object}
//  */
// export const pick = (object: unknown, keys: string[]) => {
//   return keys.reduce((obj: unknown, key) => {
//     if (object && Object.prototype.hasOwnProperty.call(object, key)) {
//       obj[key] = object[key];
//     }
//     return obj;
//   }, {});
// };
