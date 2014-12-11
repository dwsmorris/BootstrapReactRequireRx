/*globals define*/

define([
	"react",
	"text!./todolist.xml",
	"xmlToJs",
	"lodash",
	"mustache"
], function (
	React,
	todoListXml,
	xmlToJs,
	_,
	mustache
) {

	return React.createClass({
		propTypes: {
			items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
		},
		render: function () {
			var items = _.map(this.props.items, function (item, index) {
				return {
					data: item,
					index: index
				};
			});

			return xmlToJs(mustache.to_html(todoListXml, {
				items: items
			}));
		}
	});

});