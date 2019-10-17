var funcionActual;

/************* FUNCIONES EPECIALES  ****************/

function agregarLog() {
    funcionActual = form.getItemValue("funcion");
    console.log(funcionActual);
    form.setItemValue("funcion", funcionActual + "Math.log10(");
}

function agregarSQRT() {
    funcionActual = form.getItemValue("funcion");
    console.log(funcionActual);
    form.setItemValue("funcion", funcionActual + "Math.sqrt(");
}

function agregarCBRT() {
    funcionActual = form.getItemValue("funcion");
    console.log(funcionActual);
    form.setItemValue("funcion", funcionActual + "Math.cbrt(");
}

function agregarSin() {
    funcionActual = form.getItemValue("funcion");
    console.log(funcionActual);
    form.setItemValue("funcion", funcionActual + "Math.sin(");
}

function agregarCos() {
    funcionActual = form.getItemValue("funcion");
    console.log(funcionActual);
    form.setItemValue("funcion", funcionActual + "Math.cos(");
}

function agregarTan() {
    funcionActual = form.getItemValue("funcion");
    console.log(funcionActual);
    form.setItemValue("funcion", funcionActual + "Math.tan(");
}
function agregarExpo() {
    funcionActual = form.getItemValue("funcion");
    console.log(funcionActual);
    form.setItemValue("funcion", funcionActual + "**");
}

function agregarParenApertura() {
    funcionActual = form.getItemValue("funcion");
    console.log(funcionActual);
    form.setItemValue("funcion", funcionActual + "(");
}

function agregarParenCierre() {
    funcionActual = form.getItemValue("funcion");
    console.log(funcionActual);
    form.setItemValue("funcion", funcionActual + ")");
}

/************* FIN DE FUNCIONES ESPECIALES  ****************/


function trapezoidal() {
    var obj = form.getFormData();

    var h = (obj.b - obj.a) / obj.intervalos;

    var tablaTrapezoidalGrid = campo2.attachGrid();

    tablaTrapezoidalGrid.setHeader("Intervalo,X," + obj.funcion);
    tablaTrapezoidalGrid.setColumnIds("i,x,y");
    tablaTrapezoidalGrid.setColTypes("ro,ro,ro");
    tablaTrapezoidalGrid.init();

    var inicio = parseInt(obj.a, 10);
    var fin = parseInt(obj.intervalos, 10);
    var xs = inicio;

    for (var i = 0; i < fin + 1; i++) {
        var x = Math.round(xs * 100) / 100;
        var data = [i, x, eval(obj.funcion)];
        tablaTrapezoidalGrid.addRow(i, data);
        xs += h;
    }
    //var values =tablaTrapezoidalGrid.collectValues(2);
    
    // --> INICIO DE GRAFICA <--//
    var suma = 0;
    var valorInicio;
    var valorFin;
    var values = [];

    myLineChart = campo4.attachChart({
        view: "spline",
        value: "#y#",
        item: {
            borderColor: "#fbfbfb;",
            color: "#000000"
        },
        line: {
            color: "#ff9900",
            width: 2
        },
        xAxis: {
            template: "'#x#"
        },
        offset: 0,
        yAxis: {
            start: 0,
            end: valorFin,
            step: 10,
            template: function (value) {
                return value % 1 ? "" : value
            }
        }
    });

    for (var i = 0; i < fin + 1; i++) {
        //suma +=  parseInt(values[i]);
        tablaTrapezoidalGrid.forEachCell(i, function (cellObj, ind) {
            var cn = tablaTrapezoidalGrid.getColumnId(ind);// Nombre de la columna
            values[cn] = cellObj.getValue();
        });
        myLineChart.add({
            x: values.x,
            y: values.y
        });
        //console.log(values);
        if (values.x > inicio && values.i < fin) {
            suma += parseFloat(values.y);
        } else if (values.x == inicio) {
            valorInicio = parseFloat(values.y);
        } else {
            valorFin = parseFloat(values.y);
        }

    }
    
    // --> FIN DE GRAFICA <--//
    
    dataview = campo3.attachDataView({
        type: {
            //template: loadTemplate('recursos/tamplate/trapezoidal.html'),
            template: "Límite inferior: a=#limitea#<br/><br/>\n\
                      Límite superior: b=#limiteb#<br/><br/>\n\
                      Número de subintervalos: n=#intervalos#<br/><br/>\n\
                      La longitud de un subintervalo: h=#h#<br/><br/>\n\
                      <spam>Resultado final: </spam>#resultado#",
            width: 500,
            height: 180
        }
    });
    var resultado = h * ((valorInicio / 2) + suma + (valorFin / 2));

    dataview.add({
        limitea: inicio,
        limiteb: obj.b,
        intervalos: fin,
        h: h,
        resultado: resultado
    });

    console.log(valorInicio);
    console.log(valorFin);
    console.log(suma);
    //console.log(resultado);*/
}

function simpson_1_3() {

    var obj = form.getFormData();

    var h = (obj.b - obj.a) / 2;

    var tablaSimpson1_3 = campo2.attachGrid();

    tablaSimpson1_3.setHeader("Intervalo,X," + obj.funcion);
    tablaSimpson1_3.setColumnIds("i,x,y");
    tablaSimpson1_3.setColTypes("ro,ro,ro");
    tablaSimpson1_3.init();

    var inicio = parseInt(obj.a, 10);
    var fin = parseInt(obj.b, 10);
    var xs = inicio;
    var nuevaFuncion = null;

    for (var i = 0; i < fin + 1; i++) {
        var x = Math.round(xs * 100) / 100;
        if (i !== 0 && x !== fin) {
            nuevaFuncion = "4*" + "" + (obj.funcion);
        } else {
            nuevaFuncion = obj.funcion;
        }

        //Math.sqrt(x+10)

        var data = [i, x, eval(nuevaFuncion)];
        tablaSimpson1_3.addRow(i, data);
        xs += h;
        if (x === fin) {
            i = fin;
        }
        
        
    }

    var suma = 0;
    var values = [];

    for (var i = 0; i < fin + 1; i++) {
        //suma +=  parseInt(values[i]);
        tablaSimpson1_3.forEachCell(i, function (cellObj, ind) {
            var cn = tablaSimpson1_3.getColumnId(ind);// Nombre de la columna
            values[cn] = cellObj.getValue();
        });
        console.log(values);
        suma += parseFloat(values.y);
        if (parseInt(values.x) === fin) {
            i = fin;
        }
    }
    
    // --> INICIO DE GRAFICA <--//
    var suma1 = 0;
    var valorInicio;
    var valorFin;
    var values = [];

    myLineChart = campo4.attachChart({
        view: "spline",
        value: "#y#",
        item: {
            borderColor: "#fbfbfb;",
            color: "#000000"
        },
        line: {
            color: "#ff9900",
            width: 2
        },
        xAxis: {
            template: "'#x#"
        },
        offset: 0,
        yAxis: {
            start: 0,
            end: valorFin,
            step: 10,
            template: function (value) {
                return value % 1 ? "" : value
            }
        }
    });

    for (var i = 0; i < 2 + 1; i++) {
        //suma +=  parseInt(values[i]);
        tablaSimpson1_3.forEachCell(i, function (cellObj, ind) {
            var cn = tablaSimpson1_3.getColumnId(ind);// Nombre de la columna
            values[cn] = cellObj.getValue();
        });
        myLineChart.add({
            x: values.x,
            y: values.y
        });
        //console.log(values);
        if (values.x > inicio && values.i < fin) {
            suma1 += parseFloat(values.y);
        } else if (values.x == inicio) {
            valorInicio = parseFloat(values.y);
        } else {
            valorFin = parseFloat(values.y);
        }

    }
    
    // --> FIN DE GRAFICA <--//

    dataview = campo3.attachDataView({
        type: {
            //template: loadTemplate('recursos/tamplate/trapezoidal.html'),
            template: "Límite inferior: a=#limitea#<br/><br/>\n\
                      Límite superior: b=#limiteb#<br/><br/>\n\
                      La longitud de un subintervalo: h=#h#<br/><br/>\n\
                      Sumatoria: n=#suma#<br/><br/>\n\
                      <spam>Resultado final: </spam>#resultado#",
            width: 500,
            height: 180
        }
    });

    var resultado = ((suma * h) / 3);

    dataview.add({
        limitea: inicio,
        limiteb: obj.b,
        h: h,
        suma: suma,
        resultado: resultado
    });

    //console.log(h); 

}

function simpsonAbierto() {

    var obj = form.getFormData();

    if (obj.intervalos % 2 == 0) { // Si el intervalo es par, sino mnda mensaje
        var h = (obj.b - obj.a) / obj.intervalos;

        var tablaSimpsonAbierto = campo2.attachGrid();

        tablaSimpsonAbierto.setHeader("Intervalo,X," + obj.funcion);
        tablaSimpsonAbierto.setColumnIds("i,x,y");
        tablaSimpsonAbierto.setColTypes("ro,ro,ro");
        tablaSimpsonAbierto.init();

        var inicio = parseInt(obj.a, 10);
        var fin = parseInt(obj.b, 10);
        var xs = inicio;
        var nuevaFuncion = null;
        //(Math.log10(x+3))/Math.log10(10)
        for (var i = 0; i < obj.intervalos + 1; i++) {
            var x = Math.round(xs * 100) / 100;
            
            if (i !== 0 && i !== obj.intervalos) {
                if (i % 2 == 0) {
                    nuevaFuncion = "2*" + "" + (obj.funcion);
                } else {
                    nuevaFuncion = "4*" + "" + (obj.funcion);
                }
            } else {
                nuevaFuncion = obj.funcion;
            }
            
            if (i == obj.intervalos) {
                
                nuevaFuncion = obj.funcion;
                
               // console.log(obj.intervalos+" = "+i);
               // console.log(nuevaFuncion);
            
                
            }
            
            
            
            
            var valor;
             if(isNaN(eval(nuevaFuncion))){
                 valor=0;
             }else{
                 valor=eval(nuevaFuncion)
             }
            
            var data = [i, x, valor];
            tablaSimpsonAbierto.addRow(i, data);
            xs += h;
            if (x === obj.intervalos) {
                i = obj.intervalos;
            }
            
            if(i==obj.intervalos){
                break;
            }
            
        }

        var suma = 0;
        var values = [];

        for (var i = 0; i < fin + 1; i++) {
            //suma +=  parseInt(values[i]);
            tablaSimpsonAbierto.forEachCell(i, function (cellObj, ind) {
                var cn = tablaSimpsonAbierto.getColumnId(ind);// Nombre de la columna
                values[cn] = cellObj.getValue();
            });
            //console.log(values);
            suma += parseFloat(values.y);
            if (parseInt(values.x) === fin) {
                i = fin;
            }
        }
        
        // --> INICIO DE GRAFICA <--//
    var suma1 = 0;
    var valorInicio;
    var valorFin;
    var values = [];

    myLineChart = campo4.attachChart({
        view: "spline",
        value: "#y#",
        item: {
            borderColor: "#fbfbfb;",
            color: "#000000"
        },
        line: {
            color: "#ff9900",
            width: 2
        },
        xAxis: {
            template: "'#x#"
        },
        offset: 0,
        yAxis: {
            start: 0,
            end: valorFin,
            step: 10,
            template: function (value) {
                return value % 1 ? "" : value
            }
        }
    });
    
    //console.log("-->> OJO <<--");  
    var numCiclos =  obj.intervalos;
    
    for (var i = 0; i < eval(numCiclos+1) ; i++) {
        //suma +=  parseInt(values[i]);
        console.log("Vlr I:"+i+" - Num Int:"+obj.intervalos+" - Y:");
        console.log(values.x+" > "+inicio+" && "+values.i+" < "+numCiclos+1);
        
        tablaSimpsonAbierto.forEachCell(i, function (cellObj, ind) {
            var cn = tablaSimpsonAbierto.getColumnId(ind);// Nombre de la columna
            values[cn] = cellObj.getValue();
        });
        myLineChart.add({
            x: values.x,
            y: values.y
        });
        //console.log(values);
        if (values.x > inicio && values.i < eval(numCiclos+1)) {
            suma1 += parseFloat(values.y);
            console.log(parseFloat(values.y));
        } else if (values.x == inicio) {
            valorInicio = parseFloat(values.y);
            suma1 += parseFloat(values.y);
        } else {
            valorFin = parseFloat(values.y);
            
        }
        if(i==numCiclos){
            break;
            
        }
    }
    
    // --> FIN DE GRAFICA <--//
    
        dataview = campo3.attachDataView({
            type: {
                //template: loadTemplate('recursos/tamplate/trapezoidal.html'),
                template: "Límite inferior: a=#limitea#<br/><br/>\n\
                          Límite superior: b=#limiteb#<br/><br/>\n\
                          La longitud de un subintervalo: h=#h#<br/><br/>\n\
                          Sumatoria: n=#suma#<br/><br/>\n\
                          <spam>Resultado final: </spam>#resultado#",
                width: 500,
                height: 180
            }
        });

        var resultado = ((suma1*h) / 3);

        dataview.add({
            limitea: inicio,
            limiteb: obj.b,
            h: h,
            suma: suma1,
            resultado: resultado
        });

        //console.log(h); 
    } else {
        //alert("El intervalo debe ser un numero par");
        dhtmlx.alert({
            title: "Error!",
            type: "alert-error",
            text: "El intervalo debe ser un numero par"
        });
    }



}

function simpson_3_8() {

    var obj = form.getFormData();

    var h = (obj.b - obj.a) / 3;

    var tablaSimpson3_8 = campo2.attachGrid();

    tablaSimpson3_8.setHeader("Intervalo,X," + obj.funcion);
    tablaSimpson3_8.setColumnIds("i,x,y");
    tablaSimpson3_8.setColTypes("ro,ro,ro");
    tablaSimpson3_8.init();

    var inicio = parseInt(obj.a, 10);
    var fin = parseInt(obj.b, 10);
    var xs = inicio;
    var nuevaFuncion = null;

    for (var i = 0; i < fin + 1; i++) {
        var x = Math.round(xs * 100) / 100;
        if (i !== 0 && x !== fin) {
            nuevaFuncion = "3*" + "" + (obj.funcion);
        } else {
            nuevaFuncion = obj.funcion;
        }

        var valor;
        if(isNaN(eval(nuevaFuncion))){
            valor=0;
        }else{
            valor=eval(nuevaFuncion)
        }

       var data = [i, x, valor];
        tablaSimpson3_8.addRow(i, data);
        xs += h;
        if (x === fin) {
            i = fin;
        }
    }

    var suma = 0;
    var values = [];

    for (var i = 0; i < fin + 1; i++) {
        //suma +=  parseInt(values[i]);
        tablaSimpson3_8.forEachCell(i, function (cellObj, ind) {
            var cn = tablaSimpson3_8.getColumnId(ind);// Nombre de la columna
            values[cn] = cellObj.getValue();
        });
        console.log(values);
        suma += parseFloat(values.y);
        if (parseInt(values.x) === fin) {
            i = fin;
        }
    }
    
    // --> INICIO DE GRAFICA <--//
    var suma1 = 0;
    var valorInicio;
    var valorFin;
    var values = [];

    myLineChart = campo4.attachChart({
        view: "spline",
        value: "#y#",
        item: {
            borderColor: "#fbfbfb;",
            color: "#000000"
        },
        line: {
            color: "#ff9900",
            width: 2
        },
        xAxis: {
            template: "'#x#"
        },
        offset: 0,
        yAxis: {
            start: 0,
            end: valorFin,
            step: 10,
            template: function (value) {
                return value % 1 ? "" : value
            }
        }
    });

    for (var i = 0; i < 3 + 1; i++) {
        //suma +=  parseInt(values[i]);
        tablaSimpson3_8.forEachCell(i, function (cellObj, ind) {
            var cn = tablaSimpson3_8.getColumnId(ind);// Nombre de la columna
            values[cn] = cellObj.getValue();
        });
        myLineChart.add({
            x: values.x,
            y: values.y
        });
        //console.log(values);
        if (values.x > inicio && values.i < fin) {
            suma1 += parseFloat(values.y);
        } else if (values.x == inicio) {
            valorInicio = parseFloat(values.y);
        } else {
            valorFin = parseFloat(values.y);
        }

    }
    
    // --> FIN DE GRAFICA <--//

    dataview = campo3.attachDataView({
        type: {
            //template: loadTemplate('recursos/tamplate/trapezoidal.html'),
            template: "Límite inferior: a=#limitea#<br/><br/>\n\
                      Límite superior: b=#limiteb#<br/><br/>\n\
                      La longitud de un subintervalo: h=#h#<br/><br/>\n\
                      Sumatoria: n=#suma#<br/><br/>\n\
                      <spam>Resultado final: </spam>#resultado#",
            width: 500,
            height: 180
        }
    });

    var resultado = ((3 * h) / 8) * (suma);

    dataview.add({
        limitea: inicio,
        limiteb: obj.b,
        h: h,
        suma: suma,
        resultado: resultado
    });

    //console.log(h); 

}

function jorgeB() {

    var obj = form.getFormData();

    var h = (obj.b - obj.a) / 4;

    var tablaJorgeB = campo2.attachGrid();

    tablaJorgeB.setHeader("Intervalo,X," + obj.funcion);
    tablaJorgeB.setColumnIds("i,x,y");
    tablaJorgeB.setColTypes("ro,ro,ro");
    tablaJorgeB.init();

    var inicio = parseInt(obj.a, 10);
    var fin = parseInt(obj.b, 10);
    var xs = inicio;
    var nuevaFuncion = null;

    for (var i = 0; i < fin + 1; i++) {
        var x = Math.round(xs * 100) / 100;
        if (i == 0 || x == fin) {
            nuevaFuncion = "7*" + "" + (obj.funcion);
        } else {
            if (i == 1 || i == 3) {
                nuevaFuncion = "32*" + "" + (obj.funcion);
            } else {
                nuevaFuncion = "12*" + "" + (obj.funcion);
            }
        }

        //Math.sqrt(3*x+1)

        var valor;
        if(isNaN(eval(nuevaFuncion))){
            valor=0;
        }else{
            valor=eval(nuevaFuncion)
        }

       var data = [i, x, valor];
        tablaJorgeB.addRow(i, data);
        xs += h;
        if (x == fin) {
            i = fin;
        }
    }

    var suma = 0;
    var values = [];

    for (var i = 0; i < fin + 1; i++) {
        //suma +=  parseInt(values[i]);
        tablaJorgeB.forEachCell(i, function (cellObj, ind) {
            var cn = tablaJorgeB.getColumnId(ind);// Nombre de la columna
            values[cn] = cellObj.getValue();
        });
        console.log(values);
        suma += parseFloat(values.y);
        if (parseInt(values.x) === fin) {
            i = fin;
        }
    }

    //Math.sqrt(3X+1)
    
    // --> INICIO DE GRAFICA <--//
    var suma1 = 0;
    var valorInicio;
    var valorFin;
    var values = [];

    myLineChart = campo4.attachChart({
        view: "spline",
        value: "#y#",
        item: {
            borderColor: "#fbfbfb;",
            color: "#000000"
        },
        line: {
            color: "#ff9900",
            width: 2
        },
        xAxis: {
            template: "'#x#"
        },
        offset: 0,
        yAxis: {
            start: 0,
            end: valorFin,
            step: 10,
            template: function (value) {
                return value % 1 ? "" : value
            }
        }
    });

    for (var i = 0; i < 5 + 1; i++) {
        //suma +=  parseInt(values[i]);
        tablaJorgeB.forEachCell(i, function (cellObj, ind) {
            var cn = tablaJorgeB.getColumnId(ind);// Nombre de la columna
            values[cn] = cellObj.getValue();
        });
        myLineChart.add({
            x: values.x,
            y: values.y
        });
        //console.log(values);
        if (values.x > inicio && values.i < fin) {
            suma1 += parseFloat(values.y);
        } else if (values.x == inicio) {
            valorInicio = parseFloat(values.y);
        } else {
            valorFin = parseFloat(values.y);
        }

    }
    
    // --> FIN DE GRAFICA <--//

    dataview = campo3.attachDataView({
        type: {
            //template: loadTemplate('recursos/tamplate/trapezoidal.html'),
            template: "Límite inferior: a=#limitea#<br/><br/>\n\
                      Límite superior: b=#limiteb#<br/><br/>\n\
                      La longitud de un subintervalo: h=#h#<br/><br/>\n\
                      Sumatoria: n=#suma#<br/><br/>\n\
                      <spam>Resultado final: </spam>#resultado#",
            width: 500,
            height: 180
        }
    });

    var resultado = ((2 * h * suma) / 45);

    dataview.add({
        limitea: inicio,
        limiteb: obj.b,
        h: h,
        suma: suma,
        resultado: resultado
    });

    //console.log(h); 

}
/*
Math.cbrt = function(x) {
    var sign = x === 0 ? 0 : x > 0 ? 1 : -1;

    return sign * Math.pow(Math.abs(x), 1 / 3);
}
*/