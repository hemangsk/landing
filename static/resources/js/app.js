(function(){
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

	app.controller('TabController', function () {
		this.tab = 1
		this.setTab = function (stab) {
			this.tab = stab
		}
		this.isSet = function (stab) {
			return this.tab == stab
		}
	})

	app.directive('home', function () {
		return {
			restrict: 'E',
			templateUrl: '/partials/tabs/home.html'
		}
	})

	app.directive('getinvolved', function () {
		return {
			restrict: 'E',
			templateUrl: '/partials/tabs/getinvolved.html'
		}
	})

	app.directive('languages', function () {
		return {
			restrict: 'E',
			templateUrl: '/partials/tabs/languages.html'
		}
	})

})();