define([
	"intern!object",
	"intern/chai!assert",
	"../TextLayoutEngine"
], function (registerSuite, assert, TextLayoutEngine) {
	var engine = new TextLayoutEngine();
	registerSuite({
		name: "Test Text Layout Engine source-to-target and target-to-source maps",
		"(1) implicit ltr -> visual ltr" : function () {
				var result = engine.bidiTransform(txt1, "ILYNN", "VLNNN");
				assert.equal(engine.sourceToTarget.length, result.length, lengthErr);
				assert.equal(engine.targetToSource.length, txt1.length, lengthErr);
				engine.sourceToTarget.forEach(function (val, ind) {
					assert.equal(txt1.charAt(val), result.charAt(ind), contErr);
				});
				engine.targetToSource.forEach(function (val, ind) {
					assert.equal(txt1.charAt(ind), result.charAt(val), contErr);
				});
			},
		"(2) implicit ltr -> visual rtl" : function () {
			var result = engine.bidiTransform(txt1, "ILYNN", "VRNNN");
			assert.equal(engine.sourceToTarget.length, result.length, lengthErr);
			assert.equal(engine.targetToSource.length, txt1.length, lengthErr);
			engine.sourceToTarget.forEach(function (val, ind) {
				assert.equal(txt1.charAt(val), result.charAt(ind), contErr);
			});
			engine.targetToSource.forEach(function (val, ind) {
				assert.equal(txt1.charAt(ind), result.charAt(val), contErr);
			});
		},
		"(3) implicit rtl -> visual ltr" : function () {
			var result = engine.bidiTransform(txt1, "IRYNN", "VLNNN");
			assert.equal(engine.sourceToTarget.length, result.length, lengthErr);
			assert.equal(engine.targetToSource.length, txt1.length, lengthErr);
			engine.sourceToTarget.forEach(function (val, ind) {
				assert.equal(txt1.charAt(val), result.charAt(ind), contErr);
			});
			engine.targetToSource.forEach(function (val, ind) {
				assert.equal(txt1.charAt(ind), result.charAt(val), contErr);
			});
		},
		"(4) implicit rtl -> visual rtl" : function () {
			var result = engine.bidiTransform(txt1, "ILYNN", "VRNNN");
			assert.equal(engine.sourceToTarget.length, result.length, lengthErr);
			assert.equal(engine.targetToSource.length, txt1.length, lengthErr);
			engine.sourceToTarget.forEach(function (val, ind) {
				assert.equal(txt1.charAt(val), result.charAt(ind), contErr);
			});
			engine.targetToSource.forEach(function (val, ind) {
				assert.equal(txt1.charAt(ind), result.charAt(val), contErr);
			});
		},
	});

	var txt1 = "\u05d0\u05d1\u05d2 123 ABC 456.";
	var lengthErr = "Wrong length of the map";
	var contErr = "Wrong content of the map";
});