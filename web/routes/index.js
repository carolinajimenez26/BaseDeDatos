/*----------------------REQUIRES---------------------*/
var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mysql = require('mysql');//bases de datos

/*----------------------QUERIES------------------------*/

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

function OrdenadoAlfabeticamente(connection, socket, path, callback){
  console.log("funcion ordenado query");
  var aux = 'SELECT * \
  FROM alumnos \
  ORDER BY NOMBRES, APELLIDOS ASC';
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

//lista los 10 estudiantes con mejor promedio
function mejores10(connection, socket, path, callback){
  var aux = 'SELECT alumnos.*, (EX1 + EX2 + EX3)/3 AS PROMEDIO \
  FROM alumnos INNER JOIN notas ON alumnos.MATRICULA = notas.IDALUMNO \
  ORDER BY PROMEDIO DESC \
  LIMIT 10;';
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

//lista los 10 estudiantes con peor promedio
function peores10(connection, socket, path, callback){
  var aux = 'SELECT alumnos.*, (EX1 + EX2 + EX3)/3 AS PROMEDIO \
  FROM alumnos INNER JOIN notas ON alumnos.MATRICULA = notas.IDALUMNO \
  ORDER BY PROMEDIO ASC \
  LIMIT 10;';
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

//PROMEDIO GENERAL POR EXAMEN
function PromExam(connection, socket, path, callback){
  var aux = 'SELECT AVG(EX1) AS PROM_EX1, AVG(EX2) AS PROM_EX2, AVG(EX3) AS PROM_EX3, \
             COUNT(IDALUMNO) AS CANT_ESTUDIANTES \
             FROM notas;';
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

//LISTADO DE ESTUDIANTE CON PROMEDIO AGRUPADO POR ESTADO DE FORMA ASCEDENTE
function PromEst(connection, socket, path, callback){
  var aux = 'SELECT alumnos.*, ((EX1 + EX2 + EX3)/3) AS PROMEDIO, \
             CASE WHEN ((EX1 + EX2 + EX3)/3) < 60 \
                THEN "DEFICIENTE" ELSE \
             CASE WHEN ((((EX1 + EX2 + EX3)/3) > 60) && (((EX1 + EX2 + EX3)/3) < 80)) \
                THEN "ACEPTABLE" ELSE \
             CASE WHEN (((EX1 + EX2 + EX3)/3) > 80 && ((EX1 + EX2 + EX3)/3) < 90) \
                THEN "SOBRESALIENTE" ELSE \
             CASE WHEN (((EX1 + EX2 + EX3)/3) > 90) \
                THEN "EXCELENTE" \
             END END END END AS ESTADO \
             FROM alumnos INNER JOIN notas ON alumnos.MATRICULA = notas.IDALUMNO \
             GROUP BY PROMEDIO ASC;';
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

//LISTAR LOS ESTUDIANTES QUE PERDIERON LA MATERIA (PROMEDIO DEFICIENTE)
function Losers(connection, socket, path, callback){
  var aux = 'SELECT alumnos.*, ((EX1 + EX2 + EX3)/3) AS PROMEDIO, \
             CASE WHEN ((EX1 + EX2 + EX3)/3) < 60 \
                THEN "DEFICIENTE" ELSE \
             CASE WHEN ((((EX1 + EX2 + EX3)/3) > 60) && (((EX1 + EX2 + EX3)/3) < 80)) \
                THEN "ACEPTABLE" ELSE \
             CASE WHEN (((EX1 + EX2 + EX3)/3) > 80 && ((EX1 + EX2 + EX3)/3) < 90) \
                THEN "SOBRESALIENTE" ELSE \
             CASE WHEN (((EX1 + EX2 + EX3)/3) > 90) \
                THEN "EXCELENTE" \
             END END END END AS ESTADO \
             FROM alumnos INNER JOIN notas ON alumnos.MATRICULA = notas.IDALUMNO \
             HAVING ESTADO = "DEFICIENTE";';
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

//LISTAR LAS NOTAS DE UN ESTUDIANTE ESPECIFICO (SEGUN LA MATRICULA)
function NotasEsp(connection, socket, path, matricula, callback){
  var aux = 'SELECT * \
             FROM alumnos INNER JOIN notas ON alumnos.MATRICULA = notas.IDALUMNO \
             WHERE MATRICULA = "'+matricula+'";';
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

//LISTAR LOS ALUMNOS QUE TUVIERON UN PROMEDIO POR ENCIMA/DEBAJO DE X
function PromEsp(connection, socket, path, sel,prom, callback){
  var aux = 'SELECT alumnos.*, (EX1 + EX2 + EX3)/3 AS PROMEDIO \
             FROM alumnos INNER JOIN notas ON alumnos.MATRICULA = notas.IDALUMNO \
             WHERE PROMEDIO'+sel+prom+';';
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

//LISTAR LOS ESTUDIANTES QUE PERDIERON X EXAMEN
function EstEsp(connection, socket, path, ex, callback){
  var aux = 'SELECT * \
             FROM alumnos \
             WHERE '+ex+' < 60;';
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

//lista todo lo de X tabla
function consult(connection, socket, table, path, callback){
  if(connection === undefined){
    console.error('No se ha definido la conexión ');
  }else{
    var query = connection.query('SELECT * FROM '+table,
      function(error, rows){
        if(error){
          throw error;
        }else{
          //console.log(rows);
          callback(socket, rows, path);//siguiente función, la que lo recibe
          //connection.end();
        }
     }
    );
  }
}

/*---------------------HANDLERS-------------------*/

function emitter(socket, ans, path){
  console.log("emmiter");
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

function handleAlfabetico(socket, path, connection){
  console.log("handleAlfabetico");
  var rows = OrdenadoAlfabeticamente(connection, socket, path, emitter);
}

function handleMejores10(socket, path, connection){
  var rows = mejores10(connection, socket, path, emitter);
}

function handlePeores10(socket, path, connection){
  var rows = peores10(connection, socket, path, emitter);
}

/*---------------EXPORTS------------------------*/

module.exports = function(app, mountPoint){

  /*----------DATA BASE--------------*/

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

  /*---------------------ROUTINGS--------------------------*/
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
    res.render('general.ejs', { title: 'Consultas' });
  });

  /*------------SOCKETS-----------------*/
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

    socket.on('ordenelo', function(path){
      console.log("socket.on desde server");
      handleAlfabetico(socket, path, connection);
    });

  });

  app.use(mountPoint, router);
}
