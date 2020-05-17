let path = 'API_IT.CEL.SETS_DS2_es_csv_v2_1004854.csv';
const csv = require("csvtojson");
const colors = require('colors');
const fs = require("fs");

async function getData(file) {
    try {
        const datos = await csv().fromFile(file);
        let data = []
        for (var i = 2; i < datos.length; i++) {
            data.push(datos[i])
        }
        return data;
    } catch (error) {
        error = "Error 200"
        return error;
    }
}
async function getCountry(pais, cod) {
    for (var i = 0; i < pais.length; i++) {
        let va = Object.values(pais[i]);
        if (va[1] == cod) {
            return true
        }
    }
}

async function getSuscrip(pais, cod, year) {
    for (var i = 0; i < pais.length; i++) {
        let va = Object.values(pais[i]);
        if (va[1] == cod) {
            suscrip = va[year - 1956]
            return suscrip
        }
    }
}

async function getMedia(pais, year) {
    let sum = 0;
    let prom = 0
    for (var i = 0; i < pais.length; i++) {
        let va = Object.values(pais[i]);
        let num = Number(va[year - 1956])
        if (num > 0) {
            prom++;
            sum = sum + num;
        }
    }
    if (prom > 0) {
        prom = (sum / prom).toFixed(3)
        return prom
    }
}
async function getTop5Mayor(pais, year, suscriPais) {
    let top = [];
    for (let dato of pais) {
        dato = Object.values(dato);
        suscrip = Number(dato[year - 1956]);
        if (suscrip > suscriPais) {
            let datos = {
                Pais: dato[0],
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
async function getTop5Menor(pais, year, suscriPais) {
    let top = [];
    for (let dato of pais) {
        dato = Object.values(dato);
        suscrip = Number(dato[year - 1956]);
        if (suscrip < suscriPais) {
            let datos = {
                Pais: dato[0],
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
async function getTop5(pais, year) {
    let top = [];
    let num = 0;
    for (let dato of pais) {
        dato = Object.values(dato);
        suscrip = Number(dato[year - 1956]);
        if (suscrip > num) {
            let datos = {
                Pais: dato[0],
                Suscripciones: suscrip
            }
            top.push(datos);
        }
        num = suscrip;
        top.sort(function(a, b) {
            return (b.Suscripciones - a.Suscripciones)
        })
        top = top.slice(0, 5)
    }
    return top
}





//Ayuda a escribir lo q esta en el vector ; vect
const envJson = (out) => {

    let data1 = JSON.stringify(vect1);
    fs.writeFile(`./modelo/${out}.json`, data1, (err) => {
        console.log(`Datos Guardados en en archivo: ${out}.json`.brightCyan);
        if (err) throw new Error("No se pudo grabar", err);
    });
}



const guardar = (out) => {

    vect.push(top);
    escribirjson(out);
};




async function imprimir(path, cod, year) {
    let pais = await getData(path);
    if (pais != "Error 200") {
        let Country = await getCountry(pais, cod);
        if (Country == true) {
            if (year >= 1964 && year <= 2019) {
                console.log(" -----------------------------------------------------------------------------------------".bgGreen);
                console.log("| ".bgGreen + `\n` + "| ".bgGreen + "    " + `::::Archivo ${path} cargado correctamente::::`.bgCyan);
                console.log("| ".bgGreen + `     Pais: `.brightYellow + `${cod}`.brightCyan);
                console.log("| ".bgGreen + `     Año: `.brightYellow + `${year}`.brightCyan);

                let vect = {};
                vect.codigo = cod
                vect1.anos = year
                console.log(vect);

                getSuscrip(pais, cod, year)
                    .then((suscriPais) => {
                        getMedia(pais, year, suscriPais)
                            .then((med) => {
                                console.log("| ".bgGreen + `     La media de suscripciones de todos los países es: `.brightYellow + `${(med)}`.brightCyan);


                            })
                        getTop5Mayor(pais, year, suscriPais)
                            .then((tp5May) => {
                                console.log(`------ Cinco países por ENCIMA del valor de suscripciones de ${cod} -----`.magenta);
                                for (let i of tp5May) {
                                    if (i.Suscripciones > 0) {
                                        console.log("| ".bgGreen + `     Pais: `.brightYellow + `${i.Pais}`.brightCyan);
                                        console.log("| ".bgGreen + `     Suscripciones: `.brightYellow + `${i.Suscripciones}\n`.brightCyan + "| ".bgGreen);
                                    }
                                }

                            })
                        getTop5Menor(pais, year, suscriPais)
                            .then((tp5Men) => {
                                console.log(`------ Cinco países por DEBAJO del valor de suscripciones de ${cod} -----`.magenta);
                                for (let i of tp5Men) {
                                    if (i.Suscripciones > 0) {
                                        console.log("| ".bgGreen + `     Pais: `.brightYellow + `${i.Pais}`.brightCyan);
                                        console.log("| ".bgGreen + `     Suscripciones: `.brightYellow + `${i.Suscripciones}\n`.brightCyan + "| ".bgGreen);

                                    }

                                }
                            })
                        getTop5(pais, year)
                            .then((tp5) => {
                                console.log(`------ TOP 5 de países con suscripciones mas alta ----`.magenta);
                                for (let i of tp5) {
                                    console.log("| ".bgGreen + `     Pais: `.brightYellow + `${i.Pais}`.brightCyan);
                                    console.log("| ".bgGreen + `     Suscripciones: `.brightYellow + `${i.Suscripciones}\n`.brightCyan + "| ".bgGreen);
                                }
                                console.log(" -----------------------------------------------------------------------------------------".bgGreen);
                            })

                    })

            } else {
                console.log('\n     ' + `Al momento no existe registros para el año: ${year} `.bgRed);
            }
        } else {
            console.log('\n     ' + `No existe el codigo de pais: ${cod} en la base de datos. `.bgRed);
        }
    } else {
        console.log(`\n `, `::::No existe el archivo ${path} !::::`.bgRed)
    }


    console.log(`DDDDDDDDDDDDDDDDDDDDDDDDDDDDD`, vect1);


}

module.exports = {
    imprimir,
    envJson
}
