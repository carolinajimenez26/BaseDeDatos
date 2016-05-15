var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');//para sacar los datos de los formularios

var mysql = require('mysql');//bases de datos

function peorPromedio(connection, socket, path, callback){
  var aux = 'SELECT alumnos.*, (EX1 + EX2 + EX3)/3 AS PROMEDIO \
  FROM alumnos INNER JOIN notas ON alumnos.MATRICULA = notas.IDALUMNO \
  ORDER BY PROMEDIO ASC \
  LIMIT 1;';
  if(connection === undefined){
    console.error('No se ha definido la conexión ');
  }else{
    var query = connection.query(aux,
      function(error, rows){
        if(error){
          throw error;
        }else{
          console.log(rows);
          callback(socket, rows, path);//siguiente función, la que lo recibe
          //connection.end();
        }
     }
    );
  }
}

function mejorPromedio(connection, socket, path, callback){
  var aux = 'SELECT alumnos.*, (EX1 + EX2 + EX3)/3 AS PROMEDIO \
  FROM alumnos INNER JOIN notas ON alumnos.MATRICULA = notas.IDALUMNO \
  ORDER BY PROMEDIO DESC \
  LIMIT 1;';
  if(connection === undefined){
    console.error('No se ha definido la conexión ');
  }else{
    var query = connection.query(aux,
      function(error, rows){
        if(error){
          throw error;
        }else{
          console.log(rows);
          callback(socket, rows, path);//siguiente función, la que lo recibe
          //connection.end();
        }
     }
    );
  }
}

function consult(connection, socket, table, path, callback){
  if(connection === undefined){
    console.error('No se ha definido la conexión ');
  }else{
    var query = connection.query('SELECT * FROM '+table,
      function(error, rows){
        if(error){
          throw error;
        }else{
          console.log(rows);
          callback(socket, rows, path);//siguiente función, la que lo recibe
          //connection.end();
        }
     }
    );
  }
}

function emitter(socket, ans, path){
  socket.emit('showData', ans, path);//envia los datos
}

function handleAlumnos(socket, info, path, connection){
  var rows = consult(connection, socket, "alumnos", path, emitter);
}

function handleNotas(socket, info, path, connection){
  var rows = consult(connection, socket, "notas", path, emitter);
}

function handlePeorPromedio(socket, path, connection){
  var rows = peorPromedio(connection, socket, path, emitter);
}

function handleMejorPromedio(socket, path, connection){
  var rows = mejorPromedio(connection, socket, path, emitter);
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

  connection.on('close', function(err) {
    if (err) {
      // Oops! Unexpected closing of connection, lets reconnect back.
      connection = mysql.createConnection(connection.config);
    } else {
      console.log('Connection closed normally.');
    }
  });

  //---------------------Enrutamientos--------------------------
  router.get('/', function(req, res, next) {
    res.render('index.ejs', { title: 'Colegio'});
  });

  router.get('/alumnos', function(req, res, next) {
    res.render('alumnos.ejs', { title: 'Alumnos' });
  });

  router.get('/notas', function(req, res, next) {
    res.render('notas.ejs', { title: 'Notas' });
  });

  router.get('/consultas', function(req, res, next) {
    res.render('consultas.ejs', { title: 'Notas' });
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
        handleNotas(socket, info, path, connection);
      } else if (path === '/alumnos') {
        handleAlumnos(socket, info, path, connection);
      }
    });

    socket.on('peorPromedio', function(path){
      handlePeorPromedio(socket, path, connection);
    });

    socket.on('mejorPromedio', function(path){
      handleMejorPromedio(socket, path, connection);
    });

  });

  app.use(mountPoint, router);
}
