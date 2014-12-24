define(["../handlers/common","./TextSegment","../../misc"], function (handler,TextSegment,utils) {
	var stt = {};
	
	// args
	//   handler: main handler (default - dbidi/stt/handlers/common)
	//   guiDir: GUI direction (default - "ltr")
	//   dir: main stt direction (default - guiDir)
	//	 subDir: direction of subsegments
	//   points: array of delimiters (default - [])
	//   bounds: array of definitions of bounds in which handler works
	//   subs: object defines special handling for some substring if found
	//   cases: array of additional modules with their args for handling special cases (default - [])
	function displayStructure (content, args, isHtml, locale) {
		if (!content || !args) {
			return content;
		}
		if (!args.guiDir) {
			args.guiDir = "ltr";
		}
		if (!args.dir) {
			args.dir = args.guiDir;
		}
		if (typeof(args.points) === "undefined" ) {
			args.points = [];
		}
		if (!args.cases) {
			args.cases = [];
		}
		if (!args.bounds) {
			args.bounds = [];
		}
		args.commonHandler = handler;
		var segments = [new TextSegment (
			{
				content: content,
				actual: content
			})];
		var parse = handler.handle;
		if (args.handler && typeof(args.handler) === "function") {
			parse = args.handler.handle;
		}
		parse(content, segments, args, locale);
		// Actual work (adding UCC or creating <bdi> elements - TODO)
		return getResult(segments, args, isHtml); 
	}
	
	function getResult (segments, args, isHtml) { //jshint unused: false, maxcomplexity: 11
		var result = "";
		var checkedDir = "";
		for (var i=0; i<segments.length; i++) {
			if (segments[i].isVisible) {
				var dir = segments[i].textDirection;
				if (dir === "auto") {
					dir = utils.getDirection(segments[i].content, dir, args.guiDir);
				}
				if ((/^(rtl|ltr)$/i).test(dir)) {
					result += (dir === "rtl"? utils.RLE : utils.LRE) + segments[i].content + utils.PDF;
					checkedDir = dir;
				}
				else {
					result += segments[i].content;
					checkedDir = utils.getDirection(segments[i].content, dir, args.guiDir, true);
				}
				if (checkedDir !== args.dir && i < segments.length - 1) {
					result += args.dir === "rtl"? utils.RLM : utils.LRM;
				}
			}
		}
		var sttDir = args.dir === "auto" ? utils.getDirection(segments[0].actual, args.dir, args.guiDir) : args.dir;
		if (sttDir !== args.guiDir) {
			result = (sttDir === "rtl"? utils.RLE : utils.LRE) + result + utils.PDF;
		}
		return result;
	}
	
	function restore (text, isHtml) { //jshint unused: false
		return text;
	}
	
	stt.displayStructure = displayStructure;
	stt.restore = restore;
	
	return stt;
});
