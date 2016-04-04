var nom3Controllers = angular.module('nom3Controllers', []);

function errorFunction(){
}
nom3Controllers.controller('StaticCtrl', ['$scope', 
	function ($scope){

	}
]);

nom3Controllers.controller('RecipeCtrl', ['$scope', '$http', 'AppService', '$routeParams', 
	function($scope, $http, AppService, $routeParams) {
		$scope.Methods = {};
		$scope.Methods.GetRecipe = function(){
			AppService.GetRecipe($routeParams.id, successFunction, errorFunction);
			function successFunction(response, status){
				$scope.recipe = response.data;
				$('.materialboxed').materialbox();
			}
		}
		angular.element(document).ready(function(){
			if($routeParams.id){
				$scope.Methods.GetRecipe();
			}
		});
	}
]);
nom3Controllers.controller('HomeCtrl', ['$scope', '$http', 'AppService', //, "UserService", 
	function($scope, $http, AppService) {
		$scope.Methods = {};
		$scope.Methods.IsIngredientSearched = function(ingredient){
			var ingredients = $('#tags').val().split(',');
			for(var i = 0; i < ingredients.length; i++){
				if (ingredient.indexOf(ingredients[i]) >= 0){
					return true;
				}
			}
			return false;
		};
		$scope.Methods.ScrollToTop = function(){
			setTimeout(function() { $("html, body").animate({ scrollTop: -$(document).height() }, "slow"); }, 100 );
		}
		$scope.Methods.GetMore = function(){
			$scope.skip = $scope.skip + 5;
			$scope.Methods.Search();
		}
		$scope.Methods.Search = function(){
			if ($('#tags').val() == ""){
				$scope.recipes = [];
				$scope.skip = 0;
			}
			else{
				var ingredients = $('#tags').val().split(',');
				var query	= ""
				for(var i = 0; i < ingredients.length; i++){
					query = query + "&ingredients=" + ingredients[i]
				}
				var params = {query : query.substring(1), skip : $scope.skip }
				function successFunction(response, status){
					if (response.data.length == 0){
						$scope.skip == 0;
						$scope.showMoreBtn = false;
						return;
					}
					else{
						$scope.showMoreBtn = true;
					}
					if ($scope.skip){
						$scope.recipes = $scope.recipes.concat(response.data);
						setTimeout(function() { $("html, body").animate({ scrollTop: $(document).height() }, "slow"); }, 100 );
					}
					else 
						$scope.recipes = response.data;
				}
				AppService.GetRecipes(params, successFunction, errorFunction);
			}
		}
		function Search(skip){
			var scope = angular.element($("#tags")).scope();
		    scope.$apply(function(){
		    		if (skip !== undefined){
		    			$scope.skip = skip;
		    		}
		        scope.Methods.Search();
		    });
		}
		angular.element(document).ready(function(){
			$('#tags').on('itemAdded', function(event){
				Search(0);
			})
			$('#tags').on('itemRemoved', function(event){
				Search(0);
			})
			$('#tags').materialtags({
				tagClass: 'chip blue-text'
			});
		});
	}
]);