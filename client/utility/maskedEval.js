/*globals define*/
/*jslint evil: true*/

// based on http://stackoverflow.com/questions/543533/restricting-eval-to-a-narrow-scope

define(function () {

	return function (source, environment) {
		return (new Function("with(this) { return " + source + "; }")).call(environment);
	};

});