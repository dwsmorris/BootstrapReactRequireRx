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

	var modelItems$ = new Rx.Subject();
	var itemWidthChanged$ = new Rx.Subject();
	var itemColorChanged$ = new Rx.Subject();
	var removeClicks$ = new Rx.Subject();
	var addOneClicks$ = new Rx.Subject();
	var addManyClicks$ = new Rx.Subject();

	var observe = function (itemsModel) {
		replicate(itemsModel.items$, modelItems$);
	};

	var itemsView = React.createClass({
		render: function () {
			var that = this;

			return xmlToJs(mustache.to_html(itemsXml, {
				items: this.props.items
			}), {
				addItem: function (ev) {
					addOneClicks$.onNext(ev);
				},
				addManyItems: function (ev) {
					addManyClicks$.onNext(ev);
				},
				handleItemChange: function (ev) {
					itemColorChanged$.onNext(ev);
				},
				handleRemoveItem: function (ev) {
					removeClicks$.onNext(ev, that.props.id);
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
		removeClicks$: removeClicks$,
		addOneClicks$: addOneClicks$,
		addManyClicks$: addManyClicks$,
		itemColorChanged$: itemColorChanged$
	};
});