/*globals define*/

define([
	"jsxTransformer",
	"maskedEval",
	"react",
	"lodash"
], function (
	jsxTransformer,
	maskedEval,
	React,
	_
) {

	return function (html, environment) {
		return maskedEval(jsxTransformer.transform(html).code, _.merge({}, environment, {
			React: React
		}));
	};

});