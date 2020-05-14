const csv = require("csvtojson");
var fs = require("fs");
const colors = require('colors');
const cargarData = (file) => {
    const csvFilePath = file
    datos = csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            let data = JSON.stringify(jsonObj);
            fs.writeFile('modelo/data.json', data, (err) => {
                if (err) throw new Error('No se pudo guardar la infomacion', err);
            })
        })
}

let array;
const cargarDB = () => {
    array = JSON.parse(fs.readFileSync('modelo/data.json'));
    return array;
}

function suscripciones(country, year) {
    cargarDB();
    for (let dato of array) {
        dato = Object.values(dato);
        if (dato[61] == country) {
            suscrip = dato[year - 1960]
        }
    }
    return suscrip;
}

function mediaPaises(year) {
    cargarDB();
    let count = 0;
    let sum = 0;
    for (let dato of array) {
        dato = Object.values(dato);
        numero = Number(dato[year - 1960]);

        if (numero > 0) {
            count = count + 1;
            sum = sum + numero;
            media = sum / count;
            media = media.toFixed(2)
        }
    }
    return media;
}

function mayorOmenor(num1, num2) {
    if (num1 > num2) {
        resp = "El numero de suscripciones es mayor a la media mundial. ";
        return resp;
    } else {
        resp = "El numero de suscripciones es menor a la media mundial. ";
        return resp;
    }
}

function top5mayor(year, country) {
    cargarDB();
    num = suscripciones(country, year);
    let top = [];
    for (let dato of array) {
        dato = Object.values(dato);
        suscrip = Number(dato[year - 1960]);
        if (suscrip > num) {
            let datos = {
                Pais: dato[60],
                Suscripciones: suscrip
            }
            top.push(datos);
        }
        top.sort(function(a, b) {
            return (a.Suscripciones - b.Suscripciones)
        })
        top = top.slice(0, 5)
    }
    return top

}

function top5menor(year, country) {
    cargarDB();
    num = suscripciones(country, year);
    let top = [];
    for (let dato of array) {
        dato = Object.values(dato);
        suscrip = Number(dato[year - 1960]);
        if (suscrip < num) {
            let datos = {
                Pais: dato[60],
                Suscripciones: suscrip
            }
            top.push(datos);
        }
        top.sort(function(a, b) {
            return (b.Suscripciones - a.Suscripciones)
        })
        top = top.slice(0, 5)
    }
    return top
}
//-----------------------------

const metodoUno = (file, country, year) => {
    fs.stat(file, function(err) {
        if (!err) {
            console.log(`::::Archivo ${file} cargado correctamente::::`.bgCyan);
            cargarData(file);
            if (year == true) {
                year = 2018;
            }
            if (year >= 1960 && year <= 2019) {
                console.log("-------------------------------------------------------------------------".bgGreen);
                console.log("|".bgGreen + `     Pais: `.brightYellow + `${country}`.brightCyan);
                console.log("|".bgGreen + `     Año: `.brightYellow + `${year}`.brightCyan);
                console.log("|".bgGreen + `     Numero de suscripciones: `.brightYellow + `${suscripciones(country, year)}`.brightCyan);
                console.log("|".bgGreen + `     La media de suscripciones de todos los países: `.brightYellow + `${mediaPaises(year) }`.brightCyan);
                console.log("|".bgGreen + `     ${mayorOmenor(suscripciones(country, year), mediaPaises(year)) }`.brightCyan);
                console.log(`------ Cinco países por ENCIMA del valor de suscripciones de ${country} -----`.green);
                for (let tarea of top5mayor(year, country)) {
                    console.log("|".bgGreen + `     Pais: `.brightYellow + `${tarea.Pais }`.brightCyan);
                    console.log("|".bgGreen + `     Suscripciones: `.brightYellow + `${tarea.Suscripciones }\n`.brightCyan + "|".bgGreen);
                }
                console.log(`------ Cinco países por DEBAJO del valor de suscripciones de ${country} -----`.magenta);
                for (let tarea of top5menor(year, country)) {
                    console.log("|".bgGreen + `     Pais: `.brightYellow + `${tarea.Pais }`.brightCyan);
                    console.log("|".bgGreen + `     Suscripciones: `.brightYellow + `${tarea.Suscripciones }\n`.brightCyan + "|".bgGreen);
                }
                console.log("-------------------------------------------------------------------------".bgGreen);

            } else {
                console.log('::::  AÑO INGRESADA INCORRECTO, '.bgRed + 'RANGO DE AÑOS 1690-2019 '.bgBlue + ' !::::'.bgRed);
            }
            try {

            } catch (error) {
                console.log("Error");

            }
        } else if (err.code === 'ENOENT') {
            console.log('::::  No existe el archivo, ¡NOTA carguelo de esta forma: '.bgRed + './data.csv '.bgBlue + ' !::::'.bgRed);
        }
    });

}

module.exports = {
    metodoUno
}