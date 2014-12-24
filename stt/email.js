define(["./internal/stext", "./handlers/common", "../misc"], function (stext, handler, misc) {
	function getDir (text, locale) {
		if (misc.getLocaleDetails(locale).lang !== "ar") {
			return "ltr";
		}
		var ind = text.indexOf("@");
		if (ind > 0 && ind < text.length - 1) {
			return misc.hasArabicChar(text.substring(ind + 1)) ? "rtl" : "ltr";
		}
		return "ltr";
	}

	return {
		format: function (text, args, isRtl, isHtml, locale) {
			return stext.displayStructure(text,
				{
					guiDir: isRtl ? "rtl" : "ltr",
					dir: getDir(text, locale),
					points: "<>.:,;@",
					cases: [
					        	{
					        		handler: handler,
					        		args: {
					        			bounds: [
					        			         	{
					        			         		start: "\"",
					        			         		end: "\""
					        			         	},
					        			         	{
					        			         		start: "(",
					        			         		end: ")"
					        			         	}
					        			],
					        			points: ""
					        		}
					        	}
					        ]
				},
				!!isHtml, locale);
		}
	};
});
