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
function PromEsp(connection, socket, path, prom, sel, callback){
  var aux = 'SELECT alumnos.*, (EX1 + EX2 + EX3)/3 AS PROMEDIO \
             FROM alumnos INNER JOIN notas ON alumnos.MATRICULA = notas.IDALUMNO \
             HAVING PROMEDIO'+sel+prom+';';
  console.log(aux);
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
function EstEspEx(connection, socket, path, ex, callback){
  var aux = 'SELECT alumnos.*, notas.'+ex+'\
             FROM alumnos INNER JOIN notas\
             WHERE '+ex+' < 60;';
  console.log(aux);
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

function EncimaProm(connection, socket, path, callback){
  var aux = 'SELECT COUNT(*) AS ENCIMAPROM \
             FROM notas \
             WHERE PROMEDIO > (SELECT ROUND(AVG(PROMEDIO)) \
                               FROM notas \
                               );';
  console.log(aux);
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

function DebajoProm(connection, socket, path, callback){
  var aux = 'SELECT COUNT(*) AS DEBAJOPROM \
             FROM notas \
             WHERE PROMEDIO < (SELECT ROUND(AVG(PROMEDIO)) \
                               FROM notas \
                               );';
  console.log(aux);
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
  console.log(ans);
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

function handlePromExam(socket, path, connection){
  var rows = PromExam(connection, socket, path, emitter);
}

function handlePromEst(socket, path, connection){
  var rows = PromEst(connection, socket, path, emitter);
}

function handleLosers(socket, path, connection){
  var rows = Losers(connection, socket, path, emitter);
}

function handleNotasEsp(socket, path, matricula, connection){
  var rows = NotasEsp(connection, socket, path,matricula, emitter);
}

function handlePromEsp(socket, path, sel, prom, connection){
  var rows = PromEsp(connection, socket, path, sel, prom, emitter);
}

function handleEstEspEx(socket, path, ex, connection){
  var rows = EstEspEx(connection, socket, path, ex, emitter);
}

function handleEstEsp(socket, path, matricula, connection){
  var rows = EstEsp(connection, socket, path, matricula, emitter);
}

function handleDebajoProm(socket, path, connection){
  var rows = DebajoProm(connection, socket, path, emitter);
}

function handleEncimaProm(socket, path, connection){
  var rows = EncimaProm(connection, socket, path, emitter);
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

    socket.on('mejores10', function(path){
      handleMejores10(socket, path, connection);
    });

    socket.on('peores10', function(path){
      handleMejores10(socket, path, connection);
    });

    socket.on('promExam', function(path){
      handlePromExam(socket, path, connection);
    });

    socket.on('promEst', function(path){
      handlePromEst(socket, path, connection);
    });

    socket.on('losers', function(path){
      handleLosers(socket, path, connection);
    });

    socket.on('notasEsp', function(path, matricula){
      handleNotasEsp(socket, path, matricula, connection);
    });

    socket.on('promEsp', function(path, sel, prom){
      handlePromEsp(socket, path, sel, prom, connection);
    });

    socket.on('estEspEx', function(path, ex){
      handleEstEspEx(socket, path, ex, connection);
    });

    socket.on('EncimaProm',function(path){
      handleEncimaProm(socket, path, connection);
    });

    socket.on('DebajoProm',function(path){
      handleDebajoProm(socket, path, connection);
    });
  });

  app.use(mountPoint, router);
}
