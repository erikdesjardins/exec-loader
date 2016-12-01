/**
 * @author Erik Desjardins
 * See LICENSE file in root directory for full license.
 */

'use strict';

module.exports = function(source) {
	this.cacheable && this.cacheable();
	var result = this.exec(source, this.resourcePath);
	return 'module.exports = ' + JSON.stringify(result) + ';';
};
