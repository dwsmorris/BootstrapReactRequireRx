/*globals define*/

define([
	"react"	,
	"text!./item.xml",
	"xmlToJs"
], function (
	React,
	itemXml,
	xmlToJs
) {

	return React.createClass({
		render: function () {
			return xmlToJs(itemXml, {
				color: this.props.color,
				handleItemChange: this.props.onChange,
				handleRemoveItem: this.props.onRemove
			});
		}
	});

});