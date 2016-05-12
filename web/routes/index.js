var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');//para sacar los datos de los formularios

var mysql = require('mysql');//bases de datos


//------------------Base de datos---------------

/*var connection = {
  connected: false,
  conn: {}
}

function StartBD(){

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'drogueria'
  });

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      var ans = {
        connected: false,
        conn: connection
      };
    }else{
      console.log('connected as id ' + connection.threadId);
      //consult(connection);
      connected = true;
      //return connection;
      var ans = {
        connected: true,
        conn: connection
      };
    }
    //console.log("ans : ", ans);
    return ans;
  });

}*/

function consult(connection, socket, callback){
  if(connection === undefined){
    console.error('No se ha definido la conexión ');
  }else{
    var query = connection.query('SELECT * FROM universidades',
      function(error, rows){
        if(error){
          throw error;
        }else{
          console.log(rows);
          callback(socket, rows);//siguiente función, la que lo recibe
          //connection.end();
        }
     }
    );
  }
}

function emitter(socket, ans){
  socket.emit('showData', ans);//envia los datos
}

function handleU(socket, info, connection){
  console.log("handleU");
  consult(connection, socket, emitter);
}

function handlePedidos(socket, info, connection){
  var rows = consult(connection);
}

//---------------Exportaciones-------------------------

module.exports = function(app, mountPoint){

  //connection = StartBD();

  /*----------BASES DE DATOS--------------*/

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'drogueria'
  });

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
    }else{
      console.log('connected as id ' + connection.threadId);
    }
  });

  //---------------------Enrutamientos--------------------------
  router.get('/', function(req, res, next) {
    res.render('index.ejs', { title: 'Droguería Cámbulos'});
  });

  router.get('/empleados', function(req, res, next) {
    res.render('index.ejs', { title: 'Empleados' });
  });

  router.get('/clientes', function(req, res, next) {
    res.render('index.ejs', { title: 'Clientes' });
  });

  router.get('/articulos', function(req, res, next) {
    res.render('index.ejs', { title: 'Artículos' });
  });

  router.get('/proveedores', function(req, res, next) {
    res.render('index.ejs', { title: 'Proveedores' });
  });

  router.get('/medicamentos', function(req, res, next) {
    res.render('index.ejs', { title: 'Medicamentos' });
  });

  router.get('/casificacion', function(req, res, next) {
    res.render('index.ejs', { title: 'clasificación de medicamentos' });
  });

  router.get('/pedidos', function(req, res, next) {
    res.render('index.ejs', { title: 'Pedidos' });
  });

  router.get('/universidades', function(req, res, next) {
    res.render('index.ejs', { title: 'Universidades' });
  });

  /*------------Sockets-----------------*/
  var io = app.io;

  io.on('connection', function (socket) {
    console.log('new user');

    socket.emit('serverReady', 'hey, I am ready!');

    socket.on('clientReady', function (info) {
      console.log("The client is ready.");
      var path = info.path;
      var data = info.data;
      if (path === '/universidades') {
        handleU(socket, info, connection);
      } else if (path === '/pedidos') {
        handlePedidos(socket, info, connection);
      }
    });

  });

  app.use(mountPoint, router);
}
