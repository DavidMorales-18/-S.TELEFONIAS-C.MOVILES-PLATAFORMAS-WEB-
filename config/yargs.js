const file = {
    demand: true,
    alias: 'f',
    desc: 'Path del archivo csv'
}

const country = {
    demand: true,
    alias: 'y',
    desc: 'Codigo del país'
}

const year = {
    default: true,
    alias: 'y',
    desc: 'Año de suscripción'
}
const out = {
    demand: true,
    alias: 'o',
    desc: 'Nombre del archivo JSON'
}
const argv = require('yargs')
    .command('publicar', 'Publicar estadistica', {
        descripcion
    })
    .command('guardar', 'Almacenar resultados de las estadísticas ', {
        out
    })
    .argv;

//exportamos el modulo
module.exports = {
    argv
}