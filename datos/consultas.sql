CREATE DATABASE taller4

CREATE TABLE IF NOT EXISTS `alumnos` (
  `MATRICULA` varchar(20) NOT NULL,
  `NOMBRE` varchar(20) NOT NULL,
  PRIMARY KEY (`MATRICULA`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

CREATE TABLE IF NOT EXISTS `notas` (
  `IDALUMNO` varchar(20) NOT NULL,
  `EX1` FLOAT,
  `EX2` FLOAT,
  `EX3` FLOAT,
  PRIMARY KEY (`IDALUMNO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

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

#Hacerlos mayusculas

UPDATE alumnos SET NOMBRE = UPPER(NOMBRE)

INSERT INTO notas (`IDALUMNO`,`EX1`,`EX2`,`EX3`) VALUES
