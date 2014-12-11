/*globals define*/

define([
	"react"	,
	"text!./item.xml",
	"xmlToJs",
	"mustache",
	"css!./item.css"
], function (
	React,
	itemXml,
	xmlToJs,
	mustache
) {

	return React.createClass({
		render: function () {
			return xmlToJs(itemXml, {
				color: this.props.color,
				handleItemChange: this.props.onChange,
				handleRemoveItem: this.props.onRemove,
				style: {
					background: this.props.color
				}
			});
		}
	});

});