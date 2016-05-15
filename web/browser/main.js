
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

var
    //alumnos
    o = document.getElementById("ordenelo"),//boton

    //consultas
    pp = document.getElementById("peorPromedio"),//boton
    mp = document.getElementById("mejorPromedio"),//boton
    m10 = document.getElementById("mejores10"),//boton
    p10 = document.getElementById("Peores10"),//boton
    avgex = document.getElementById("promExam"),//boton
    estadoprom = document.getElementById("promEst"),//boton
    l = document.getElementById("losers"),//boton

    pei = document.getElementById("promedioEstInput"),//input text
    smm = document.getElementById("selectorMayorMenor"),//selector
    pe = document.getElementById("promEsp"),//boton

    se = document.getElementById("selectorExamen"),//selector
    eex = document.getElementById("estEspEx"),//boton

    //notas
    ne = document.getElementById("notasEsp"),//input text
    bne = document.getElementById("estEsp");//boton

/*-------------------Eventos------------------------*/

pp.addEventListener("click",function(){
  io.emit('peorPromedio','/peorPromedio');
});

mp.addEventListener("click",function(){
  console.log("io emmit desde cliente");
  io.emit('mejorPromedio','/mejorPromedio');
});

o.addEventListener("click",function(){
  console.log("io emmit desde cliente");
  io.emit('ordenelo','/ordenadoAlfabeticamente');
});

m10.addEventListener("click",function(){
  console.log("io emmit desde cliente");
  io.emit('mejores10','/mejores10');
});

p10.addEventListener("click",function(){
  io.emit('peores10','/peores10');
});

avgex.addEventListener("click",function(){
  io.emit('promExam','/promExam');
});

estadoprom.addEventListener("click",function(){
  io.emit('promEst','/promEst');
});

l.addEventListener("click",function(){
  io.emit('losers','/losers');
});

pe.addEventListener("click",function(){
  io.emit('promEsp','/promEsp',prom,sel);
});

eex.addEventListener("click",function(){
  io.emit('estEspEx','/estEspEx',op);
});

bne.addEventListener("click",function(){
  iio.emit('notasEsp','/notasEsp',txt);
});
