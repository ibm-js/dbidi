define([
	"dcl/dcl",
	"decor/Stateful",
], function (dcl, Stateful) {
	var TextSegment = dcl(Stateful, {
			content: "",
			actual: "",
			textDirection: "",
			isVisible: true,
			isSeparator: false,
			isParsed: false,
			keep: false,
			inBounds: false,
			newlyCreated: false
		}
	);
    return TextSegment;
});