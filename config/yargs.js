const file = {
    demand: true,
    alias: 'f',
    desc: 'Path del archivo csv'
}

const country = {
    demand: true,
    alias: 'c',
    desc: 'Codigo del país'
}

const year = {
    default: 2018,
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
        file,
        country,
        year

    })
    .command('guardar', 'Almacenar resultados de las estadísticas ', {
        file,
        country,
        year,
        out
    })
    .argv;

//exportamos el modulo
module.exports = {
    argv
}