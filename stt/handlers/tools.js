define(["../internal/TextSegment"], function (TextSegment) {
	function initBounds(bounds) {
		if (!bounds) {
			return false;
		}
		if (typeof(bounds.start) === "undefined") {
			bounds.start = "";
		}
		if (typeof(bounds.end) === "undefined") {
			bounds.end = "";
		}
		if (typeof(bounds.startAfter) !== "undefined") {
			bounds.start = bounds.startAfter;
			bounds.after = true;
		} else {
			bounds.after = false;
		}
		if (typeof(bounds.endBefore) !== "undefined") {
			bounds.end = bounds.endBefore;
			bounds.before = true;
		} else {
			bounds.before = false;
		}
		var startPos = parseInt(bounds.startPos, 10);
		if (!isNaN(startPos)) {
			bounds.usePos = true;
		} else {
			bounds.usePos = false;
		}
		var bLength = parseInt(bounds.length, 10);
		if (!isNaN(bLength)) {
			bounds.useLength = true;
		} else {
			bounds.useLength = false;
		}
		bounds.loops = typeof(bounds.loops) !== "undefined" ? !!bounds.loops : true;
		return true;
	}
	
	function getBounds(segment, src) {
		var bounds = {};
		for (var prop in src) {
			bounds[prop] = src[prop];
		}
		var content = segment.content;
		var usePos = bounds.usePos && bounds.startPos < content.length;
		if (usePos) {
			bounds.start = "";
			bounds.loops = false;
		}
		bounds.bStart = usePos ? bounds.startPos : bounds.start.length > 0 ? content.indexOf(bounds.start) : 0;
		var useLength = bounds.useLength && bounds.length > 0 && bounds.bStart + bounds.length < content.length;
		if (useLength) {
			bounds.end = "";
		}
		bounds.bEnd = useLength ? bounds.bStart + bounds.length : bounds.end.length > 0 ?
				content.indexOf(bounds.end, bounds.bStart + bounds.start.length) + 1 : content.length;
		if (!bounds.after) {
			bounds.start = "";
		}
		if (!bounds.before) {
			bounds.end = "";
		}
		return bounds;
	}
	
	return {
		/* jshint maxcomplexity: 16 */
		handleSubcontents: function (segments, args, subs, origContent, locale) { // jshint unused: false
			if (!subs.content || typeof(subs.content) !== "string" || subs.content.length === 0) {
				return segments;
			}
			var sLoops = true;
			if (typeof(subs.loops) !== "undefined") {
				sLoops = !!subs.loops;
			}
			for (var j = 0; true; j++) {
				if (j >= segments.length) {
					break;
				}
				if (segments[j].isParsed || segments.keep || segments[j].isSeparator) {
					continue;
				}
				var content = segments[j].content;
				var start = content.indexOf(subs.content);
				if (start < 0) {
					continue;
				}
				var end;
				var length = 0;
				if (subs.continued) {
					do {
						length++;
						end = content.indexOf(subs.content, start + length * subs.content.length);
					} while (end === 0);
				} else {
					length = 1;
				}
				end = start + length * subs.content.length;
				segments.splice(j, 1);
				if (start > 0) {
					segments.splice(j, 0, new TextSegment({
						content: content.substring(0, start),
						keep: true
					}));
					j++;
				}
				segments.splice(j, 0, new TextSegment({
					content: content.substring(start, end),
					textDirection: subs.subDir
				}));
				if (end < content.length) {
					segments.splice(j + 1, 0, new TextSegment({
						content: content.substring(end, content.length),
						keep: true
					}));
				}
				if (!sLoops) {
					break;
				}
			}
		},
		
		/* jshint maxcomplexity: 17 */
		handleBounds: function (segments, args, aBounds, origContent, locale) { // jshint unused: false
			for (var i = 0; i < aBounds.length; i++) {
				if (!initBounds(aBounds[i])) {
					continue;
				}
				for (var j = 0; true; j++) {
					if (j >= segments.length) {
						break;
					}
					if (segments[j].isParsed || segments[j].inBounds || segments.keep || segments[j].isSeparator) {
						continue;
					}
					var bounds = getBounds(segments[j], aBounds[i]);
					var start = bounds.bStart;
					var end = bounds.bEnd;
					if (start < 0 || end < 0) {
						continue;
					}
					var content = segments[j].content;
					
					segments.splice(j, 1);
					if (start > 0) {
						segments.splice(j, 0, new TextSegment({
							content: content.substring(0, start),
							keep: true
						}));
						j++;
					}
					if (bounds.start) {
						segments.splice(j, 0, new TextSegment({
							content: bounds.start,
							isSeparator: true
						}));
						j++;
					}
					segments.splice(j, 0, new TextSegment({
						content: content.substring(start + bounds.start.length, end - bounds.end.length),
						textDirection: bounds.subDir,
						inBounds: true
					}));
					if (bounds.end) {
						j++;
						segments.splice(j, 0, new TextSegment({
							content: bounds.end,
							isSeparator: true
						}));
					}
					if (end + bounds.end.length < content.length) {
						segments.splice(j + 1, 0, new TextSegment({
							content: content.substring(end + bounds.end.length, content.length),
							keep: true
						}));
					}
					if (!bounds.loops) {
						break;
					}
				}
			}
			for (i = 0; i < segments.length; i++) {
				segments[i].inBounds = false;
			}
			return segments;
		},
			
		handleCases: function (segments, args, cases, origContent, locale) { //jshint unused: false
			if (cases.length === 0) {
				return segments;
			}
			var hArgs = {};
			for (var prop in args) {
				hArgs[prop] = args[prop];
			}
			for (var i =  0; i < cases.length; i++) {
				if (!cases[i].handler || typeof(cases[i].handler.handle) !== "function") {
					cases[i].handler = args.commonHandler;
				}
				if (cases[i].args) {
					hArgs.cases = cases[i].args.cases;
					hArgs.points = cases[i].args.points;
					hArgs.bounds = cases[i].args.bounds;
					hArgs.subs = cases[i].args.subs;
				} else {
					hArgs.cases = [];
					hArgs.points = [];
					hArgs.bounds = [];
					hArgs.subs = {};
				}
				cases[i].handler.handle(origContent, segments, hArgs, locale);
			}
			return segments;
		},

		/* jshint maxcomplexity: 12 */
		handlePoints: function (segments, args, points, origContent, locale) { //jshint unused: false
			for (var i = 0; i < points.length; i++) {
				for (var j = 0; true; j++) {
					if (j >= segments.length) {
						break;
					}
					if (segments[j].isParsed || segments[j].keep || segments[j].isSeparator) {
						continue;
					}
					var content = segments[j].content;
					var pos = content.indexOf(points[i]);
					if (pos >= 0) {
						segments.splice(j, 1);
						if (pos > 0) {
							segments.splice(j, 0, new TextSegment({
								content: content.substring(0, pos),
								textDirection: args.subDir
							}));
							j++;
						}
						segments.splice(j, 0, new TextSegment({
							content: points[i],
							isSeparator: true
						}));
						if (pos + points[i].length + 1 < content.length) {
							segments.splice(j + 1, 0, new TextSegment({
								content: content.substring(pos + points[i].length),
								textDirection: args.subDir
							}));
						}
					}
				}
			}
			for (i = 0; i < segments.length; i++) {
				if (segments[i].keep) {
					segments[i].keep = false;
				} else {
					segments[i].isParsed = true;
				}
			}
			return segments;
		}
	};
});
