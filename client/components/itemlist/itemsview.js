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
	return function (element) {

		var updateItems = new Rx.Subject();

		var modelItems$ = new Rx.Subject();

		var colorDescriptionModified = new Rx.Subject();
		var removeButtonClicked = new Rx.Subject();
		var addNewItemButtonClicked = new Rx.Subject();
		var addManyItemsButtonClicked = new Rx.Subject();

		var observe = function (itemsModel) {
			//replicate(itemsModel.items$, modelItems$);
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
					handleRemoveItem: function (itemId) {
						removeButtonClicked.onNext(+itemId);
					},
					Item: item
				});
			}
		});

		var vtree$ = updateItems.map(function (itemsData) {
			return itemsData.map(function (itemData) {
				return {
					color: itemData.color,
					id: itemData.id,
					key: itemData.id
				};
			});
		});

		var render = function (items) {
			React.render(
				React.createElement(itemsView, {
					items: items
				}),
				element
			);
		};

		vtree$.startWith([{
			id: 0,
			color: 'red'
		}]).subscribe(function (items) {
			render(items);
		});

		return {
			observe: observe,
			itemsView: itemsView,
			vtree$: vtree$,
			removeButtonClicked: removeButtonClicked,
			addNewItemButtonClicked: addNewItemButtonClicked,
			addManyItemsButtonClicked: addManyItemsButtonClicked,
			colorDescriptionModified: colorDescriptionModified,
			updateItems: updateItems
		};
	};
});