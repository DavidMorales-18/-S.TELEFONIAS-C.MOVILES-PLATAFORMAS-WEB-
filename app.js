//Importamos la libreria 
const argv = require('./config/yargs').argv;
const tareas = require('./controlador/tareas');
const colors = require('colors');
let comando = argv._[0];

switch (comando) {
    case 'publicar':
        let tarea = tareas.metodoUno(argv.file, argv.country, argv.year);
        break;
    case 'guardar':
        console.log("guardar");
        break;
    default:
        console.log('Comando no reconocido');
}