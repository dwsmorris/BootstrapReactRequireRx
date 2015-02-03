/*globals define*/

define([
	"rx",
	"replicate",
	"react",
	"mustache",
	"text!itemsXml",
	"xmlToJs",
	"item"
], function (
	Rx,
	replicate,
	React,
	mustache,
	itemsXml,
	xmlToJs,
	item
) {

	var modelItems$ = new Rx.Subject();

	var colorDescriptionModified = new Rx.Subject();
	var removeButtonClicked = new Rx.Subject();
	var addNewItemButtonClicked = new Rx.Subject();
	var addManyItemsButtonClicked = new Rx.Subject();

	var observe = function (itemsModel) {
		replicate(itemsModel.items$, modelItems$);
	};

	var itemsView = React.createClass({
		render: function () {
			return xmlToJs(mustache.to_html(itemsXml, {
				items: this.props.items
			}), {
				addItem: function (ev) {
					addNewItemButtonClicked.onNext(ev);
				},
				addManyItems: function (ev) {
					addManyItemsButtonClicked.onNext(ev);
				},
				handleItemChange: function (itemId, color) {
					colorDescriptionModified.onNext({
						itemId: +itemId,
						color: color
					});
				},
				handleRemoveItem: function(itemId) {
					removeButtonClicked.onNext(itemId);
				},
				Item: item
			});
		}
	});

	var vtree$ = modelItems$.map(function (itemsData) {
		return itemsData.map(function (itemData) {
			return {
				color: itemData.color,
				id: itemData.id,
				key: itemData.id
			};
		});
	});

	return {
		observe: observe,
		itemsView: itemsView,
		vtree$: vtree$,
		removeButtonClicked: removeButtonClicked,
		addNewItemButtonClicked: addNewItemButtonClicked,
		addManyItemsButtonClicked: addManyItemsButtonClicked,
		colorDescriptionModified: colorDescriptionModified
	};
});