/**
 * @author Erik Desjardins
 * See LICENSE file in root directory for full license.
 */

'use strict';

var loaderUtils = require('loader-utils');

module.exports = function(source) {
	var options = Object.assign({ cache: false, export: 'es6' }, loaderUtils.getOptions(this));

	this.cacheable(options.cache);

	var result = this.exec(source, this.resourcePath);

	var prefix = options.export === 'commonjs' ? 'module.exports = ' : 'export default ';

	return prefix + JSON.stringify(result) + ';';
};
