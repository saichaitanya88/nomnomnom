var Logger = require('../utils/logger').Logger;
var ApplicationModes = require("../utils/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();
var ObjectId = require('mongodb').ObjectId;
var DataAccess = require("../dal/db").DataAccess;

function API () {
  "use strict";
  var dataAccess = new DataAccess();

  this.GetHomePage = function GetHomePage(req,res){
    logger.log("API.GetHomePage", appModes.DEBUG);
    res.sendfile('public/ui/index.html');
  };
  this.GetIngredients = function GetHomePage(req,res){
    logger.log("API.GetIngredients", appModes.DEBUG);
    var query = {name : {'$regex' : '^'+ req.query.name, '$options' : 'i'}};
    dataAccess.GetIngredients(query, GetIngredientsSuccess, GetIngredientsFailed);
    function GetIngredientsSuccess(data){
      logger.log("API.GetIngredients.Success", appModes.DEBUG);
      res.status(200).send(data);  
    }
    function GetIngredientsFailed(error){
      logger.log("API.GetIngredients.Failed", appModes.DEBUG);
      res.status(500).send(error);  
    }
  };
  this.GetRecipes = function GetHomePage(req,res){
    logger.log("API.GetRecipes", appModes.DEBUG);
    var ingredients = [];
    if (Array.isArray(req.query.ingredients)){
      for(var i = 0; i < req.query.ingredients.length; i++){
        ingredients.push(new RegExp('.*'+req.query.ingredients[i]+'.*'))
      }
    }
    else{
      ingredients = [new RegExp('.*'+req.query.ingredients+'.*')]
    }
    var query = {"ingredient_info.ingredients": { $all : ingredients }};
    var skip = 0;
    if (!isNaN(req.query.skip)){
      skip = parseInt(req.query.skip);
    }
    var params = { query : query, skip : skip }
    dataAccess.GetRecipes(params, GetRecipesSuccess, GetRecipesFailed);
    function GetRecipesSuccess(data){
      logger.log("API.GetRecipes.Success", appModes.DEBUG);
      res.status(200).send(data);  
    }
    function GetRecipesFailed(error){
      logger.log("API.GetRecipes.Failed", appModes.DEBUG);
      res.status(500).send(error);  
    }
  };
  this.GetRecipe = function GetHomePage(req,res){
    logger.log("API.GetRecipe", appModes.DEBUG);
    var query = { _id : ObjectId(req.params.id)};
    dataAccess.GetRecipe(query, GetRecipeSuccess, GetRecipeFailed);
    function GetRecipeSuccess(data){
      logger.log("API.GetRecipe.Success", appModes.DEBUG);
      res.status(200).send(data);  
    }
    function GetRecipeFailed(error){
      logger.log("API.GetRecipe.Failed", appModes.DEBUG);
      res.status(500).send(error);  
    }
  };
}

module.exports.API = API;