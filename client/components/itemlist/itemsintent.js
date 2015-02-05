/*globals define*/

define([
	"rx",
	"replicate"
], function (
	Rx,
	replicate
) {

	var inputItemColorChanged$ = new Rx.Subject();


	var observe = function (itemsView) {
		replicate(itemsView.colorDescriptionModified, inputItemColorChanged$);
	};

	var colorChanged$ = inputItemColorChanged$;

	return {
		observe: observe,
		colorChanged$: colorChanged$
	};

});