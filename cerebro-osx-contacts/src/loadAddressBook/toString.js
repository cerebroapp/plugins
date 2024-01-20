/**
 * We have to convert all wrappers to strings in this process
 * Otherwise electron wraps them to functions
 *
 * @param  {Function} value Nodobjc type convertable to string
 * @return {Maybe<String>}
 */
module.exports =  function toString(value) {
  return value ? value.toString() : null
}
