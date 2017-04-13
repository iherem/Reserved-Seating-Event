const Hapi = require('hapi');
const setHeader = require('hapi-set-header');
const mongojs = require('mongojs');
// Create a server with a host and port
const server = new Hapi.Server();  

server.connection({  
    host: '0.0.0.0',
    port: 3000
});
setHeader(server, 'Access-Control-Allow-Origin', '*')
setHeader(server, 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
setHeader(server, 'Access-Control-Allow-Headers', 'X-Requested-With,content-type')
setHeader(server, 'Access-Control-Allow-Credentials', true)
const dbconfig = require('./config/config.json');
server.app.db = mongojs('mongodb://'+dbconfig.db.user+":"+dbconfig.db.pass+"@"+dbconfig.db.hostname+":"+dbconfig.db.port+"/"+dbconfig.db.dbname+dbconfig.db.option, [dbconfig.db.collection]);
//Load plugins and start server
server.register([  
  require('./routes/events')
], (err) => {

  if (err) {
    throw err;
  }

  // Start the server
  server.start((err) => {
    console.log('Server running at:', server.info.uri);
  });

});
