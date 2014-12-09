/*globals define*/

define([
	"jsxTransformer",
	"maskedEval",
	"react",
	"jquery"
], function (
	jsxTransformer,
	maskedEval,
	React,
	$
) {

	return function (html, environment) {
		return maskedEval(jsxTransformer.transform(html).code, $.extend(true, {}, environment, {
			React: React
		}));
	};

});