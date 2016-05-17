
/*--------------SOCKETS-----------------*/
var io = require('socket.io-client')();

io.on('showData',function(data, path){

  var rows = Object.keys(data).length;
  var cols = Object.keys(data[0]).length;//todas las columnas tienen la misma info, por ende el mismo tamaño

  //console.log("col : " + cols);
  //console.log("rows : " + rows);

  console.log("path : " , path);
  console.log("data : ", data);
  if(data === ""){
    alert("No existe resultado para esta tabla");
  }

  if (path === '/alumnos' || path === '/ordenadoAlfabeticamente'){
    var list = document.getElementById("tableAlumnos");
  } else if(path === '/notas' || path === '/notasEsp' || path === '/prom') {
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

    var pei = document.getElementById("promedioEstInput"),//input text
        smm = document.getElementById("selectorMayorMenor");//selector
    var pe = document.getElementById("promEsp").addEventListener("click",function(){
      prom = pei.value;
      if(prom == ""){
        alert("Ingrese un promedio");
        return;
      }
      if(smm.options[smm.selectedIndex].text == "Menor") var sel = "<";
      else if(smm.options[smm.selectedIndex].text == "Mayor") var sel = ">";
      else{
        alert("No se seleccionó una opcion, intente de nuevo.");
        return;
      }
      if(prom.match(/^-?[0-9]*[.][0-9]+$/)){//validar(prom)){// si no escribió nada raro
        io.emit('promEsp','/promEsp',prom,sel);
      }else{
        alert("Error, intentelo de nuevo");
        return;
      }
    });;//boton

    var se = document.getElementById("selectorExamen"),//selector
        eex = document.getElementById("estEspEx").addEventListener("click",function(){
          op = se.options[se.selectedIndex].text;
          if(op == "Examen 1") var ans = "EX1";
          else if(op == "Examen 2") var ans = "EX2";
          else if(op == "Examen 3") var ans = "EX3";
          else{
            alert("Debe seleccionar un examen");
            return;
          }
          io.emit('estEspEx','/estEspEx',ans);
        });;//boton
}else if ( document.URL.contains("/notas") ){
  var ne = document.getElementById("notasEsp"),//input text
      bne = document.getElementById("estEsp").addEventListener("click",function(){
        var txt = ne.value;
        console.log(txt);
        if(txt.match(/^-?[0-9]*[0-9]+$/)){
          io.emit('notasEsp','/notasEsp',txt);
        }else{
          alert("Error, intentelo de nuevo");
        }
      });;//boton

  var sed = document.getElementById("selectorDebajoEncima"),
      deprom = document.getElementById("deprom").addEventListener("click",function(){
        var sel = sed.options[sed.selectedIndex].text;
        if(sel == "Encima") io.emit('EncimaProm','/prom');
        else if(sel == "Debajo") io.emit('DebajoProm','/prom');
        else{
          alert("Seleccione una opción válida");
          return;
        }
      });;
}
