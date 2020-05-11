//Importamos la libreria 
const argv = require('./config/yargs').argv;
const colors = require('colors');
let comando = argv._[0];

switch (comando) {
    case 'publicar':
        console.log("publicar");
        break;
    case 'guardar':
        console.log("guardar");
        break;
    default:
        console.log('Comando no reconocido');
}