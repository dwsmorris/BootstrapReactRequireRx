﻿/*globals define*/

define([
	"rx",
	"react",
	"mustache",
	"text!itemsXml",
	"xmlToJs",
	"item",
	"lodash"
], function (
	Rx,
	React,
	mustache,
	itemsXml,
	xmlToJs,
	item,
	_
) {
	return function (element) {

		var updateItems = new Rx.Subject();

		var colorDescriptionModified = new Rx.Subject();
		var removeButtonClicked = new Rx.Subject();
		var addNewItemButtonClicked = new Rx.Subject();
		var addManyItemsButtonClicked = new Rx.Subject();

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
						colorDescriptionModified.onNext(itemId, color);
					},
					handleRemoveItem: function (itemId) {
						removeButtonClicked.onNext(itemId);
					},
					Item: item
				});
			}
		});

		var virtualDom = updateItems.map(function (itemsData) {
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

		var getUUID = function () {
			var d = new Date().getTime();
			var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = (d + Math.random() * 16) % 16 | 0;
				d = Math.floor(d / 16);
				return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
			});
			return uuid;
		};

		virtualDom.startWith([{
			id: "0",
			color: "red"
		}]).subscribe(function (items) {
			render(items);
		});

		return {
			removeButtonClicked: removeButtonClicked,
			addNewItemButtonClicked: addNewItemButtonClicked,
			addManyItemsButtonClicked: addManyItemsButtonClicked,
			colorDescriptionModified: colorDescriptionModified,

			updateItems: updateItems
		};
	};
});