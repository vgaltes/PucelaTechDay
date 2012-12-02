/// <reference path="../libs/jquery-1.8.3.min.js" />

var LechazoService = LechazoService || {};

var LechazoService = function (impresor) {
    var carrito = [],
        servicioImpresion = impresor,
        anadeLechazo = function (lechazo) {
            carrito.push(lechazo);
        },
        recuperaLechazo = function (indice) {
            return carrito[indice];
        },
        numeroLechazos = function () {
            return carrito.length;
        },
        imprimeCarrito = function () {
            for (var indice in carrito) {
                servicioImpresion.imprime(carrito[indice]);
            }
        },
        enviaCarrito = function () {
            $.post('http://www.plainrestaurante.com/lechazo/anadir', JSON.stringify({ data: carrito }), function (data) {
                servicioImpresion.imprimeMensaje(data);
            });
        },
        vaciaCarrito = function () {
            carrito.splice(0, carrito.length);
        },
        nombreServicioImpresion = function () {
            return servicioImpresion.nombre();
        },
        muestraConfirmacion = function () {
            $("#dialog").fadeToggle('fast');
        };

    return {
        anadeLechazo: anadeLechazo,
        numeroLechazos: numeroLechazos,
        imprimeCarrito: imprimeCarrito,
        recuperaLechazo: recuperaLechazo,
        vaciaCarrito: vaciaCarrito,
        nombreServicioImpresion: nombreServicioImpresion,
        enviaCarrito: enviaCarrito,
        muestraConfirmacion: muestraConfirmacion
    };
};

var AlertPrinter = function () {
    var imprime = function (lechazo) {
            alert("Mesa: " + lechazo.mesa + " | Punto de cocción: " + lechazo.puntoCoccion);
        },
        imprimeMensaje = function (mensaje) {
            alert(mensaje);
        },
        nombre = function () {
            return "AlertPrinter";
        };

    return {
        imprime: imprime,
        imprimeMensaje: imprimeMensaje,
        nombre: nombre
    };
};

var ConsolePrinter = function () {
    var imprime = function (lechazo) {
            console.log("Mesa: " + lechazo.mesa + " | Punto de cocción: " + lechazo.puntoCoccion);
        },
        imprimeMensaje = function (mensaje) {
            console.log(mensaje);
        },
        nombre = function () {
            return "ConsolePrinter";
        };

    return {
        imprime: imprime,
        imprimeMensaje: imprimeMensaje,
        nombre: nombre
    };
};