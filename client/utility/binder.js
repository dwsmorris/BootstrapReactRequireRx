/*globals define*/

/*
 * Important Model-View-Intent binding function.
 */

// from https://github.com/staltz/mvi-example/blob/master/src/utils/binder.js

define(function () {

	return function (model, view, intent) {
		if (view) {
			view.observe(model);
		}
		if (intent) {
			intent.observe(view);
		}
		if (model) {
			model.observe(intent);
		}
	};

});