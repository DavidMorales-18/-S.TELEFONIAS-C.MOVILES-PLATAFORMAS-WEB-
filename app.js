/*
IMPORTANTE INSTALAR
npm i yargs colors --save
nmp i csvtojson --save

IMPORTANTE NO ELIMINAR ISO-3166-ALPHA-3.json DE LA CARPETA MODELO
CONTIENE LOS CODIGOS DE PAISES NORMA ISO-3166-ALPHA-3 ACTUALES

FORMA PARA PUBLICAR
node app.js publicar -f "./nombre_archivo.csv" -c "codigo_pais" -y año

para visualizar en la web, abra su navegador preferigo e ingrese localhost:3000

FORMA PARA GUARDAR

node app.js guardar -f "./nombre_archivo.csv" -c "codigo_pais" -y año -o "nomre_archivo_sin_extension"
 */
const argv = require('./config/yargs').argv;
const tareas = require('./controlador/tareas');
const estadisticas = require('./controlador/estadisticas');
const colors = require('colors');
let comando = argv._[0];




switch (comando) {
    case 'publicar':
        let consulta = tareas.imprimir(argv.file, argv.country, argv.year);
        break;
    case 'guardar':
        let guardar = tareas.guardar(argv.file, argv.country, argv.year, argv.out);
        break;
    default:
        console.log('Comando no reconocido');
}