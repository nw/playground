var express = require('express')
  , path = require('path')
  , stylus = require('stylus')
  , morgan = require('morgan')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , responseTime = require('response-time')
  , markedejs = require('markedejs')
  , ejs = require('ejs')
  , jade = require('jade')
  , sass = require('node-sass')
  , stylus = require('stylus')
  , nib = require('nib');
  
  
module.exports = function config(app){
  
  app
    .use(morgan('dev')) // logging
    .enable('dev')
    .enable('debug')
    .disable('compress')
    .set('machine name', 'dev')
    .set('port', 7777)
    .set('root', path.normalize(__dirname + '/../'))
    // views
    .set('views', __dirname + '/../views')
    .set('view options', {layout: false})
    .engine('.html', ejs.__express)
    .engine('.md', markedejs.__express)
    .engine('.jade', jade.__express)
    .set('view engine', 'html')
    .set('default language', 'en_US')
    .set('error templates', true)
    
    .use(responseTime(3)) // X-Response-Time 3 digit resolutions
    .use(cookieParser()) // parse cookies
    
    .use(session({
        name: 'playground'
      , secret: 'gjfh2@#*USDSlhjqwe0wqeiuf0w3hQ@!0fdkfj'
      , resave: true
      , saveUninitialized: true
      , cookie: {
          maxAge: 8*60*60*1000
        } // 8 hours
    }))
    
    .use(bodyParser.urlencoded({extended: true})) // parse application/x-www-form-urlencoded
    .use(bodyParser.json()) // parse application/json
    
    
    .use(sass.middleware({
      debug: app.enabled('debug')
    , outputStyle: (app.enabled('compressed')) ? 'compressed' : 'expanded'
    , src: app.set('root') + '/views'
    , dest: app.set('root') + '/public'
    , prefix: '/sass'
    }))
    
    .use(stylus.middleware({
        force: app.enabled('debug')
      , debug: app.enabled('debug')
      , compress: app.enabled('compress')
      , src: app.set('root') + '/views'
      , dest: app.set('root') + '/public'
      , compile: function(str, path) {
          return stylus(str)
            .set('filename', path)
            .set('paths', ['/styl'])
            .define('url', stylus.url({ paths: [app.set('root')  + '/public']}))
            .use(nib());
      }}))

    .use(express.static(__dirname + '/../public')) // public static resources
    
    .use(function(req, res, next){
      if(req.query.debug) console.log(req.headers);
      next();
    });
  
};