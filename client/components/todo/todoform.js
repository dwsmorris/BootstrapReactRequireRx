/*globals define*/

define([
	"react",
	"text!./todoform.xml",
	"mustache",
	"xmlToJs"
], function (
	React,
	todoFormXml,
	mustache,
	xmlToJs
) {

	return React.createClass({
		propTypes: {
			onSubmit: React.PropTypes.func.isRequired
		},
		getInitialState: function () {
			return {
				text: ""
			};
		},
		onTextChange: function (e) {
			this.setState({
				text: e.target.value
			});
		},
		onSubmit: function (e) {
			e.preventDefault();
			if (this.state.text.trim()) {
				this.props.onSubmit(this.state.text);
				this.setState({
					text: ""
				});
			}
		},
		render: function () {
			return xmlToJs(mustache.to_html(todoFormXml, {
				text: this.state.text
			}), {
				onSubmit: this.onSubmit,
				onTextChange: this.onTextChange
			});
		}
	});

});