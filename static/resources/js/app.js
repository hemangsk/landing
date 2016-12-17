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

	app.directive('languages',  ['$http',  '$timeout' ,function ($http, $timeout) {
		return {
			restrict: 'E',
			templateUrl: '/partials/tabs/languages.html',
			controller: function ($scope, $sessionStorage) {

				
				self = this
				$scope.$storage = $sessionStorage
				self.bearList = []
				self.theatreLoader = null;
				self.theatreLoaderMessages = [
					"Waking up little joeys",
					"Dodging the bushfires",
					"Gulping the eucalypt"
				]
				

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

				self.showTheatre = function (bear_index) {	
					$(document).ready(function () {
						$('#modal1').modal('open');
					})
					self.theatreLoader = true;		

					self.setCurrentBear(bear_index);
					self.fetchBearData();


				}

				self.setCurrentBear = function (bear_selected) {
					self.currentBearName = bear_selected["name"]
					self.currentBearDescription = bear_selected["desc"]	
				}

				self.fetchBearData = function () {
					
					self.theatreLoaderMessage = self.theatreLoaderMessages[0]
					var changeMessagePromise1 = $timeout(function () {
						self.theatreLoaderMessage = self.theatreLoaderMessages[1]
					}, 3000)

					var changeMessagePromise2 = $timeout(function () {
						self.theatreLoaderMessage = self.theatreLoaderMessages[2]
					}, 6000)

					$http.get('http://localhost:5000/api/search/bears?bear=' + self.currentBearName)
					.then(function (data) {
						console.log(data["data"])
						self.currentBear = data["data"];
						console.log("SELF BEAR");
						console.log(self.currentBear);
						self.theatreLoader = null;

						try{
							cancel(changeMessagePromise1);
							cancel(changeMessagePromise2);
						}catch(err){
							console.log("IGNORE: Unsuccessfull attempt to cancel promise!");
						}

						self.theatreLoaderMessage = "";
						
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