require.config({
  paths: {
  	"es5-sham": "thirdParty/es5-sham",
  	"es5-shim": "thirdParty/es5-shim",
  	"console-polyfill": "thirdParty/console-polyfill",
  	html5shiv: "thirdParty/html5shiv",
  	"react": "thirdParty/react-with-addons",
  	"jsxTransformer": "thirdParty/JSXTransformer",
  	"mustache": "thirdParty/mustache",
  	maskedEval: "utility/maskedEval",
  	htmlToJs: "utility/htmlToJs",
	jquery: "thirdParty/jquery"
  },
  map: {
  	"*": {
  		/*css: "thirdParty/require-css/css",
		i18n: "thirdParty/i18n",
		image: "thirdParty/image",*/
  		text: "thirdParty/text",
  		jsx: "thirdParty/jsx"
  	}
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
	'components/timer/timer',
	"es5-shim",
	"es5-sham",
	"console-polyfill",
	"html5shiv"
], function (React, timer) {

	var start = new Date();
	timer = React.createFactory(timer);

	// Mount the JSX component in the app container
	React.render(
		timer({ start: start }),
		document.getElementById('js-app-container'));

});
