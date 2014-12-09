define([
	'react',
	"JSXTransformer",
	"mustache",
	"text!./timeMessage.html"
], function (
	React,
	JsxTransformer,
	mustache,
	timeMessageHtml
) {
  /**
   * <TimeMessage elapsed={100} />
   */
  return React.createClass({displayName: 'TimeMessage',
    render: function() {
      var elapsed = Math.round(this.props.elapsed  / 100);
      var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
      var message =
        'React has been successfully running for ' + seconds + ' seconds.';

      // JSX code
      return JsxTransformer.exec(mustache.to_html(timeMessageHtml, {
		message: message
      }));
    }
  });

});
