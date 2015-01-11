define([
	"./stt/breadcrumb",
	"./stt/comma",
	"./stt/custom",
	"./stt/email",
	"./stt/filepath",
	"./stt/formula",
	"./stt/sql",
	"./stt/underscore",
	"./stt/url",
	"./stt/word",
	"./stt/xpath"
], function (breadcrumb, comma, custom, email, filepath, formula, sql, underscore, url, word, xpath) {

	function getHandler(type) { //jshint maxcomplexity: 15
		switch (type) {
		case "breadcrumb" :
			return breadcrumb;
		case "comma" :
			return comma;
		case "email" :
			return email;
		case "filepath" :
			return filepath;
		case "formula" :
			return formula;
		case "sql" :
			return sql;
		case "underscore" :
			return underscore;
		case "url" :
			return url;
		case "word" :
			return word;
		case "xpath" :
			return xpath;
		default:
			return custom;
		}
	}

	return {
		getString: function (text, type, args, isRtl, locale) {
			return getHandler(type).format(text, args, isRtl, false, locale);
		},

		getHtml: function (text, type, args, isRtl, locale) {
			return getHandler(type).format(text, args, isRtl, true, locale);
		}
	};
});
