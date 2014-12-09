/*globals define*/

define([
	"react",
	"mustache",
	"text!./timeMessage.xml",
	"htmlToJs"
], function (
	React,
	mustache,
	timeMessageXml,
	htmlToJs
) {
	/**
	 * <TimeMessage elapsed={100} />
	 */
	return React.createClass({
		render: function () {
			var elapsed = Math.round(this.props.elapsed / 100);
			var seconds = elapsed / 10 + (elapsed % 10 ? "" : ".0");
			var message =
			  "React has been successfully running for " + seconds + " seconds.";

			return htmlToJs(mustache.to_html(timeMessageXml, {
				message: message
			}));
		}
	});

});
