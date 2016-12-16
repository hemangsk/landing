(function(){
	var app = angular.module('coala', ['ngStorage']);

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

	app.directive('languages',  ['$http', function ($http) {
		return {
			restrict: 'E',
			templateUrl: '/partials/tabs/languages.html',
			controller: function ($scope, $sessionStorage) {
				self = this
				$scope.$storage = $sessionStorage
				self.bearList = []
				if($scope.$storage.bear_data){			
					self.bearList = ($scope.$storage.bear_data)		
				}else{
					$http.get('http://localhost:5000/api/list/bears')
					.then(function(data){
						arr = []
						angular.forEach(Object.keys(data["data"]), function(value, key){
							arr.push({
								"name" : value,
								"desc" : data["data"][value]["desc"],
								"languages": data["data"][value]["languages"]
							})		
						})
						self.bearList = arr 
						$scope.$storage.bear_data = arr
					})
				}
			},
			controllerAs: 'lc'
		}
	}])

	app.filter('format_desc', function () {
        return function (value) {
            if (!value) return '';
            var lastspace = value.indexOf('.');
            if (lastspace != -1) {
                if (value.charAt(lastspace-1) == ',') {
                	lastspace = lastspace - 1;
                }
                  value = value.substr(0, lastspace);
            }

            return value;
        };
    });

	

})();