/*globals define*/

define([
	"rx",
	"replicate"
], function (
	Rx,
	replicate
) {

	var inputAddOneClicks$ = new Rx.Subject();
	var inputAddManyClicks$ = new Rx.Subject();
	var inputRemoveClicks$ = new Rx.Subject();
	var inputItemColorChanged$ = new Rx.Subject();

	var observe = function (itemsView) {
		replicate(itemsView.addNewItemButtonClicked, inputAddOneClicks$);
		replicate(itemsView.addManyItemsButtonClicked, inputAddManyClicks$);
		replicate(itemsView.removeButtonClicked, inputRemoveClicks$);
		replicate(itemsView.colorDescriptionUpdated, inputItemColorChanged$);
	};

	var addItem$ = Rx.Observable.merge(
		inputAddOneClicks$.map(function () {
			return 1;
		}),
		inputAddManyClicks$.map(function () {
			return 1000;
		})
	);

	var removeItem$ = inputRemoveClicks$.map(function (id) {
		return +id;
	});

	var colorChanged$ = inputItemColorChanged$;

	return {
		observe: observe,
		addItem$: addItem$,
		removeItem$: removeItem$,
		colorChanged$: colorChanged$
	};

});