var io = require('socket.io-client')();


io.on('showData',function(data, path){
  /*var UData = document.getElementById('showDataU');
  var content = document.createTextNode(rows[0].nombre);
  UData.appendChild(content);*/

  var cols = Object.keys(data).length;
  var rows = Object.keys(data[0]).length;//todas las filas tienen la misma info, por ende el mismo tamaño

  console.log("col : " + cols);
  console.log("rows : " + rows);

  for(var i = 0; i < rows; i++){
    var tr = document.createElement('tr');
    for(var j = 0; j < cols; j++){
      var td = tr.appendChild(document.createElement('td'));
      td.innerHTML = data[rows][cols];
      document.getElementById("tableU").appendChild(tr);
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
