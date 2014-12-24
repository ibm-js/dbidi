define(["./internal/stext"], function (stext) {
	
	return {
		format: function (text, args, isRtl, isHtml, locale) {
			var hArgs = {};
			for (var prop in args) {
				hArgs[prop] = args[prop];
			}
			hArgs.guiDir = isRtl ? "rtl" : "ltr";
			hArgs.dir = args.dir ? args.dir : hArgs.guiDir;
			return stext.displayStructure(text, hArgs, !!isHtml, locale);
		}
	};
});
