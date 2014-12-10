/*globals require*/

require.config({
	paths: {
		"es5-sham": "thirdparty/es5-sham",
		"es5-shim": "thirdparty/es5-shim",
		"console-polyfill": "thirdparty/console-polyfill",
		html5shiv: "thirdparty/html5shiv",
		"react": "thirdparty/react-with-addons",
		"jsxTransformer": "thirdparty/JSXTransformer",
		"mustache": "thirdparty/mustache",
		maskedEval: "utility/maskedeval",
		xmlToJs: "utility/xmltojs",
		jquery: "thirdparty/jquery",
		underscore: "thirdparty/underscore",
		rx: "thirdparty/rx.lite",
		binder: "utility/binder",
		replicate: "utility/replicate",
		itemsIntent: "components/items/itemsintent",
		itemsModel: "components/items/itemsmodel",
		itemsView: "components/items/itemsview"
	},
	map: {
		"*": {
			/*css: "thirdparty/require-css/css",
			i18n: "thirdparty/i18n",
			image: "thirdparty/image",*/
			text: "thirdparty/text",
			jsx: "thirdparty/jsx"
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
	"components/hellocomponent/hellocomponent",
	"xmlToJs",
	"text!demo2.xml",
	"jquery",
	"components/secondtimer/secondtimer",
	"components/todo/todos",
	"itemsModel",
	"itemsIntent",
	"itemsView",
	"binder",
	"es5-shim",
	"es5-sham",
	"console-polyfill",
	"html5shiv"
], function (
	React,
	timer,
	helloComponent,
	xmlToJs,
	demo2Xml,
	$,
	secondTimer,
	todos,
	itemsModel,
	itemsIntent,
	itemsView,
	binder
) {

	// Mount the JSX component in the app container
	React.render(
		React.createElement(timer, { start: new Date() }),
		document.getElementById('js-app-container')
	);

	React.render(
		xmlToJs(demo2Xml, {
			HelloComponent: helloComponent
		}),
		$(".label").get(0)
	);

	React.render(
		React.createElement(secondTimer),
		$(".secondTimer").get(0)
	);

	React.render(
		React.createElement(todos),
		$(".todos").get(0)
	);

	binder(itemsModel, itemsView, itemsIntent);
	React.render(
		React.createElement(itemsView, {
			items: []
		}),
		$(".application").get(0)
	);
});
