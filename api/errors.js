// Error handling middleware
var ErrorsDataAccess = require("../dal/errors").ErrorsDataAccess;
var util = require("util");
var ObjectId = require('mongodb').ObjectId;
var Logger = require('../utils/logger').Logger;
var ApplicationModes = require("../utils/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();

exports.errorHandler = function(err, req, res, next, returnResponse) {
  "use strict";
  var errorsDataAccess = new ErrorsDataAccess();
  var errorObj = new Object();
  errorObj.message = err.message;
  errorObj.stack = err.stack;
  var reqObj = GetRequestObject(req);
  errorObj.req = reqObj;
  errorObj.createdAt = new Date();
  console.error(err.message);
  console.error(err.stack);
  
  
  //var dbErrorObj = JSON.stringify(util.inspect({_id : new ObjectId(), error: errorObj}));
  //res.status(500).send(util.inspect(req.res));
  logger.log("WARNING: Not logging in the database");
  errorsDataAccess.LogError(errorObj, ErrorResponse, ErrorResponse);

  function ErrorResponse(){
    if (returnResponse != false)
  	 res.status(500).send(errorObj);
	}
  function GetRequestObject(req){
  	var reqObj = new Object();
  	reqObj.httpVersion = req.httpVersion;
  	reqObj.complete = req.complete;
  	reqObj.headers = req.headers;
  	reqObj.url = req.url;
  	reqObj.method = req.method;
  	reqObj.baseUrl = req.baseUrl;
  	reqObj.originalUrl = req.originalUrl;
  	reqObj._parsedUrl = req._parsedUrl;
  	reqObj.params = req.params;
  	reqObj.query = req.query;
  	return reqObj;
  }
}