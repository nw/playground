var boot = require('./boot')
  , server = require('express')()
  , app = boot(server);


module.exports = app;

if (!module.parent) {

  process.addListener('uncaughtException', function(err){
    console.error('Uncaught exception!');
    console.error(err.stack || err);
  });

  app.listen(app.set('port'), function(){
    console.error('\x1b[32mHaxby\x1b[0m running on http://%s:%d',
      this.address().address,
      this.address().port);
  });

}