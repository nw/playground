
/*!
 * error handlers
 */

/**
 * Module dependencies.
 */

var errors = require('../lib/errors');
var dependancies = require('../package.json');

module.exports = function(app){
  /**
   * 404 Not Found
   */
   
  app.all('*', function(req, res, next){
    return next(new errors.NotFound);
  });

  app.use(function(err, req, res, next){
    if (!app.set('error templates') || !(err instanceof errors.NotFound))
      return next(err);

    if (req.xhr){
      res.send(404);
    } else {
      res.render('error.jade', {
          layout: false
        , status: 404
        , title: 'Not Found'
        , text: 'Sorry, page not found. Please try back another time'
        , process: process
        , err: err
        , dependancies: dependancies
        }, function(err, str){
          if (err) return req.next(err);
          res.status(404).send(str);
        });
    }
  });

  /**
   * 401 Unauthorized
   */

  app.use(function(err, req, res, next){
    if (!app.set('error templates') || !(err instanceof errors.Unauthorized))
      return next(err);

    if (req.xhr){
      res.send(401);
    } else {
      res.render('error.jade', {
          layout: false
        , status: 401
        , title: 'Unauthorized'
        , text: 'You don\'t have permission to access this page'
        , process: process
        , err: err
        , dependancies: dependancies
        }, function(err, str){
          if (err) return req.next(err);
          res.status(401).send(str);
        });
    }
  });

  /**
   * 500 Internal Server Error
   */

  app.use(function(err, req, res, next){      
    if (!app.set('error templates')) return next(err);

    if (req.xhr){
      res.send(500);
    } else {
      res.render('error.jade', {
          layout: false
        , status: 500
        , title: 'Internal Server Error'
        , text: 'Error in our app :(  Let us track this down'
        , process: process
        , err: err
        , dependancies: dependancies
        }, function(err, str){
          if (err) return req.next(err);
          res.status(500).send(str);
        });
    }

    console.error(err.stack || err);
  });

};

