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
		//binder(itemsModel, itemsView, itemsIntent);
		itemsView = itemsView(element);

		// view -> model
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

		itemsView.colorDescriptionModified.subscribe(itemsModel.changeItemColor);


		// model -> view
		itemsModel.itemsUpdated.subscribe(itemsView.updateItems);
	};

});