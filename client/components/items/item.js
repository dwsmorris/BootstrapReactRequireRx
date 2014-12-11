/*globals define*/

define([
	"react"	,
	"text!itemXml",
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
			var that = this;
			return xmlToJs(itemXml, {
				color: this.props.color,
				handleColorChange: function(e) {
					that.props.onChange(that.props.id, e.target.value);
				},
				handleRemoveClick: _.partial(this.props.onRemove, this.props.id),
				style: {
					background: this.props.color
				}
			});
		}
	});

});