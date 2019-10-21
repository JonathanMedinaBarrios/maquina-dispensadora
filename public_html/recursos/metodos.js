
var valor = 0;
var acumulado = 0;
var network;
/************* FUNCIONES EPECIALES  ****************/

function genera(price) {

    if (valor > 0) {
        dhtmlx.confirm({
            title: "Confirmación",
            text: "¿Desea cancelar la transacción?",
            type: "confirm-warning",
            ok: "Si", cancel: "No",
            callback: function (result) {
                  if (result) {
                      generarAutomata(price); 
                  }
            }
        });
    }else{
        generarAutomata(price); 
    }
}

function generarAutomata(price) {

    valor = document.getElementById(price).value;

    var numOpcion = valor / 100;

    var estados = new Array(numOpcion);

    for (var i = 0; i < numOpcion; i++) {
        var a1 = 100 * (i + 1);
        var a2 = 100 * (i + 2);
        var a5 = 100 * (i + 5);
        var a10 = 100 * (i + 10);

        if (a1 > numOpcion * 100) {
            a1 = '';
        }
        ;
        if (a2 > numOpcion * 100) {
            a2 = '';
        }
        ;
        if (a5 > numOpcion * 100) {
            a5 = '';
        }
        ;
        if (a10 > numOpcion * 100) {
            a10 = '';
        }
        ;

        var obj = {
            alf_1: a1,
            alf_2: a2,
            alf_5: a5,
            alf_10: a10
        };
        estados[i] = obj;
    }
    var string = "";

    estados.forEach(function callback(element, i) {
        if (element.alf_1 != "") {
            string += i + "00->" + element.alf_1 + ";";
        }
        ;
        if (element.alf_2 != "") {
            string += i + "00->" + element.alf_2 + ";";
        }
        ;
        if (element.alf_5 != "") {
            string += i + "00->" + element.alf_5 + ";";
        }
        ;
        if (element.alf_10 != "") {
            string += i + "00->" + element.alf_10 + ";";
        }
        ;
    });
    var newString = string.substring(0, string.length - 1);
    //var ultimoValor = numOpcion * 100;
    var container = document.getElementById("mynetwork");

    var dot = "dinetwork {node[shape=circle fontsize=16]\n\
                                     edge [length=100, color=gray, fontcolor=black]\n\
                                      ;" + newString + ";0[fontcolor=white,color=red,];" + valor + "[fontcolor=white,color=purple,]}";

    var data = vis.network.convertDot(dot);

    network = new vis.Network(container, data);

    network.selectNodes(['0']);
}

function selectMoneda(moneda) {

    if (acumulado + moneda <= valor) {

        var str = document.getElementById("cont").innerHTML;
        var res = str.replace(acumulado, acumulado + moneda);
        document.getElementById("cont").innerHTML = res;

        acumulado += moneda;

        network.selectNodes(['' + acumulado]);

    } else {
        dhtmlx.alert({
            title: "Error!",
            type: "alert-error",
            text: "La cantidad ingresada supera el  valor del producto"
        });
    }
}


