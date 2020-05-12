const csv = require("csvtojson");
var fs = require("fs");
const colors = require('colors');
var data;

const cargarData = (file) => {
    fs.stat(file, function(err) {
        if (!err) {
            console.log(`::::Archivo ${file} cargado correctamente::::`.bgGreen);
            const csvFilePath = file
            csv()
                .fromFile(csvFilePath)
                .then((jsonObj) => {
                    console.log(jsonObj);
                })
        } else if (err.code === 'ENOENT') {
            console.log('::::No existe el archivo !NOTA carguelo de esta forma ./data.csv::::'.bgRed);
        }
    });
}


/*Funcion flecha listar*/
module.exports = {
    cargarData

}