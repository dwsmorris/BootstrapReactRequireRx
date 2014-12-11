/*globals define*/

define([
	"rx",
	"replicate",
	"react",
	"mustache",
	"text!./items.xml",
	"xmlToJs",
	"./item"
], function (
	Rx,
	replicate,
	React,
	mustache,
	itemsXml,
	xmlToJs,
	item
) {

	var modelItems$ = new Rx.BehaviorSubject(null);
	var itemWidthChanged$ = new Rx.Subject();
	var itemColorChanged$ = new Rx.Subject();
	var removeClicks$ = new Rx.Subject();
	var addOneClicks$ = new Rx.Subject();
	var addManyClicks$ = new Rx.Subject();

	var observe = function (itemsModel) {
		replicate(itemsModel.items$, modelItems$);
	};
	/*
	var items = modelItems$.map(function (itemsData) {
		return itemsData.map(function (itemData) {
			return {
				color: itemData.color,
				id: itemData.id,
				key: itemData.id
			};
		});
	});
	*/
	var items = [{ color: "red", id: 0, key: 0 }];
	var xml=mustache.to_html(itemsXml, {
		items: items
	});

	var itemsView = React.createClass({
		render: function () {
			return xmlToJs(mustache.to_html(itemsXml, {
				items: items
			}), {
				addItem: function (ev) {
					addOneClicks$.onNext(ev);
					itemsView.forceUpdate();
				},
				addManyItems: function (ev) {
					addManyClicks$.onNext(ev);
					itemsView.forceUpdate();
				},
				handleItemChange: function (ev) {
					itemColorChanged$.onNext(ev);
					itemsView.forceUpdate();
				},
				handleRemoveItem: function (ev) {
					removeClicks$.onNext(ev);
					itemsView.forceUpdate();
				},
				Item: item
			});
		}
	});

	return {
		observe: observe,
		itemsView: itemsView,
		removeClicks$: removeClicks$,
		addOneClicks$: addOneClicks$,
		addManyClicks$: addManyClicks$,
		itemColorChanged$: itemColorChanged$
	};
});