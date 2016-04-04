var nom3Services = angular.module('nom3Services', ['ngResource']);

nom3Services.factory('AppService', function($http) {
	var GetIngredients = function (query, successFunction, errorFunction){
		$http.get("/api/ingredients" + query).then(successFunction, errorFunction);
	}
	var GetRecipes = function (params, successFunction, errorFunction){
		$http.get("/api/recipes?" + params.query + "&skip=" + params.skip).then(successFunction, errorFunction);
	}
	var GetRecipe = function (query, successFunction, errorFunction){
		$http.get("/api/recipe/" + query).then(successFunction, errorFunction);
	}
  return { GetIngredients : GetIngredients, GetRecipes: GetRecipes, GetRecipe: GetRecipe };
});