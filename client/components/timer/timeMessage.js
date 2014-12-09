/*globals define*/

define([
	"react",
	"mustache",
	"text!./timeMessage.html",
	"htmlToJs"
], function (
	React,
	mustache,
	timeMessageHtml,
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

			return htmlToJs(mustache.to_html(timeMessageHtml, {
				message: message
			}));
		}
	});

});
