define(["./internal/stext", "./handlers/common"], function (stext, handler) {

	return {
		format: function (text, args, isRtl, isHtml, locale) {

			return stext.displayStructure(text,
				{
					guiDir: isRtl ? "rtl" : "ltr",
					dir: "ltr",
					points: "\t!#%&()*+,-./:;<=>?|[]{}",
					cases: [
					        	{
					        		handler: handler,
					        		args: {
					        			bounds: [
					        			         	{
					        			         		start: "/*",
					        			         		end: "*/"
					        			         	},
					        			         	{
					        			         		start: "--",
					        			         		end: "\n"
					        			         	},
					        			         	{
					        			         		start: "--"
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
					        			bounds: [
					        			         {
					        			        	 start: "'",
					        			        	 end: "'"
					        			         },
					        			         {
					        			        	 start: "\"",
					        			        	 end: "\""
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
