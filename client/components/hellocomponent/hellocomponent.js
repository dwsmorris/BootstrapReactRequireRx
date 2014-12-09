/*globals define*/

define([
	"react",
	"xmlToJs",
	"text!./hellocomponent.xml",
	"mustache"
], function (
	React,
	xmlToJs,
	helloComponentXml,
	mustache
) {

	return React.createClass({
		render: function () {
			return xmlToJs(mustache.to_html(helloComponentXml, {
				name: this.props.name
			}));
		}
	});

});