/*globals define*/

define([
	"react"	,
	"text!./item.xml",
	"xmlToJs",
	"underscore",
	"css!./item.css"
], function (
	React,
	itemXml,
	xmlToJs,
	_
) {

	return React.createClass({
		render: function () {
			return xmlToJs(itemXml, {
				color: this.props.color,
				handleColorChange: this.props.onChange,
				handleRemoveClick: _.partial(this.props.onRemove, this.props.id),
				style: {
					background: this.props.color
				}
			});
		}
	});

});