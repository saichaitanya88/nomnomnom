var API = require('./api').API;
var ErrorHandler = require('./errors').errorHandler;
var Logger = require('../utils/logger').Logger;
var ApplicationModes = require("../utils/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();

module.exports = exports = function(app) {
  // var accountsAPI = new AccountsAPI();
  // var customObjectsAPI = new CustomObjectsAPI();
  var api = new API();

  // Actions API 1
  app.get('/', api.GetHomePage);
  app.get('/api/ingredients', api.GetIngredients);
  app.get('/api/recipes', api.GetRecipes);
  app.get('/api/recipe/:id', api.GetRecipe);
  
  app.all('*', function(req, res){
    logger.log("LoggingError".toUpperCase(), appModes.DEBUG)
    res.status(404).send('Unable to process request');
    ErrorHandler({message: '404: Unable to process request', stack: null}, req, res, null, false)
  });

  // Error handling middleware
  app.use(ErrorHandler);
}