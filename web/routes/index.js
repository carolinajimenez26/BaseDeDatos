var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');//para sacar los datos de los formularios


/*GET home page. */
//Cuando la ruta es : '/' carga index.html
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: 'Colegio'});
});
//Carga la página de Contact-us cuando la requieran
router.get('/notas', function(req, res, next) {
  res.render('notas.ejs', { title: 'Notas' });
});

router.get('/alumnos', function(req, res, next) {
  res.render('alumnos.ejs', { title: 'Alumnos' });
});

module.exports = router;
