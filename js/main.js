require.config({
  paths: {
  	"es5-sham": "thirdParty/es5-sham",
  	"es5-shim": "thirdParty/es5-shim",
  	"console-polyfill": "thirdParty/console-polyfill",
  	html5shiv: "thirdParty/html5shiv",
  	"react": "react-with-addons",
    "JSXTransformer": "JSXTransformer"
  },
  shim: {
  	"es5-sham": {
  		deps: ["es5-shim"]
  	},
  	react: {
  		deps: ["es5-shim", "es5-sham", "console-polyfill", "html5shiv"]
  	}
  },
  jsx: {
    fileExtension: '.jsx'
  }
});

require([
	'react',
	'jsx!components/Timer',
	"es5-shim",
	"es5-sham",
	"console-polyfill",
	"html5shiv"
], function (React, Timer) {
  var start = new Date();
  Timer = React.createFactory(Timer);

  // Mount the JSX component in the app container
  React.render(
      Timer({start: start}),
      document.getElementById('js-app-container'));
});
