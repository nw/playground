var express = require('express')
  , config = require('./config')
  , error_handlers = require('./error-handlers')
  , errorhandler = require('errorhandler')
  , routes = require('../routes');

module.exports = function boot(app){
  
  config(app);
  
  // helpers
  app.locals.app = app;
  
  routes(app);
  
  error_handlers(app);
  
  app.use(errorhandler({
    dumpExceptions: app.enabled('debug')
  , showStack: app.enabled('debug')
  }))
  
  
  return app;
  
}