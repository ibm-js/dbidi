// To run the test cases:
//     With node.js:
//         > cd /path/to/dbidi/
//         > grunt intern:node
//     With browser: http://yourserver/path/to/dbidi/node_modules/intern/client.html?config=tests/intern
define({
	loader: {
		baseUrl: typeof window !== "undefined" ? "../../.." : "..",
		packages: ["dbidi"]
	},

	useLoader: {
		"host-node": "dojo/dojo",
		"host-browser": "../../../requirejs/require.js"
	},

	proxyPort: 9000,

	proxyUrl: "http://localhost:9000/",

	capabilities: {
		"selenium-version": "2.37.0",
		"idle-timeout": 60
	},

	environments: [
		{browserName: "internet explorer", version: "9", platform: "Windows 7", name: "dbidi"},
		{browserName: "internet explorer", version: "10", platform: "Windows 8", name: "dbidi"},
		{browserName: "internet explorer", version: "11", platform: "Windows 8.1", name: "dbidi"},
		{browserName: "firefox", version: "25", platform: [/*"OS X 10.6",*/ "Linux", "Windows 7"], name: "dbidi"},
		{browserName: "chrome", version: "", platform: [/*"OS X 10.6", */ "Linux", "Windows 7"], name: "dbidi"},
		{browserName: "safari", version: "6", platform: "OS X 10.8", name: "dbidi"},
		{browserName: "safari", version: "7", platform: "OS X 10.9", name: "dbidi"},
		{browserName: "iphone", platform: "OS X 10.9", version: "7",
			"device-orientation": "portrait", "selenium-version": "", name: "dbidi"},
		{browserName: "ipad", platform: "OS X 10.9", version: "7",
			"device-orientation": "portrait", "selenium-version": "", name: "dbidi"},
		{browserName: "iphone", platform: "OS X 10.8", version: "6.1",
			"device-orientation": "portrait", "selenium-version": "", name: "dbidi"},
		{browserName: "ipad", platform: "OS X 10.8", version: "6.1",
			"device-orientation": "portrait", "selenium-version": "", name: "dbidi"}
	],

	maxConcurrency: 3,

	useSauceConnect: true,

	webdriver: {
		host: "localhost",
		port: 4444
	},

	suites: ["dbidi/tests/all"],

	excludeInstrumentation: /^((dbidi(\/|\\)(node_modules|tests))|dojo|requirejs|dcl)/
});
