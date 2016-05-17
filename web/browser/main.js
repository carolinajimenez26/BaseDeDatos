
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

if ( document.URL.contains("/alumnos") ) {
  document.getElementById("ordenelo").addEventListener("click",function(){
    io.emit('ordenelo','/ordenadoAlfabeticamente');
    console.log("nada");
  });//boton
}else if ( document.URL.contains("/consultas") ){

    //consultas
    var pp = document.getElementById("peorPromedio").addEventListener("click",function(){
      console.log("peor");
      io.emit('peorPromedio','/peorPromedio');
    });//boton
    var mp = document.getElementById("mejorPromedio").addEventListener("click",function(){
      io.emit('mejorPromedio','/mejorPromedio');
    });;//boton
    var m10 = document.getElementById("mejores10").addEventListener("click",function(){
      io.emit('mejores10','/mejores10');
    });;//boton
    var p10 = document.getElementById("Peores10").addEventListener("click",function(){
      io.emit('peores10','/peores10');
    });;//boton
    var avgex = document.getElementById("promExam").addEventListener("click",function(){
      io.emit('promExam','/promExam');
    });;//boton
    var estadoprom = document.getElementById("promEst").addEventListener("click",function(){
      io.emit('promEst','/promEst');
    });;//boton
    var l = document.getElementById("losers").addEventListener("click",function(){
      io.emit('losers','/losers');
    });;//boton
/*
    var pei = document.getElementById("promedioEstInput"),//input text
        smm = document.getElementById("selectorMayorMenor");//selector
    var pe = document.getElementById("promEsp").addEventListener("click",function(){
      prom = "60";
      sel = "<";
      io.emit('promEsp','/promEsp',prom,sel);
    });;//boton

    var se = document.getElementById("selectorExamen"),//selector
        eex = document.getElementById("estEspEx").addEventListener("click",function(){
          op = "EX1";
          io.emit('estEspEx','/estEspEx',op);
        });;//boton

    //notas
    var ne = document.getElementById("notasEsp"),//input text
        bne = document.getElementById("estEsp").addEventListener("click",function(){
          txt = "111022151";
          io.emit('notasEsp','/notasEsp',txt);
        });;//boton
        */
}
