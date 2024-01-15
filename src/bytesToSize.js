const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];

/**
 * Convert bytes to human readable string
 * @param  {Integer} bytes
 * @return {String}
 */
module.exports = (bytes) => {
  if (bytes == 0) return '0B';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};
