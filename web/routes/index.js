var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');//para sacar los datos de los formularios

var mysql = require('mysql');//bases de datos


function consult(connection, socket, table, callback){
  if(connection === undefined){
    console.error('No se ha definido la conexión ');
  }else{
    var query = connection.query('SELECT * FROM '+table,
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

function handleAlumnos(socket, info, connection){
  var rows = consult(connection, socket, "alumnos", emitter);
}

function handleNotas(socket, info, connection){
  var rows = consult(connection, socket, "notas", emitter);
}

//---------------Exportaciones-------------------------

module.exports = function(app, mountPoint){

  /*----------BASES DE DATOS--------------*/

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'taller4'
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
    res.render('index.ejs', { title: 'Colegio'});
  });

  router.get('/alumnos', function(req, res, next) {
    res.render('index.ejs', { title: 'Alumnos' });
  });

  router.get('/notas', function(req, res, next) {
    res.render('index.ejs', { title: 'Notas' });
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
      if (path === '/notas') {
        handleNotas(socket, info, connection);
      } else if (path === '/alumnos') {
        handleAlumnos(socket, info, connection);
      }
    });

  });

  app.use(mountPoint, router);
}
