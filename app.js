/*
IMPORTANTE INSTALAR
npm i yargs colors --save
nmp i csvtojson --save
 */
const argv = require('./config/yargs').argv;
const tareas = require('./controlador/tareas');
const colors = require('colors');
let comando = argv._[0];

switch (comando) {
    case 'publicar':
        let tarea = tareas.imprimir(argv.file, argv.country, argv.year);
        break;
    case 'guardar':
        let cuaderno = tareas.envJson(argv.out)
            //console.log(`Datos Guardados en ${cuaderno}`);
        break;
    default:
        console.log('Comando no reconocido');
}


//node app publicar -f 'API_IT.CEL.SETS_DS2_es_csv_v2_1004854.csv' -c 'ECU' -y '2015'
