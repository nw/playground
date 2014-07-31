var store = require('json-store')
  , stores = {};

module.exports = function(app){
  
  app.get('/', function(req, res){
    res.render('default.html')
  });
  
  app.get('/jade', function(req, res){
    res.render('md.jade');
  });
  
  app.get('/markdown', function(req, res){
    res.render('default.md', {
      filename: __dirname + '/../views/default.md'
    })
  });
  
  
  app.post('/form/:name', function(req, res){
    var db = getStore(req.params.name);
    db.set(Date.now(), req.body);
    res.send({ok: true});
  });
  
  
  function getStore(name){
    if(!stores[name]) stores[name] = store(app.set('root') + '/data/' + name + '.json');
    return stores[name];
  }
}
