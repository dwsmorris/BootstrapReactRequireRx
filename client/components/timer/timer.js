define([
	'react',
	"JSXTransformer",
	"mustache",
	"./timeMessage"
], function (
	React,
	JsxTransformer,
	mustache,
	timeMessage
) {
  /**
   * <Timer start={aDate} />
   */
  return React.createClass({displayName: 'Timer',
    getInitialState: function() {
      return {now: new Date()};
    },

    componentDidMount: function(el, root) {
      var that = this;
      setInterval(function() {
        that.setState({now: new Date()});
      }, 50);
    },

    render: function() {
      // JSX code
      var elapsed = this.state.now.getTime() - this.props.start.getTime();
      return React.createElement(timeMessage, { elapsed: elapsed });
    }
  });

});
