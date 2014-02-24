define([
	"intern!object",
	"intern/chai!assert",
	"../string/BidiEngine"
], function (registerSuite, assert, BidiEngine) {
	var engine = new BidiEngine();
	var TEXT = "1111";
	var errorMessage = "dbidi.string.BidiEngine: the bidi layout string is wrong!";
	var noErrorMessage = "Didn't threw error!!!";
	var chars = "ABCDEFGIJKLMNOPQRSTUVWXYZ";
	var c, compMessage, i, uVar;
	registerSuite({
		name: "Test Bidi Engine parameters",
		"(1) missing text to reorder" : function () {
			assert.equal("", engine.bidiTransform(uVar, "ILYNN", "VLNNN"), "Text is undefined");
			assert.equal("", engine.bidiTransform("", "ILYNN", "VLNNN"), "Text is empty");
		},
		"(2) missing both layout strings" : function () {
			assert.equal(TEXT, engine.bidiTransform(TEXT), "Both layout strings are undefined");
			assert.equal(TEXT, engine.bidiTransform(TEXT, "", ""), "Both layout strings are empty");
		},
		"(3) missing one layout string" : function () {
			try {
				assert.equal(TEXT, engine.bidiTransform(TEXT, uVar, "VLNNN"));
				throw new Error(noErrorMessage);
			} catch (e) {
				assert.equal(errorMessage, e.message, "Input layout string is undefined.");
			}
			try {
				assert.equal(TEXT, engine.bidiTransform(TEXT, "", "VLNNN"));
				throw new Error(noErrorMessage);
			} catch (e) {
				assert.equal(errorMessage, e.message, "Input layout is empty.");
			}
			try {
				assert.equal(TEXT, engine.bidiTransform(TEXT, "ILYNN", uVar));
				throw new Error(noErrorMessage);
			} catch (e) {
				assert.equal(errorMessage, e.message, "Output layout string is undefined.");
			}
			try {
				assert.equal(TEXT, engine.bidiTransform(TEXT, "ILYNN", ""));
				throw new Error(noErrorMessage);
			} catch (e) {
				assert.equal(errorMessage, e.message, "Output layout is empty.");
			}
		},
		"(4) ordering scheme in the layout strings" : function () {
			for (i = 0; i < chars.length; i++) {
				c = chars.charAt(i);
				if (c === "V" || c === "I") {
					compMessage = noErrorMessage;
				} else  {
					compMessage = errorMessage;
				}
				try {
					assert.equal(TEXT, engine.bidiTransform(TEXT, c + "LNNN", "VLNNN"), "Check ordering scheme");
					throw new Error(noErrorMessage);
				} catch (e) {
					assert.equal(compMessage, e.message, "Ordering scheme in the input layout string.");
				}
				try {
					assert.equal(TEXT, engine.bidiTransform(TEXT, "ILNNN", c + "LNNN"), "Check ordering scheme");
					throw new Error(noErrorMessage);
				} catch (e) {
					assert.equal(compMessage, e.message, "Ordering scheme in the output layout string.");
				}
			}
		},
		"(5) text direction in the layout strings" : function () {
			for (i = 0; i < chars.length; i++) {
				c = chars.charAt(i);
				if (c === "L" || c === "R" || c === "C" || c === "D") {
					compMessage = noErrorMessage;
				} else {
					compMessage = errorMessage;
				}
				try {
					assert.equal(TEXT, engine.bidiTransform(TEXT, "I" + c + "NNN", "VLNNN"), "Check text direction");
					throw new Error(noErrorMessage);
				} catch (e) {
					assert.equal(compMessage, e.message, "Text direction in the input layout string.");
				}
				try {
					assert.equal(TEXT, engine.bidiTransform(TEXT, "ILNNN", "V" + c + "NNN"), "Check text direction");
					throw new Error(noErrorMessage);
				} catch (e) {
					assert.equal(compMessage, e.message, "Text direction in the output layout string.");
				}
			}
		},
		"(6) sym.swapping in the layout strings" : function () {
			for (i = 0; i < chars.length; i++) {
				c = chars.charAt(i);
				if (c === "Y" || c === "N") {
					compMessage = noErrorMessage;
				} else {
					compMessage = errorMessage;
				}
				try {
					assert.equal(TEXT, engine.bidiTransform(TEXT, "IL" + c + "NN", "VLNNN"), "Check sym. swapping");
					throw new Error(noErrorMessage);
				} catch (e) {
					assert.equal(compMessage, e.message, "Sym. swapping in the input layout string.");
				}
				try {
					assert.equal(TEXT, engine.bidiTransform(TEXT, "ILYNN", "VL" + c + "NN"), "Check sym. swapping");
					throw new Error(noErrorMessage);
				} catch (e) {
					assert.equal(compMessage, e.message, "Sym. swapping in the output layout string.");
				}
			}
		},
		"(7) shaping in the layout strings" : function () {
			for (i = 0; i < chars.length; i++) {
				c = chars.charAt(i);
				if (c === "S" || c === "N") {
					compMessage = noErrorMessage;
				} else {
					compMessage = errorMessage;
				}
				try {
					assert.equal(TEXT, engine.bidiTransform(TEXT, "ILY" + c + "N", "VLNNN"), "Check shaping");
					throw new Error(noErrorMessage);
				} catch (e) {
					assert.equal(compMessage, e.message, "Shaping in the input layout string.");
				}
				try {
					assert.equal(TEXT, engine.bidiTransform(TEXT, "ILYNN", "VLN" + c + "N"), "Check shaping");
					throw new Error(noErrorMessage);
				} catch (e) {
					assert.equal(compMessage, e.message, "Shaping in the output layout string.");
				}
			}
		},
		"(8) num.shaping in the layout string" : function () {
			for (i = 0; i < chars.length; i++) {
				c = chars.charAt(i);
				if (c === "N") {
					compMessage = noErrorMessage;
				} else {
					compMessage = errorMessage;
				}
				try {
					assert.equal(TEXT, engine.bidiTransform(TEXT, "ILYN" + c, "VLNNN"), "Check num. shaping");
					throw new Error(noErrorMessage);
				} catch (e) {
					assert.equal(compMessage, e.message, "Num. shaping in the input layout string.");
				}
				try {
					assert.equal(TEXT, engine.bidiTransform(TEXT, "ILYNN", "VLNN" + c), "Check num. shaping");
					throw new Error(noErrorMessage);
				} catch (e) {
					assert.equal(compMessage, e.message, "Num. shaping in the output layout string.");
				}
			}
		}
	});
});
