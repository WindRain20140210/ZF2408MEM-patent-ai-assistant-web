/**
 * slice array. every small array has five elements.
 * [ [], [], [], [], [] ]
 *
 * @param array
 * @param size
 * @returns {*[]}
 */

export function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    result.push(chunk);
  }
  return result[0];
}
