define([
	'react',
	"JSXTransformer",
	"mustache"	
], function (
	React,
	JsxTransformer,
	mustache
) {
  /**
   * <TimeMessage elapsed={100} />
   */
  var TimeMessage = React.createClass({displayName: 'TimeMessage',
    render: function() {
      var elapsed = Math.round(this.props.elapsed  / 100);
      var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
      var message =
        'React has been successfully running for ' + seconds + ' seconds.';

      // JSX code
      return JsxTransformer.exec(mustache.to_html("<p>{{message}}</p>", {
		message: message
      }));
    }
  });

  /**
   * <Timer start={aDate} />
   */
  var Timer = React.createClass({displayName: 'Timer',
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
      return React.createElement(TimeMessage, {elapsed: elapsed});
    }
  });

  return Timer;
});
