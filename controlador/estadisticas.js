const csv = require("csvtojson");
const colors = require('colors');
const fs = require('fs')

async function getData(file) {
    try {
        const datos = await csv().fromFile(file);
        let data = []
        var codes = JSON.parse(fs.readFileSync('./modelo/ISO-3166-ALPHA-3.json', 'utf8'));
        for (let dat of datos) {
            dat = Object.values(dat);
            for (let cod of codes) {
                if (dat[1] == cod.countryCode) {
                    data.push(dat);
                }
            }
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
    } else {
        return 0
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
                Cod: dato[1],
                Suscripciones: suscrip,
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
        if (Number(suscrip) > 0) {
            if (suscrip < suscriPais) {
                let datos = {
                    Pais: dato[0],
                    Cod: dato[1],
                    Suscripciones: suscrip,
                }
                top.push(datos);
            }
            top.sort(function(a, b) {
                return (b.Suscripciones - a.Suscripciones)
            })
            top = top.slice(0, 5)
        }
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
                Cod: dato[1],
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

async function consulta(path, cod, year) {
    let informacion = [];
    let pais = await getData(path);
    if (pais != "Error 200") {
        let Country = await getCountry(pais, cod);
        if (Country == true) {
            if (year >= 1964 && year <= 2019) {
                getSuscrip(pais, cod, year)
                    .then((suscriPais) => {
                        getMedia(pais, year, suscriPais)
                            .then((med) => {
                                if (med > 0) {
                                    let estado;
                                    if (Number(med) > suscriPais) {
                                        estado = `El valor de las suscripciones de ${cod} es menor a la media mundial.`
                                    } else {
                                        estado = `El valor de las suscripciones de ${cod} es mayor a la media mundial.`
                                    }
                                    let medi = {
                                        Cod: cod,
                                        Anio: year,
                                        Suscripcion: Number(suscriPais),
                                        MediaGlobal: Number(med),
                                        Estado: estado,
                                        key: "info"
                                    }
                                    informacion.push(medi)
                                    getTop5Mayor(pais, year, suscriPais)
                                        .then((tp5May) => {
                                            if (tp5May.length > 0) {
                                                for (let i of tp5May) {
                                                    let tp5M = {
                                                        Pais: i.Pais,
                                                        Cod: i.Cod,
                                                        Suscripciones: i.Suscripciones,
                                                        Descripcion: `País por ENCIMA del valor de suscripciones de ${cod}`,
                                                        key: "tp5may"
                                                    }
                                                    informacion.push(tp5M)
                                                }
                                            }
                                        })
                                    getTop5Menor(pais, year, suscriPais)
                                        .then((tp5Men) => {
                                            if (tp5Men.length > 0) {

                                                for (let i of tp5Men) {
                                                    let tp5 = {
                                                        Pais: i.Pais,
                                                        Cod: i.Cod,
                                                        Suscripciones: i.Suscripciones,
                                                        Descripcion: `País por Debajo del valor de suscripciones de ${cod}`,
                                                        key: "tp5min"
                                                    }
                                                    informacion.push(tp5)
                                                }
                                            }
                                        })
                                    getTop5(pais, year)
                                        .then((tp5) => {
                                            for (let i of tp5) {
                                                let tp5 = {
                                                    Pais: i.Pais,
                                                    Suscripciones: i.Suscripciones,
                                                    Descripcion: `TOP 5 de países con suscripciones mas alta en el año ${year}`,
                                                    key: "tp5"
                                                }
                                                informacion.push(tp5)
                                            }
                                            return informacion;
                                        })
                                }
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
    return await informacion;

}

module.exports = {
    consulta
}