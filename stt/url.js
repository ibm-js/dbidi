define(["./internal/stext"], function (stext) {

	return {
		format: function (text, args, isRtl, isHtml, locale) {
			//text = stext.restore(text, !!isHtml);
			return stext.displayStructure(text,
				{
					guiDir: isRtl ? "rtl" : "ltr",
					dir: "ltr",
					points: ":?#/@.[]="
				},
				!!isHtml, locale);		
		}
	};
});
