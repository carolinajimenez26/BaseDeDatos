var io = require('socket.io-client')();


io.on('showData',function(data, path){
  /*var UData = document.getElementById('showDataU');
  var content = document.createTextNode(rows[0].nombre);
  UData.appendChild(content);*/

  var rows = Object.keys(data).length;
  var cols = Object.keys(data[0]).length;//todas las columnas tienen la misma info, por ende el mismo tamaño

  console.log("col : " + cols);
  console.log("rows : " + rows);

  var list = document.getElementById("tableU");

  /*for(var i = 0; i < rows; i++){
    var tr = document.createElement('tr');
    //for(var j = 0; j < cols; j++){
      var td1 = tr.appendChild(document.createElement('td'));
      td1.innerHTML = data[i].MATRICULA;//i;//data[rows][cols];
      list.appendChild(tr);
      var td2 = tr.appendChild(document.createElement('td'));
      td2.innerHTML = data[i].NOMBRES;
      list.appendChild(tr);
      var td3 = tr.appendChild(document.createElement('td'));
      td3.innerHTML = data[i].APELLIDOS;
      list.appendChild(tr);
    //}
  }*/

  var columnas = ['MATRICULA','NOMBRES','APELLIDOS'];

  //console.log(" : " , Object.keys(data[0])[0]);
  //console.log(" : " , Object.keys(data[0])[1]);

  var aux = Object.keys(data[0])[0];
  console.log(Object.keys(data[0]));//devuelve las llaves de ese objeto

  for(var i = 0; i < rows; i++){
    var tr = document.createElement('tr');
    for(var j = 0; j < cols; j++){
      var td = tr.appendChild(document.createElement('td'));
      var aux = Object.keys(data[0])[j];
      console.log(aux);

      td.innerHTML = data[i].aux;//i;//data[rows][cols];
      list.appendChild(tr)
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
