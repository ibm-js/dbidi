define(["./internal/stext", "../misc"], function (stext, misc) {

	return {
		format: function (text, args, isRtl, isHtml, locale) {
			if (!isHtml) {
				text = misc.removeUcc(text);
			}
			return stext.displayStructure(text,
				{
					guiDir: isRtl ? "rtl" : "ltr",
					dir: "ltr",
					points: "/\\:."
				},
				!!isHtml, locale);
		}
	};
});
