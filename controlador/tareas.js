const fs = require('fs')
const http = require('http');
const estadisticas = require('../controlador/estadisticas');
const hostname = '127.0.0.1';
const port = 3000;

async function datos(path, country, year) {
    let datos = estadisticas.consulta(path, country, year)
    var respuesta = await datos
    return respuesta;
}
async function imprimir(path, country, year) {
    datos(path, country, year)
        .then((dato) => {
            if (dato.length > 0) {
                console.log(" -----------------------------------------------------------------------------------------".bgGreen);
                console.log("| ".bgGreen + `\n` + "| ".bgGreen + "    " + `::::Archivo ${path} cargado correctamente::::`.bgCyan);
                for (let i of dato) {
                    if (i.key == "info") {
                        console.log("| ".bgGreen + `     Codigo pais: `.brightYellow + `${i.Cod}`.brightCyan);
                        console.log("| ".bgGreen + `     Año: `.brightYellow + `${i.Anio}`.brightCyan);
                        console.log("| ".bgGreen + `     Total Suscripciones para  ${i.cod}: `.brightYellow + `${i.Suscripcion}`.brightCyan);
                        console.log("| ".bgGreen + `     La media de suscripciones de todos los países es: `.brightYellow + `${i.MediaGlobal}`.brightCyan);
                        console.log("| ".bgGreen + `     ${i.Estado}`.brightCyan);
                    }
                }
                console.log(`------ Cinco países por ENCIMA del valor de suscripciones de ${country} -----`.magenta);
                for (let i of dato) {
                    if (i.key == "tp5may") {
                        console.log("| ".bgGreen + `     Pais: `.brightYellow + `${i.Pais}`.brightCyan);
                        console.log("| ".bgGreen + `     Cod: `.brightYellow + `${i.Cod}`.brightCyan);
                        console.log("| ".bgGreen + `     Suscripciones: `.brightYellow + `${i.Suscripciones}\n`.brightCyan + "| ".bgGreen);
                    }
                }
                console.log(`------ Cinco países por DEBAJO del valor de suscripciones de ${country} -----`.magenta);
                for (let i of dato) {
                    if (i.key == "tp5min") {
                        console.log("| ".bgGreen + `     Pais: `.brightYellow + `${i.Pais}`.brightCyan);
                        console.log("| ".bgGreen + `     Cod: `.brightYellow + `${i.Cod}`.brightCyan);
                        console.log("| ".bgGreen + `     Suscripciones: `.brightYellow + `${i.Suscripciones}\n`.brightCyan + "| ".bgGreen);
                    }

                }

                console.log(`------ TOP 5 de países con suscripciones mas alta en el año ${year} ----`.magenta);
                for (let i of dato) {
                    if (i.key == "tp5") {
                        console.log("| ".bgGreen + `     Pais: `.brightYellow + `${i.Pais}`.brightCyan);
                        console.log("| ".bgGreen + `     Suscripciones: `.brightYellow + `${i.Suscripciones}\n`.brightCyan + "| ".bgGreen);
                    }
                }
                console.log(" -----------------------------------------------------------------------------------------".bgGreen);
                let kevin = JSON.stringify(dato);
                const server = http.createServer((req, res) => {
                    res.statusCode = 200;
                    res.end(`<html>
                                <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                                <head>
                                <meta charset="UTF-8">
                                <title>Estadisticas</title>
                                <style type="text/css">
                                    .tg  {margin: 0 auto; border-collapse:collapse;border-color:#aaa;border-spacing:0;border-style:solid;border-width:1px;}
                                    .tg td{background-color:#fff;border-color:#aaa;border-style:solid;border-width:0px;color:#333;
                                    font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;}
                                    .tg th{background-color:#f38630;border-color:#aaa;border-style:solid;border-width:0px;color:#fff;
                                    font-family:Arial, sans-serif;font-size:14px;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
                                    .tg .tg-201p{background-color:#FCFBE3;font-size:14px;font-weight:bold;text-align:left;vertical-align:top}
                                    .tg .tg-scrz{background-color:#ffffff;color:#000000;font-weight:bold;text-align:center;vertical-align:top}
                                    .tg .tg-dg7a{background-color:#FCFBE3;text-align:left;vertical-align:top}
                                    .tg .tg-na3a{font-size:14px;font-weight:bold;text-align:left;vertical-align:top}
                                    .tg .tg-0lax{text-align:left;vertical-align:top}
                                    .tg .tg-2e0g{background-color:#ffffff;border-color:#000000;color:#3531ff;font-weight:bold;text-align:center;vertical-align:top}
                                </style>

                                </head>
                                <body>
                                <h1 style="text-align: center;">PROYECTO I PARCIAL</h1>
                                <h2 style="text-align: center;">Estadisticas de suscripciones a telefonía celular móvil</h2>
                                <div id="datosPersona" style="text-align:center;">
                                <table class="tg"></table>
                                </div>
                                
                                <script>
                                function cargarDatos(){
                                    var Datos = JSON.parse(${JSON.stringify(kevin)});
                                    $(".tg").append(
                                        '<thead>'+
                                            '<tr>'+
                                                '<th class="tg-scrz" colspan="2">DATOS</th>'+
                                            '</tr>'+
                                        '</thead>'
                                    );
                                    $(".tg").append('<tbody>');
                                    for(let i of Datos){
                                        if (i.key == "info") {
                                            $(".tg").append(
                                                '<tr>' +
                                                    '<td class="tg-201p">Codigo pais:</td>'+
                                                    '<td class="tg-dg7a">' + i.Cod + '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td class="tg-201p">Año:</td>'+
                                                    '<td class="tg-dg7a">' + i.Anio +
                                                '</tr>'+
                                                '<tr>' +
                                                    '<td class="tg-201p">'+'Total Suscripciones para:'+i.Cod+'</td>'+
                                                    '<td class="tg-dg7a">' + i.Suscripcion + '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td class="tg-201p">La media de suscripciones de todos los países es: </td>'+
                                                    '<td class="tg-dg7a">' + i.MediaGlobal+
                                                '</tr>'+
                                                '<td class="tg-201p">Estado: </td>'+
                                                '<td class="tg-dg7a">' + i.Estado+
                                            '</tr>'
                                            );
                                        }     
                                    }
                                    $(".tg").append(
                                        '<tr>'+
                                            '<td class="tg-2e0g" colspan="2">'+'Cinco países por ENCIMA del valor de suscripciones de '+Datos[0].Cod+'</td>'+
                                        '</tr>'
                                    );
                                                for(let i of Datos){
                                                    if (i.key =="tp5may") {
                                                        $(".tg").append(
                                                            '<tr>' +
                                                                '<td class="tg-201p">Pais:</td>'+
                                                                '<td class="tg-dg7a">' + i.Pais + '</td>'+
                                                            '</tr>'+
                                                            '<tr>'+
                                                                '<td class="tg-201p">Suscripciones:</td>'+
                                                                '<td class="tg-dg7a">' + i.Suscripciones +
                                                            '</tr>'
                                                        );
                                                    }
                                                }
                                                $(".tg").append(
                                                    '<tr>'+
                                                        '<td class="tg-2e0g" colspan="2">'+'Cinco países por DEBAJO del valor de suscripciones de '+Datos[0].Cod+'</td>'+
                                                    '</tr>'
                                                );
                                                for(let i of Datos){
                                                    if (i.key =="tp5min") {
                                                        if(i.Suscripciones>0){
                                                            console.log(i)
                                                        }
                                                        $(".tg").append(
                                                            '<tr>' +
                                                                '<td class="tg-201p">Pais:</td>'+
                                                                '<td class="tg-dg7a">' + i.Pais + '</td>'+
                                                            '</tr>'+
                                                            '<tr>'+
                                                                '<td class="tg-201p">Suscripciones:</td>'+
                                                                '<td class="tg-dg7a">' + i.Suscripciones +
                                                            '</tr>'
                                                        );
                                                    }
                                                }
                                                $(".tg").append(
                                                    '<tr>'+
                                                        '<td class="tg-2e0g" colspan="2">'+'TOP 5 de países con suscripciones mas alta en el año '+Datos[0].Anio+'</td>'+
                                                    '</tr>'
                                                );
                                                for(let i of Datos){
                                                    if (i.key =="tp5") {
                                                        $(".tg").append(
                                                            '<tr>' +
                                                                '<td class="tg-201p">Pais:</td>'+
                                                                '<td class="tg-dg7a">' + i.Pais + '</td>'+
                                                            '</tr>'+
                                                            '<tr>'+
                                                                '<td class="tg-201p">Suscripciones:</td>'+
                                                                '<td class="tg-dg7a">' + i.Suscripciones +
                                                            '</tr>'
                                                        );
                                                    } 
                                                }
                                    $(".tg").append('</tbody>');
                                }                    
                                </script>
                                <button type="button" onclick="cargarDatos()">
                                Visualizar
                                </button>
                                
                                </body>
                                </html>
                            `);
                });
                server.listen(port, hostname, () => {
                    console.log(`Server running at http://${hostname}:${port}/`);
                });
            } else if (dato.length == 0) {
                console.log(`     No existe paises con suscripcion mayor a cero para el año: ${year} `.brightRed);

            }
        })
}

async function guardar(path, cod, year, out) {
    let informacion = [];
    datos(path, cod, year)
        .then((dato) => {
            for (let i of dato) {
                if (i.key == "info") {
                    let medi = {
                        Cod: cod,
                        Anio: year,
                        Suscripcion: Number(i.Suscripcion),
                        MediaGlobal: Number(i.MediaGlobal),
                        Estado: i.Estado,
                        key: "info"
                    }
                    informacion.push(medi)
                }

            }

            for (let i of dato) {
                if (i.key == "tp5may") {
                    let tp5M = {
                        Pais: i.Pais,
                        Cod: i.Cod,
                        Suscripciones: i.Suscripciones,
                        Descripcion: `País por ENCIMA del valor de suscripciones de ${i.Cod}`,
                    }
                    informacion.push(tp5M)
                }
            }
            for (let i of dato) {
                if (i.key == "tp5min") {
                    let tp5min = {
                        Pais: i.Pais,
                        Cod: i.Cod,
                        Suscripciones: i.Suscripciones,
                        Descripcion: `País por Debajo del valor de suscripciones de ${i.cod}`,
                    }
                    informacion.push(tp5min)
                }
            }
            for (let i of dato) {
                if (i.key == "tp5") {
                    let tp5 = {
                        Pais: i.Pais,
                        Suscripciones: i.Suscripciones,
                        Descripcion: `TOP 5 de países con suscripciones mas alta en el año ${year}`,
                    }
                    informacion.push(tp5)
                }
            }
            fs.writeFileSync(`./modelo/${out}.json`, JSON.stringify(informacion));
            console.log("Informacion guardada".bgGreen);
        })
}

module.exports = {
    imprimir,
    guardar
}