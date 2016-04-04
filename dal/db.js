var MongoClient = require('mongodb').MongoClient;
var Logger = require('../utils/logger').Logger;
var ApplicationModes = require("../utils/config").ApplicationModes;
var ApplicationConfig = require("../utils/config").ApplicationConfig;
var appConfig = new ApplicationConfig();
var logger = new Logger();
var appModes = new ApplicationModes();

function DataAccess(){
	this.GetIngredients = function GetIngredients(query, successCallback, errorCallback){
    logger.log("DataAccess.GetIngredients", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      if (err){
        errorCallback(err);
      }
      if (db == null) {
        errorCallback("DB is null"); 
      }
      // Get the first db and do an update document on it
      var collection = db.collection("ingredients");
      var cursor = collection.find(query).limit(5);
			cursor.toArray(OnSuccess);
			function OnSuccess(err, docs){
				if (err){
          logger.log("DataAccess.GetIngredients.ingredients.Find.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("DataAccess.GetIngredients.ingredients.Find.Success", appModes.DEBUG);
          var result = [];
          for (var i = 0; i < docs.length; i++){
            result.push(docs[i].name);
          }
          successCallback(result);
        }
			}
    });
  };
  this.GetRecipes = function GetRecipes(params, successCallback, errorCallback){
    logger.log("DataAccess.GetRecipes", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      if (err){
        errorCallback(err);
      }
      if (db == null) {
        errorCallback("DB is null"); 
      }
      // Get the first db and do an update document on it
      var collection = db.collection("recipes");
      var cursor = collection.find(params.query, {_id: 1, title: 1, meta: 1, ingredient_info : 1}).skip(params.skip).limit(5);
      cursor.toArray(OnSuccess);
      function OnSuccess(err, docs){
        if (err){
          logger.log("DataAccess.GetRecipes.recipes.Find.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("DataAccess.GetRecipes.recipes.Find.Success", appModes.DEBUG);
          successCallback(docs);
        }
      }
    });
  };
  this.GetRecipe = function GetRecipe(query, successCallback, errorCallback){
    logger.log("DataAccess.GetRecipe", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      if (err){
        errorCallback(err);
      }
      if (db == null) {
        errorCallback("DB is null"); 
      }
      // Get the first db and do an update document on it
      var collection = db.collection("recipes");
      var cursor = collection.find(query).limit(1);
      cursor.toArray(OnSuccess);
      function OnSuccess(err, docs){
        if (err){
          logger.log("DataAccess.GetRecipe.recipe.Find.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("DataAccess.GetRecipe.recipe.Find.Success", appModes.DEBUG);
          successCallback(docs[0]);
        }
      }
    });
  };
}

module.exports.DataAccess = DataAccess;