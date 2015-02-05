/*globals define*/

define([
	"react",
	"itemsModel",
	"itemsIntent",
	"itemsView",
	"binder",
	"replicate"
], function (
	React,
	itemsModel,
	itemsIntent,
	itemsView,
	binder,
	replicate
) {

	return function (element) {
		binder(itemsModel, itemsView, itemsIntent);

		var numberOfItemsRequested = Rx.Observable.merge(
			itemsView.addNewItemButtonClicked.map(function () {
				return 1;
			}),
			itemsView.addManyItemsButtonClicked.map(function () {
				return 1000;
			})
		);
		numberOfItemsRequested.subscribe(itemsModel.updateNumberOfItems);

		itemsView.removeButtonClicked.subscribe(itemsModel.removeItem);




		var render = function (items) {
			React.render(
				React.createElement(itemsView.itemsView, {
					items: items
				}),
				element
			);
		};

		itemsView.vtree$.startWith([{
			id: 0,
			color: 'red'
		}]).subscribe(function (items) {
			render(items);
		});
	};

});