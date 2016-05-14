
/*--------------SOCKETS-----------------*/
var io = require('socket.io-client')();

io.on('showData',function(data, path){

  var rows = Object.keys(data).length;
  var cols = Object.keys(data[0]).length;//todas las columnas tienen la misma info, por ende el mismo tamaño

  //console.log("col : " + cols);
  //console.log("rows : " + rows);

  console.log("path : " , path);

  if (path === '/alumnos'){
    var list = document.getElementById("tableAlumnos");
  } else if(path === '/notas') {
    var list = document.getElementById("tableNotas");
  } else if (path === '/peorPromedio' || path === '/mejorPromedio') {
    var list = document.getElementById("tablePromedios");
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

/*----------FUNCIONES-------------*/

function peorPromedio(){
  io.emit('peorPromedio','/peorPromedio');
}

function mejorPromedio(){
  io.emit('mejorPromedio','/mejorPromedio');
}

var pp = document.getElementById("peorPromedio"),
    mp = document.getElementById("mejorPromedio");

pp.addEventListener("click",peorPromedio);
mp.addEventListener("click",mejorPromedio);
