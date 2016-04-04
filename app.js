"use strict";

var express = require('express'),
    app = express(),
    cons = require('consolidate');

var bodyParser = require('body-parser');
var Api = require('./api');

var Logger = require('./utils/logger').Logger;
var ApplicationModes = require("./utils/config").ApplicationModes;

var logger = new Logger();
var appModes = new ApplicationModes();

/* Express Initialize */
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.use(bodyParser.json());
console.log("PWD: " + process.env.PWD)
app.use(express.static(process.env.PWD + '/public'));

Api(app);
var port = process.env.PORT;
if (!port) port = 8080;

app.listen(port);
logger.log('Express server started on port ' + port, appModes.PROD);