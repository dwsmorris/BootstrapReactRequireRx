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
  	xmlToJs: "utility/xmlToJs",
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
	"components/helloComponent/helloComponent",
	"xmlToJs",
	"text!demo2.xml",
	"es5-shim",
	"es5-sham",
	"console-polyfill",
	"html5shiv"
], function (
	React,
	timer,
	helloComponent,
	xmlToJs,
	demo2Xml
) {

	var start = new Date();
	timer = React.createFactory(timer);

	// Mount the JSX component in the app container
	React.render(
		timer({ start: start }),
		document.getElementById('js-app-container'));

	React.render(
		xmlToJs(demo2Xml, {
			HelloComponent: helloComponent
		}),
		document.getElementsByClassName("label")[0]
	);
});
