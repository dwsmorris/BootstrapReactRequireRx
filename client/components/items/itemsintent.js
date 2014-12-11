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
		replicate(itemsView.addOneClicks$, inputAddOneClicks$);
		replicate(itemsView.addManyClicks$, inputAddManyClicks$);
		replicate(itemsView.removeClicks$, inputRemoveClicks$);
		replicate(itemsView.itemColorChanged$, inputItemColorChanged$);
	};

	var addItem$ = Rx.Observable.merge(
		inputAddOneClicks$.map(function () {
			return 1;
		}),
		inputAddManyClicks$.map(function () {
			return 1000;
		})
	);

	var removeItem$ = inputRemoveClicks$.map(function (clickEvent, id) {
		return id;
	});

	var colorChanged$ = inputItemColorChanged$.map(function (inputEvent) {
		return {
			id: Number(inputEvent.currentTarget.attributes['data-item-id'].value),
			color: inputEvent.currentTarget.value
		};
	});

	return {
		observe: observe,
		addItem$: addItem$,
		removeItem$: removeItem$,
		colorChanged$: colorChanged$
	};

});