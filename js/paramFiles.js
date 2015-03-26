'use strict';

/**
 * Get the files sent as an argument
 * @return {?Array}
 */
exports.paramFiles = function paramFiles() {
  var argv = process.argv,
      chosen = false,
      files = [];

  argv.forEach(function(arg) {
    if (arg.indexOf('-files') === 0 || arg.indexOf('-file') === 0) {
      var value = arg.split('=')[1];

      if (value) {
        value.split(',').forEach(function(file) {
          if (file) {
            files.push(file);
          }
        });
      }

      chosen = true;
    }
  });

  return (chosen ? files : null);
};

/**
 * Get path to css files
 * @param {String} path
 * @return {String}
 */
exports.css = function css(path) {
  return filesFromPath(path, 'css');
};

/**
 * Get path to js files
 * @param {String} path
 * @return {String}
 */
exports.js = function js(path) {
  return filesFromPath(path, 'js');
};

exports.filesFromPath = filesFromPath;

/**
 * Get path to files by type
 * @param {String} path
 * @param {String} type
 * @return {String}
 */
function filesFromPath(path, type) {
  var lastLetter;
  path = path.trim();
  lastLetter = path[path.length - 1];

  if (lastLetter !== '/' && lastLetter !== '\\') {
    path += '/';
  }

  return path + '**/*.' + type;
}
