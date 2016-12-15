var app = angular.module('coala', []);

app.controller('SnippetController', function(){
	
	self = this
	self.languages = Object.keys(snippets)
	self.current_snippet = ""
	self.setLang = function (language) {
		self.current_snippet = snippets[language]
	}
	$(document).ready(function(){
			$('select').material_select();
	})
})