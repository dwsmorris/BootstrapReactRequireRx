/*globals define*/
/*jslint bitwise: false*/

define([
	"rx",
	"lodash"
], function (
	Rx,
	_
) {

	var updateNumberOfItems = new Rx.Subject();
	var removeItem = new Rx.Subject();
	var changeItemColor = new Rx.Subject();

	var getUUID = function () {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
		return uuid;
	};

	var getRandomColor = function () {
		var hexColor = Math.floor(Math.random() * 16777215).toString(16);
		while (hexColor.length < 6) {
			hexColor = '0' + hexColor;
		}
		hexColor = '#' + hexColor;
		return hexColor;
	};

	var updateListOnAdd = updateNumberOfItems.map(function (amount) {
		var newItems = _.range(amount).map(function () {
			return {
				id: getUUID(),
				color: getRandomColor()
			};
		});

		return function (items) {
			return items.concat(newItems);
		};
	});

	// reassigning ids makes this slow as substantial change to dom
	// note that original react-only demo leaves gaps in array
	var updatedListOnRemove = removeItem.map(function (id) {
		return function (items) {
			return _.filter(items, function (item) {
				return item.id !== id;
			});
		};
	});

	var updateListOnColorChange = changeItemColor.map(function (itemId, color) {
		return function (items) {
			return _.map(items, function (item) {
				if (item.id === itemId) {
					return {
						id: item.id,
						color: color
					};
				} else {
					return item;
				}
			});
		};
	});

	var itemModifications = updateListOnAdd.merge(updatedListOnRemove).merge(updateListOnColorChange);

	var itemsUpdated = itemModifications.startWith([{
		id: "0",
		color: "red"
	}]).scan(function (items, modification) {
		return modification(items);
	});

	return {
		itemsUpdated: itemsUpdated,

		updateNumberOfItems: updateNumberOfItems,
		removeItem: removeItem,
		changeItemColor: changeItemColor
	};
});