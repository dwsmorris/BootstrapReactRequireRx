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
		lodash: "thirdparty/lodash.compat",
		rx: "thirdparty/rx.lite",
		text: "thirdparty/text",
		css: "thirdparty/require-css/css",
		jsx: "thirdparty/jsx",
		itemsModel: "components/itemlist/itemsmodel",
		itemsView: "components/itemlist/itemsview",
		itemXml: "components/itemlist/item.xml",
		itemsXml: "components/itemlist/items.xml",
		item: "components/itemlist/item",
		items: "components/itemlist/items",
		addItemList: "components/itemlist/additemlist"
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
	"components/secondtimer/secondtimer",
	"components/todo/todos",
	"addItemList",
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
	secondTimer,
	todos,
	addItemList
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
		document.getElementsByClassName("label")[0]
	);

	React.render(
		React.createElement(secondTimer),
		document.getElementsByClassName("secondTimer")[0]
	);

	React.render(
		React.createElement(todos),
		document.getElementsByClassName("todos")[0]
	);

	addItemList(document.getElementsByClassName("itemList")[0]);

});
