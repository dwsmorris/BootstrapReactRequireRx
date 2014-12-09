/*globals define*/

define([
	"react",
	"xmlToJs",
	"text!./secondtimer.xml",
	"mustache"
], function (
	React,
	xmlToJs,
	secondTimerXml,
	mustache
) {

	return React.createClass({
		getInitialState: function () {
			return {
				time: 0
			};
		},
		componentDidMount: function () {
			this.timer = setInterval(this.tick, 1000);
		},
		componentDidUnmount: function () {
			this.timer && clearInterval(this.timer);
		},
		tick: function () {
			this.setState({
				time: this.state.time + 1
			});
		},
		render: function () {
			return xmlToJs(mustache.to_html(secondTimerXml, {
				time: this.state.time
			}));
		}
	});

});