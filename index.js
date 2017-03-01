/**
 * @author Erik Desjardins
 * See LICENSE file in root directory for full license.
 */

'use strict';

var loaderUtils = require('loader-utils');

module.exports = function(source) {
	var options = Object.assign({ cache: false }, loaderUtils.getOptions(this));

	this.cacheable(options.cache);

	var result = this.exec(source, this.resourcePath);
	return 'module.exports = ' + JSON.stringify(result) + ';';
};
