

# PROYECTO: Aplicación en NodeJS que permita leer los datos de las Suscripciones a telefonía celular móvil
_Es una Aplicación en NodeJS que permita leer los datos de las Suscripciones a telefonía celular móvil, la aplicacion debe de cumplir tanto (Requerimientos funcionales) y (Requerimientos no funcionales)_


```
Requerimientos funcionales:

• La media de suscripciones de todos los países en el año especificado.
• Establecer si el valor de las suscripciones del país determinado, es mayor o menor a la media mundial.
• Los cinco países por encima del valor de suscripciones del país determinado.
• Los cinco países por debajo del valor de suscripciones del país determinado.
• El top cinco de países para el año especificado.
```
```
Requerimientos no funcionales:

La aplicación dispone de dos comandos. Independientemente del comando que se ejecute, el programa debe mostrar los resultados en la terminal (utilizar colores). Considerar las validaciones correspondientes para todos los parámetros de los comandos.
El primer comando es publicar. Este comando publicará las estadísticas en una página web básica. Se requieren de tres parámetros:

• --file -f: Permite establecer el path del archivo CSV que contiene los datos a analizar
• --country -c: Permite determinar el país a analizar a través de su código ISO 3166 ALPHA-3.
• --year -y: Permite especificar el año para el cual se requiere las estadísticas. Por defecto, 2018.

El segundo comando es guardar. Este comando almacenará los resultados de las estadísticas en un archivo json. Recibe los mismos parámetros que el comando anterior, y se adiciona la siguiente opción:

• --out -o: Establece el nombre del archivo donde se almacenará los resultados.

```


### Pre-requisitos 📋
-El usuario para poder ejecutar el programa debe de tener los siguiente requisitos:
```
_1. Windows 7,8,10 de 64 bits o 32 bits ; Ubuntu,Debian de 64 bits ;MAC macOS 10.10_
```
```
_2. Visual Studio Code ultima (versión 1.45)_
```
```
_3. Node.js®  (versión 12.16.3LTS)_
```


### Instalación 🔧

_[Descarga_Proyecto] (https://github.com/DavidMorales-18/-S.TELEFONIAS-C.MOVILES-PLATAFORMAS-WEB-)
```
Una vez descargado el proyecto procedemos a descomprimrilo y subir a nuestro Visual Studio Code entonces inicializaremos a configurar el proyecto.
```
Instalaciónes: 
```
a. npm init (Para inicializar cualquier proyecto)
```
```
b. npm i yargs colors --save
```
```
c. nmp i csvtojson --save
```
```
b. npm i file-system --save
```

## Ejecutando las pruebas ⚙️

### FORMA PARA PUBLICAR:
```
node app.js publicar -f "./nombre_archivo.csv" -c "codigo_pais" -y año
```
node app publicar -f './API_IT.CEL.SETS_DS2_es_csv_v2_1004854.csv' -c 'ECU' -y '2015'

```
Para visualizar en la web, abra su navegador preferigo e ingrese localhost:3000
```
### FORMA PARA GUARDAR
```
node app.js guardar -f "./nombre_archivo.csv" -c "codigo_pais" -y año -o "nomre_archivo_sin_extension"
```
node app.js guardar -f "./API_IT.CEL.SETS_DS2_es_csv_v2_1004854.csv" -c "ECU" -y 2015 -o "david"


```
_IMPORTANTE NO ELIMINAR ISO-3166-ALPHA-3.json DE LA CARPETA MODELO CONTIENE LOS CODIGOS DE PAISES NORMA ISO-3166-ALPHA-3 ACTUALES_
```
## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [Visual Studio Code](https://code.visualstudio.com/download) 
* [Node Js](https://nodejs.org/en/knowledge/javascript-conventions/what-is-json/) 


## Versionado 📌

Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/DavidMorales-18/-S.TELEFONIAS-C.MOVILES-PLATAFORMAS-WEB-).

## Autores ✒️

* **ANDRES GUEVARRA** (https://github.com/AndresGuevara01)
* **KEVIN CHANGOLUISA** (https://github.com/KevinChangoluisa)
* **MARIO SUIN** (https://github.com/marioAlbertoSuin)
* **DAVID MORALES** (https://github.com/DavidMorales-18)


