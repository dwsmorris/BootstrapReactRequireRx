/*globals define*/

define([
	"react",
	"itemsModel",
	"itemsIntent",
	"itemsView",
	"binder"
], function (
	React,
	itemsModel,
	itemsIntent,
	itemsView,
	binder
) {

	return function (element) {
		binder(itemsModel, itemsView, itemsIntent);

		// stich up view -> intent messages


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