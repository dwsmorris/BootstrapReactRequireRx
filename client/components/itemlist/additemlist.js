/*globals define*/

define([
	"react",
	"itemsModel",
	"itemsView"
], function (
	React,
	itemsModel,
	itemsView
) {

	return function (element) {
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