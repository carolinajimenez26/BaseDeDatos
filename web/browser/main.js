
/*--------------SOCKETS-----------------*/
var io = require('socket.io-client')();

io.on('showData',function(data, path){

  var rows = Object.keys(data).length;
  var cols = Object.keys(data[0]).length;//todas las columnas tienen la misma info, por ende el mismo tamaño

  //console.log("col : " + cols);
  //console.log("rows : " + rows);

  console.log("path : " , path);

  if (path === '/alumnos' || path === '/ordenadoAlfabeticamente'){
    var list = document.getElementById("tableAlumnos");
  } else if(path === '/notas') {
    var list = document.getElementById("tableNotas");
  } else {
    var list = document.getElementById("tableGeneral");
  }

  //CONSTRUYE LA TABLA HTML
  var tr = document.createElement('tr');
  for(var i = 0; i < Object.keys(data[0]).length; ++i){
   var th = document.createElement('th');
   th.innerHTML = Object.keys(data[0])[i];
   list.appendChild(th);
  }

  for(var i = 0; i < data.length; ++i){
   var tr = document.createElement('tr');
   for(var ind in data[i]) {
        var td = tr.appendChild(document.createElement('td'));
        td.innerHTML = data[i][ind];
        list.appendChild(tr);
   }
  }

});

io.on('serverReady', function(data) {
  console.log("The server is ready.");
  io.emit('clientReady', {
    path: window.location.pathname,
    data: 'I am ready too, man.'
  });
});

function peorPromedio(){
  io.emit('peorPromedio','/peorPromedio');
}

function mejorPromedio(){
  io.emit('mejorPromedio','/mejorPromedio');
}

function OrdenadoAlfabeticamente(){
  console.log("io emmit desde cliente");
  io.emit('ordenelo','/ordenadoAlfabeticamente');
}

function Mejores10(){
  io.emit('mejores10','/mejores10');
}

function Peores10(){
  io.emit('peores10','/peores10');
}

function PromExam(){
  io.emit('promExam','/promExam');
}

function PromEst(){
  io.emit('promEst','/promEst');
}

function Losers(){
  io.emit('losers','/losers');
}

function NotasEsp(){
  io.emit('notasEsp','/notasEsp');
}

function PromEsp(){
  io.emit('promEsp','/promEsp');
}

function EstEsp(){
  io.emit('estEsp','/estEsp');
}

var pp = document.getElementById("peorPromedio"),
    mp = document.getElementById("mejorPromedio"),
    o = document.getElementById("ordenelo");

pp.addEventListener("click",peorPromedio);
mp.addEventListener("click",mejorPromedio);
o.addEventListener("click",OrdenadoAlfabeticamente);
