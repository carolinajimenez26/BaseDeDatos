/*----CREACIÓN DE BD----------*/

CREATE DATABASE taller4;
USE taller4;

/*----CREACIÓN DE TABLAS----------*/

CREATE TABLE IF NOT EXISTS `alumnos` (
  `MATRICULA` varchar(10) NOT NULL,
  `NOMBRES` varchar(20) NOT NULL,
  `APELLIDOS` varchar(20) NOT NULL,
  PRIMARY KEY (`MATRICULA`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

CREATE TABLE IF NOT EXISTS `notas` (
  `IDALUMNO` varchar(10) NOT NULL,
  `EX1` FLOAT(4,2) unsigned, # xx,yy
  `EX2` FLOAT(4,2) unsigned, #no se permiten valores negativos, pasan a ser cero
  `EX3` FLOAT(4,2) unsigned,
  PRIMARY KEY (`IDALUMNO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

/*----CREACIÓN DE TRIGGERS----------*/

-- TRIGGER para poner las notas que se pasan de 100 a 100
delimiter //
  CREATE TRIGGER menor_a_100
  BEFORE INSERT ON `notas`
  FOR EACH ROW
  BEGIN
    IF NEW.EX1 > 100 THEN
      SET NEW.EX1 = 100;
    ELSEIF NEW.EX2 > 100 THEN
      SET NEW.EX2 = 100;
    ELSEIF NEW.EX3 > 100 THEN
      SET NEW.EX3 = 100;
    END IF;
  END;//
delimiter;

-- TRIGGER para poner las notas que se pasan de 100 a 100 con los updates
delimiter //
  CREATE TRIGGER menor_a_100_updates
  BEFORE UPDATE ON `notas`
  FOR EACH ROW
  BEGIN
    IF NEW.EX1 > 100 THEN
      SET NEW.EX1 = 100;
    ELSEIF NEW.EX2 > 100 THEN
      SET NEW.EX2 = 100;
    ELSEIF NEW.EX3 > 100 THEN
      SET NEW.EX3 = 100;
    END IF;
  END;//
delimiter;


/*--------INSERCIONES---------*/

INSERT INTO alumnos (`MATRICULA`,`NOMBRES`,`APELLIDOS`) VALUES
("165229",	"Adolfo",	"Cámara E."),
("601705",	"Eduardo",	"Domínguez M."),
("603277",	"Raúl Carlos",	"Ramirez Garza"),
("178919",	"Héctor",	"Coronado"),
("392212",	"Alina Lizu",	"Larrondo M."),
("540531",	"José Euclides",	"Correa P."),
("338849",	"Dirk Antonio",	"Rosquillas T."),
("767101",	"Pablo",	"Gutiérrez T."),
("179050",	"David Elías",	"Camacho M."),
("586217",	"Rogelio",	"Mata Villarreal"),
("765022",	"Héctor Manuel",	"Rodríguesz M."),
("750404",	"Claudia L.",	"González N."),
("765088",	"Juan Pablo",	"González González"),
("765264",	"Jan Reinoud",	"Ortiz Dehaas"),
("765274",	"Saúl Armando",	"Soto Véliz"),
("712243",	"Daniel",	"García M."),
("263835",	"Ramiro",	"Espinosa Z."),
("585757",	"Javier Ernesto",	"Dávila Castillón"),
("766142",	"León Felipe",	"Villegas K."),
("603149",	"Marcela",	"Fernández S."),
("179788",	"Nidia",	"Colmenero L."),
("189242",	"SERVELETS",	"MULTIMEDIA"),
("527892",	"Roberto",	"Cota R."),
("179781",	"José Emmanuel",	"Garza P."),
("766861",	"Jorge Eduardo",	"Stone M."),
("764377",	"Roberto Isaac",	"Flores Jiménez"),
("585749",	"Adriana María",	"Flores Martínez"),
("767175",	"José Adrián",	"Chapa R."),
("763924",	"Raúl Alonzo",	"B."),
("766725",	"Alejandro Luis",	"B."),
("179931",	"Carlos Alexis",	"Blé Caso"),
("766933",	"Javier Arturo",	"Ochoa S."),
("767828",	"Jaime Uriel",	"García N."),
("765764",	"Rigoberto",	"Vázquez Bretón"),
("527755",	"Lizeth G.",	"Gastélum A."),
("528000",	"Francisco X.",	"Inukai B."),
("72961",	"MELISSA",	"ARBOLEDA MARIN"),
("70035",	"ANA MARIA",	"CARDONA GRISALES"),
("52606",	"JULIAN ANDRES",	"CORREA TAMAYO"),
("74402",	"YULIETH ALEJANDRA",	"DUQUE GARCIA"),
("56477",	"ALEJANDRO",	"HERNANDEZ IBARRA"),
("75543",	"JEFFER DANIEL",	"JARAMILLO GRISALES"),
("96888",	"YERLY ANDRES",	"JIMENEZ BUITRAGO"),
("69366",	"DANIEL",	"LARGO HERNANDEZ"),
("53159",	"MARIANA",	"LOAIZA BURITICA"),
("93281",	"JHONIER",	"ORTIZ BLANDON"),
("69404",	"HERNAN ALBERTO",	"PINEDA CABEZAS"),
("51712",	"VICTOR ALONSO",	"RENDON GIRON"),
("57790",	"ANDRES FELIPE",	"RODRIGUEZ GIRALDO"),
("72314",	"LEIDY JOHANNA",	"ROMERO ZAPATA"),
("54270",	"SARY JOHANA",	"SUAREZ VASQUEZ"),
("74248",	"ELIZABETH",	"TORRES GONZALEZ"),
("87667",	"ANDRES FELIPE",	"URIBE HERRERA"),
("57917",	"KATHERINE",	"VARGAS GARCIA"),
("71947",	"JUAN PABLO",	"VASQUEZ LOPEZ"),
("5931120029",	"CRISTHIAN DAVID",	"AMAYA BUENO"),
("5931120189",	"JULIAN EDUARDO",	"ARROYAVE ALVAREZ"),
("5261120151",	"MAY JEFFERSON",	"CARDONA ALZATE"),
("5931120103",	"ERIKA MARCELA",	"CARDONA BEDOYA"),
("5931120117",	"JUAN CARLOS",	"CASTRO SERNA"),
("5931120081",	"CARLOS AUGUSTO",	"ECHEVERRY VELEZ"),
("5981120098",	"SHIRLEY",	"FORERO LONDOÑO"),
("5931120014",	"MELISSA",	"GARCIA LOPEZ"),
("5931120030",	"ANGELICA MARIA",	"HURTADO MONTOYA"),
("5931120019",	"WILSON EUGENIO",	"JARAMILLO ARENAS"),
("5931120156",	"GENNY PATRICIA",	"LONDOÑO BRITO"),
("5931120115",	"JOHANNY ANDRES",	"MORALES CARMONA"),
("5931120157",	"JULIAN ESTEBAN",	"OSPINA ARIAS"),
("5931120009",	"YEISON ALEJANDRO",	"OTALVARO AVENDAÑO"),
("5931120111",	"ANDRES",	"PERDOMO CASTRO"),
("5931120100",	"MATEO",	"PUERTA GRISALES"),
("5931120099",	"HECTOR FABIO",	"QUINTERO GARCIA"),
("5931120028",	"UZ MERY",	"RAMIREZ COLORADO L"),
("5931120155",	"EDUAR FERNANDO",	"RAMIREZ TAPASCO"),
("5931120112",	"ANGELICA MARIA",	"RENDON OSORIO"),
("5931120139",	"CRISTIAN FERNANDO",	"RUIZ MARIN"),
("5931120020",	"MANUEL ALEJANDRO",	"TOBÓN RIOS"),
("5931120053",	"LUIS FERNANDO",	"VALENCIA BERMÚDEZ"),
("5931120015",	"JENIFFER ELIANA",	"VALENCIA CAÑON"),
("5931120082",	"MAURICIO",	"VICENTE NIETO"),
("5931120052",	"KATHERINE",	"ZULUAGA LONDOÑO");

INSERT INTO notas (`IDALUMNO`,`EX1`,`EX2`,`EX3`) VALUES
("165229",	"93",	"87",	"0"),
("601705",	"75",	"85",	"25"),
("603277",	"86",	"66",	"38"),
("178919",	"70",	"87",	"40"),
("392212",	"51",	"88",	"40"),
("540531",	"92",	"82",	"45"),
("338849",	"98",	"74",	"48"),
("767101",	"61",	"66",	"53"),
("179050",	"70",	"93",	"55"),
("586217",	"87",	"63",	"55"),
("765022",	"42",	"79",	"58"),
("750404",	"79",	"90",	"60"),
("765088",	"78",	"93",	"63"),
("765264",	"86",	"93",	"68"),
("765274",	"87",	"88",	"70"),
("712243",	"87",	"101",	"70"),
("263835",	"63",	"101",	"75"),
("585757",	"95",	"94",	"75"),
("766142",	"77",	"93",	"75"),
("603149",	"100",	"99",	"78"),
("179788",	"87",	"98",	"78"),
("189242",	"70",	"80",	"80"),
("527892",	"99",	"98",	"80"),
("179781",	"63",	"93",	"80"),
("766861",	"100",	"90",	"80"),
("764377",	"68",	"82",	"80"),
("585749",	"88",	"87",	"83"),
("767175",	"80",	"99",	"83"),
("763924",	"94",	"91",	"83"),
("766725",	"98",	"91",	"83"),
("179931",	"58",	"87",	"88"),
("766933",	"95",	"93",	"88"),
("767828",	"98",	"101",	"88"),
("765764",	"85",	"91",	"93"),
("527755",	"70",	"51",	"95"),
("528000",	"88",	"72",	"98"),
("72961",	"84",	"66",	"73"),
("70035",	"5",	"61",	"9"),
("52606",	"96",	"31",	"8"),
("74402",	"94",	"26",	"25"),
("56477",	"93",	"50",	"49"),
("75543",	"36",	"69",	"51"),
("96888",	"16",	"106",	"51"),
("69366",	"21",	"101",	"96"),
("53159",	"71",	"28",	"35"),
("93281",	"16",	"52",	"43"),
("69404",	"56",	"98",	"108"),
("51712",	"72",	"30",	"56"),
("57790",	"45",	"17",	"59"),
("72314",	"80",	"12",	"39"),
("54270",	"81",	"2",	"-5"),
("74248",	"69",	"109",	"91"),
("87667",	"85",	"14",	"110"),
("57917",	"61",	"86",	"28"),
("71947",	"23",	"98",	"72"),
("5931120029",	"106",	"40",	"8"),
("5931120189",	"96",	"-1",	"88"),
("5261120151",	"79",	"97",	"12"),
("5931120103",	"48",	"23",	"75"),
("5931120117",	"103",	"95",	"108"),
("5931120081",	"5",	"-8",	"15"),
("5981120098",	"50",	"56",	"-8"),
("5931120014",	"108",	"54",	"50"),
("5931120030",	"66",	"10",	"99"),
("5931120019",	"53",	"72",	"70"),
("5931120156",	"51",	"108",	"56"),
("5931120115",	"75",	"30",	"84"),
("5931120157",	"58",	"106",	"72"),
("5931120009",	"70",	"21",	"53"),
("5931120111",	"97",	"69",	"94"),
("5931120100",	"-2",	"64",	"100"),
("5931120099",	"75",	"54",	"92"),
("5931120028",	"79",	"46",	"104"),
("5931120155",	"58",	"33",	"35"),
("5931120112",	"97",	"67",	"20"),
("5931120139",	"-2",	"76",	"103"),
("5931120020",	"14",	"35",	"22"),
("5931120053",	"12",	"-5",	"57"),
("5931120015",	"84",	"30",	"-6"),
("5931120082",	"85",	"66",	"8"),
("5931120052",	"11",	"27",	"99");


/*----------UPDATES----------*/

#Hacerlos mayusculas
UPDATE alumnos SET NOMBRES = UPPER(NOMBRES);
UPDATE alumnos SET APELLIDOS = UPPER(APELLIDOS);

/*---------CONSULTAS---------*/

--Estudiante con mejor promedio
SELECT alumnos.*, (EX1 + EX2 + EX3)/3 AS PROMEDIO
FROM alumnos INNER JOIN notas ON alumnos.MATRICULA = notas.IDALUMNO
ORDER BY PROMEDIO DESC
LIMIT 1;

--ESTUDIANTE CON PEOR PROMEDIO
SELECT alumnos.*, (EX1 + EX2 + EX3)/3 AS PROMEDIO
FROM alumnos INNER JOIN notas ON alumnos.MATRICULA = notas.IDALUMNO
ORDER BY PROMEDIO ASC
LIMIT 1;

--ESTUDIANTE CON MAYOR Y CON MENOR PROMEDIO EN PANTALLA.
SELECT alumnos.*, (EX1 + EX2 + EX3)/3 AS PROMEDIO
FROM alumnos INNER JOIN notas ON alumnos.MATRICULA = notas.IDALUMNO
;

--LISTADO DE LOS 10 ESTUDIANTES CON MEJOR PROMEDIO
SELECT alumnos.*, (EX1 + EX2 + EX3)/3 AS PROMEDIO
FROM alumnos INNER JOIN notas ON alumnos.MATRICULA = notas.IDALUMNO
ORDER BY PROMEDIO DESC
LIMIT 10;

--LISTADO DE LOS 10 ESTUDIANTES CON PEOR PROMEDIO
SELECT alumnos.*, (EX1 + EX2 + EX3)/3 AS PROMEDIO
FROM alumnos INNER JOIN notas ON alumnos.MATRICULA = notas.IDALUMNO
ORDER BY PROMEDIO ASC
LIMIT 10;

--NUMERO DE ESTUDIANTES POR DEBAJO Y POR ENCIMA DEL PROMEDIO
SELECT *, AVG(PROMEDIO) AS PROMTOTAL
FROM notas
WHERE PROMTOTAL < (SELECT *, (EX1 + EX2 + EX3)/3 AS PROMEDIO
       FROM notas
      )
;

--PROMEDIO GENERAL POR EXAMEN
SELECT AVG(EX1) AS PROM_EX1, AVG(EX2) AS PROM_EX2, AVG(EX3) AS PROM_EX3,
       COUNT(IDALUMNO) AS CANT_ESTUDIANTES
FROM notas;

--LISTADO DE ESTUDIANTE CON PROMEDIO AGRUPADO POR ESTADO DE FORMA ASCEDENTE
SELECT alumnos.*, ((EX1 + EX2 + EX3)/3) AS PROMEDIO,
       CASE WHEN ((EX1 + EX2 + EX3)/3) < 60
          THEN "DEFICIENTE" ELSE
       CASE WHEN ((((EX1 + EX2 + EX3)/3) > 60) && (((EX1 + EX2 + EX3)/3) < 80))
          THEN "ACEPTABLE" ELSE
       CASE WHEN (((EX1 + EX2 + EX3)/3) > 80 && ((EX1 + EX2 + EX3)/3) < 90)
          THEN "SOBRESALIENTE" ELSE
       CASE WHEN (((EX1 + EX2 + EX3)/3) > 90)
          THEN "EXCELENTE"
       END END END END AS ESTADO
FROM alumnos INNER JOIN notas ON alumnos.MATRICULA = notas.IDALUMNO
GROUP BY PROMEDIO ASC;

--LISTAR LOS ESTUDIANTES QUE PERDIERON LA MATERIA (PROMEDIO DEFICIENTE)
SELECT alumnos.*, ((EX1 + EX2 + EX3)/3) AS PROMEDIO,
       CASE WHEN ((EX1 + EX2 + EX3)/3) < 60
          THEN "DEFICIENTE" ELSE
       CASE WHEN ((((EX1 + EX2 + EX3)/3) > 60) && (((EX1 + EX2 + EX3)/3) < 80))
          THEN "ACEPTABLE" ELSE
       CASE WHEN (((EX1 + EX2 + EX3)/3) > 80 && ((EX1 + EX2 + EX3)/3) < 90)
          THEN "SOBRESALIENTE" ELSE
       CASE WHEN (((EX1 + EX2 + EX3)/3) > 90)
          THEN "EXCELENTE"
       END END END END AS ESTADO
FROM alumnos INNER JOIN notas ON alumnos.MATRICULA = notas.IDALUMNO
HAVING ESTADO = "DEFICIENTE";

--LISTAR LOS ALUMNOS POR ORDEN ALFABÉTICO (PRIMERO APELLIDOS, DESPUÉS LOS NOMBRES)
SELECT *
FROM alumnos
ORDER BY NOMBRES, APELLIDOS ASC;

--LISTAR LAS NOTAS DE UN ESTUDIANTE ESPECIFICO (SEGUN LA MATRICULA)
SELECT *
FROM alumnos INNER JOIN notas ON alumnos.MATRICULA = notas.IDALUMNO
WHERE MATRICULA = '?';

--LISTAR LOS ALUMNOS QUE TUVIERON UN PROMEDIO POR ENCIMA DE X
SELECT alumnos.*, (EX1 + EX2 + EX3)/3 AS PROMEDIO
FROM alumnos INNER JOIN notas ON alumnos.MATRICULA = notas.IDALUMNO
HAVING PROMEDIO > '?';

--LISTAR LOS ALUMNOS QUE TUVIERON UN PROMEDIO POR ENCIMA/DEBAJO DE X
SELECT alumnos.*, (EX1 + EX2 + EX3)/3 AS PROMEDIO
FROM alumnos INNER JOIN notas ON alumnos.MATRICULA = notas.IDALUMNO
HAVING PROMEDIO < '?';

--LISTAR LOS ESTUDIANTES QUE PERDIERON X EXAMEN
SELECT *
FROM alumnos
WHERE '?' < 60;
