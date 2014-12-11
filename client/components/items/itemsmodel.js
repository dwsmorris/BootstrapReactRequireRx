/*globals define*/

define([
	"rx",
	"replicate"
], function (
	Rx,
	replicate
) {

	var intentAddItem$ = new Rx.Subject();
	var intentRemoveItem$ = new Rx.Subject();
	var intentColorChanged$ = new Rx.Subject();

	var observe = function (itemsIntent) {
		replicate(itemsIntent.addItem$, intentAddItem$);
		replicate(itemsIntent.removeItem$, intentRemoveItem$);
		replicate(itemsIntent.colorChanged$, intentColorChanged$);
	};

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

	var addItemMod$ = intentAddItem$.map(function (amount) {
		var newItems = [];
		for (var i = 0; i < amount; i+=1) {
			newItems.push(createRandomItem());
		}
		return function (listItems) {
			return listItems.concat(newItems).map(reassignId);
		};
	});

	var removeItemMod$ = intentRemoveItem$.map(function (id) {
		return function (listItems) {
			return listItems.filter(function (item) { return item.id !== id; })
							.map(reassignId);
		};
	});

	var colorChangedMod$ = intentColorChanged$.map(function (x) {
		return function (listItems) {
			listItems[x.id].color = x.color;
			return listItems;
		};
	});

	var itemModifications = addItemMod$.merge(removeItemMod$).merge(colorChangedMod$);

	var items$ = itemModifications.startWith([{
		id: 0,
		color: 'red'
	}]).scan(function (listItems) {
		return listItems;
	});

	return {
		observe: observe,
		items$: items$
	};
});