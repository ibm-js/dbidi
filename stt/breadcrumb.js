define(["./internal/stext"], function (stext) {
	
	return {
		format: function (text, args, isRtl, isHtml, locale) {

			return stext.displayStructure(text,
				{
					guiDir: isRtl ? "rtl" : "ltr",
					dir: args.dir ? args.dir : isRtl ? "rtl" : "ltr",
					subs: {
						content: ">",
						continued: true,
						subDir: isRtl ? "rtl" : "ltr"
					},
					cases: [{
						args: {
							subs: {
								content: "<",
								continued: true,
								subDir: isRtl ? "ltr" : "rtl"
							}
						}
					}
					]
				},
				!!isHtml, locale);
		}
	};
});
