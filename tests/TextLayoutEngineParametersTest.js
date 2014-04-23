define([
	"intern!object",
	"intern/chai!assert",
	"../TextLayoutEngine"
], function (registerSuite, assert, TextLayoutEngine) {
	var engine = new TextLayoutEngine();
	var TEXT = "1111";
	var errorMessage = "dbidi/TextLayoutEngine: the bidi layout string is wrong!";
	var noErrorMessage = "Didn't threw error!!!";
	var chars = "ABCDEFGIJKLMNOPQRSTUVWXYZ";
	var c, compMessage, i, uVar;
	registerSuite({
		name: "Test Bidi Engine parameters",
		"(1) missing text to reorder" : function () {
			assert.equal("", engine.bidiTransform(uVar, "ILYNN", "VLNNN"), "Text is undefined");
			assert.equal("", engine.bidiTransform("", "ILYNN", "VLNNN"), "Text is empty");
		},
		"(2) undefined layout strings" : function () {
			try {
				engine.inputFormat = engine.outputFormat = uVar;
				throw new Error(noErrorMessage);
			} catch (e) {
				assert.equal(errorMessage, e.message, "Layout strings are undefined.");
			}
		},
		"(3) ordering scheme in the layout strings" : function () {
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
		"(4) text direction in the layout strings" : function () {
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
		"(5) sym.swapping in the layout strings" : function () {
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
		"(6) shaping in the layout strings" : function () {
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
		"(7) num.shaping in the layout string" : function () {
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
