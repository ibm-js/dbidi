define(["./internal/stext", "./handlers/common"], function (stext, handler) {

	return {
		format: function (text, args, isRtl, isHtml, locale) {

			return stext.displayStructure(text,
				{
					guiDir: isRtl ? "rtl" : "ltr",
					dir: "ltr",
					points: "\t!#%&()*+,-./:;<=>?|[]{}",
					cases: [{
						handler: handler,
						args: {
							bounds: [{
								startAfter: "/*",
								endBefore: "*/"
							},
							{
								startAfter: "--",
								end: "\n"
							},
							{
								startAfter: "--"
							}
							]
						}
					},
					{
						handler: handler,
						args: {
							subs: {
								content: " ",
								continued: true
							}
						}
					},
					{
						handler: handler,
						args: {
							bounds: [{
								startAfter: "'",
								endBefore: "'"
							},
							{
								startAfter: "\"",
								endBefore: "\""
							}
							]
						}
					}
					]
				},
				!!isHtml, locale);
		}
	};
});
