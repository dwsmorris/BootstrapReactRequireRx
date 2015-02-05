/*globals define*/

define([
	"rx"
], function (
	Rx
) {

	var updateNumberOfItems = new Rx.Subject();
	var removeItem = new Rx.Subject();
	var changeItemColor = new Rx.Subject();

	var createRandomItem = function () {
		var hexColor = Math.floor(Math.random() * 16777215).toString(16);
		while (hexColor.length < 6) {
			hexColor = '0' + hexColor;
		}
		hexColor = '#' + hexColor;
		return {
			color: hexColor
		};
	};

	var reassignId = function (item, index) {
		return {
			id: index,
			color: item.color
		};
	};

	var addItemMod$ = updateNumberOfItems.map(function (amount) {
		var newItems = [];
		for (var i = 0; i < amount; i+=1) {
			newItems.push(createRandomItem());
		}
		return function (listItems) {
			return listItems.concat(newItems).map(reassignId);
		};
	});

	// reassigning ids makes this slow as substantial change to dom
	// note that original react-only demo leaves gaps in array
	var updatedListOnRemove = removeItem.map(function (id) {
		return function (listItems) {
			return listItems.filter(function (item) { return item.id !== id; })
							.map(reassignId);
		};
	});

	var updateListOnColorChange = changeItemColor.map(function (x) {
		return function (listItems) {
			listItems[x.itemId].color = x.color;
			return listItems;
		};
	});

	var itemModifications = addItemMod$.merge(updatedListOnRemove).merge(updateListOnColorChange);

	var itemsUpdated = itemModifications.startWith([{
		id: 0,
		color: 'red'
	}]).scan(function (listItems, modification) {
		return modification(listItems);
	});

	return {
		itemsUpdated: itemsUpdated,
		updateNumberOfItems: updateNumberOfItems,
		removeItem: removeItem,
		changeItemColor: changeItemColor
	};
});