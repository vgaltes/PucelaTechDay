/// <reference path="../libs/jasmine-1.2.0/jasmine.js" />
/// <reference path="../libs/jquery-1.8.3.min.js" />
/// <reference path="../src/LechazoService.js" />

describe("jasmine organiza sus tests en suites, utilizando la función describe", function () {
    it("cada test es una función it", function () {
        // Arrange 

        // Act

        // Assert
		expect(true).toBe(true);
	});

	describe("podemos enlazar describes", function () {
		it("otro test simple", function () {
			var a = true;
			expect(a).toBe(true);
		});
	});

	it("podemos utilizar comparaciones negativas", function () {
		var a = false;
		expect(a).not.toBe(false);
	});
});

describe("comparadores incluidos", function () {
	var lechazoService = null;
	beforeEach(function () {
		lechazoService = new LechazoService();
		lechazoService.anadeLechazo({ mesa: 2, puntoCoccion: "bajo" });
	});
	afterEach(function () {
		lechazoService.vaciaCarrito();
	});

	it("ToBe compara con ===", function () {
		var a = 12;
		var b = a;

		expect(a).toBe(b);
		expect(a).not.toBe(null);
	});

	it("toEqual funciona para literales simples y variables", function () {
		expect(1).toEqual(lechazoService.numeroLechazos());
	});
	
	it("toEqual funciona para objetos", function () {
		var lechazoService = new LechazoService(),
			lechazo = { mesa: 2, puntoCoccion: "bajo" };

		lechazoService.anadeLechazo(lechazo);
		var lechazoRecuperado = lechazoService.recuperaLechazo(0);
		expect(lechazoRecuperado).toEqual(lechazo);
	});
	
	it("el comparador 'toMatch' es para expresiones regulares", function () {
		var message = 'foo bar baz';

		expect(message).toMatch(/bar/);
		expect(message).toMatch('bar');
		expect(message).not.toMatch(/quux/);
	});

	it("el comparador 'toBeDefined' compara contra `undefined`", function () {
		expect(lechazoService.numeroLechazos).toBeDefined();
		expect(lechazoService.cancelaPedido).not.toBeDefined();
	});

	it("el comparador `toBeUndefined` compara contra `undefined`", function () {
		expect(lechazoService.numeroLechazos).not.toBeUndefined();
		expect(lechazoService.cancelaPedido).toBeUndefined();
	});

	it("el comparador 'toBeNull' compara contra null", function () {
		var a = null;
		var foo = 'foo';

		expect(a).toBeNull();
		expect(foo).not.toBeNull();
	});

	it("el comparador 'toBeTruthy' es para comparaciones booleanas", function () {
		expect(lechazoService.numeroLechazos() === 1).toBeTruthy();
		expect(lechazoService.numeroLechazos() === 2).not.toBeTruthy();
	});

	it("The 'toBeFalsy' matcher is for boolean casting testing", function () {
		expect(lechazoService.numeroLechazos() === 2).toBeFalsy();
		expect(lechazoService.numeroLechazos() === 1).not.toBeFalsy();
	});
	
	it("el comparador 'toContain' es para encontrar un item en un array", function () {
		expect(lechazoService.recuperaLechazo(0).puntoCoccion).toContain('aj');
	});
	
	it("el comparador 'toBeLessThan' es para comparaciones matemáticas", function () {
		expect(0).toBeLessThan(lechazoService.numeroLechazos());
		expect(2).not.toBeLessThan(lechazoService.numeroLechazos());
	});

	it("el comparador 'toBeGreaterThan' es para comparaciones matemáticas", function () {
		expect(2).toBeGreaterThan(lechazoService.numeroLechazos());
		expect(0).not.toBeGreaterThan(lechazoService.numeroLechazos());
	});
	
	it("el comparador 'toBeCloseTo' es para comparaciones matemáticas con precisión", function () {
		var pi = 3.1415926, e = 2.78;

		expect(pi).not.toBeCloseTo(e, 0.1);
		expect(pi).toBeCloseTo(e, 0);
	});

	it("el comparador 'toThrow' sirver para testear si una función lanza una excepción", function () {
		var foo = function () {
			return 1 + 2;
		};
		var bar = function () {
			return a + 1;
		};

		expect(foo).not.toThrow();
		expect(bar).toThrow();
	});
});

describe("jasmine.any", function () {
	it("compara contra cualquier valor", function () {
		var lechazoService = new LechazoService();
		lechazoService.anadeLechazo({ mesa: 2, puntoCoccion: "bajo" });

		expect(lechazoService.numeroLechazos()).toEqual(jasmine.any(Number));
		expect(lechazoService.recuperaLechazo(0)).toEqual(jasmine.any(Object));
	});
});

xdescribe("se pueden desactivar suites", function () {
	var foo;

	beforeEach(function () {
		foo = 0;
		foo += 1;
	});

	xit("y tambien tests", function () {
		expect(foo).toEqual(1);
	});
});

describe("espias", function () {
	var printer,
		lechazoService;

	beforeEach(function () {
		printer = new AlertPrinter();
		lechazoService = new LechazoService(printer);
		lechazoService.anadeLechazo({ mesa: 2, puntoCoccion: "bajo" });
				
		spyOn(printer, "imprime");
		lechazoService.imprimeCarrito();
	});

	afterEach(function () {
		lechazoService.vaciaCarrito();
	});

	it("comprueba que el espía se ha llamado", function () {
		expect(printer.imprime).toHaveBeenCalled();
	});

	it("comprueba el número de llamadas", function () {
		expect(printer.imprime.calls.length).toEqual(1);
	});

	it("comprueba los argumentos de las llamadas", function () {
		var lechazo = { mesa: 2, puntoCoccion: "bajo" };

		expect(printer.imprime).toHaveBeenCalledWith(lechazo);
	});

	it("permite el acceso a la llamada más reciente", function () {
		var otroLechazo = { mesa: 2, puntoCoccion: "muy hecho" };

		lechazoService.anadeLechazo(otroLechazo);
		lechazoService.imprimeCarrito();
		expect(printer.imprime.mostRecentCall.args[0]).toEqual(otroLechazo);
	});
	
	it("permite el acceso a otras llamadas", function () {
		var otroLechazo = { mesa: 2, puntoCoccion: "muy hecho" };

		lechazoService.anadeLechazo(otroLechazo);
		lechazoService.imprimeCarrito();
		expect(printer.imprime.calls[0].args[0].puntoCoccion).toEqual('bajo');
	});
});


describe("espias con callthrough", function () {
	var printer,
		lechazoService;

	beforeEach(function () {
		printer = new AlertPrinter();
		lechazoService = new LechazoService(printer);
		spyOn(printer, "imprime").andCallThrough();
		lechazoService.anadeLechazo({ mesa: 2, puntoCoccion: "bajo" });
		lechazoService.imprimeCarrito();
	});

	afterEach(function () {
		lechazoService.vaciaCarrito();
	});

	it("llama a la implementación actual", function () {
		expect(printer.imprime).toHaveBeenCalled();
	});
});

describe("espias con andReturn", function () {
	var printer,
		lechazoService;

	beforeEach(function () {
		printer = new AlertPrinter();
		lechazoService = new LechazoService(printer);
		spyOn(printer, "nombre").andReturn("FakePrinterName");
	});

	it("llama a la implementación fake", function () {
		var printerName = lechazoService.nombreServicioImpresion();
		expect(printer.nombre).toHaveBeenCalled();
		expect(printerName).toEqual('FakePrinterName');
	});
});

describe("espias con andCallFake", function () {
	var printer,
		lechazoService;

	var fakeFunc = function () {
		console.log('Fake Implementation');
	};

	beforeEach(function () {
		printer = new AlertPrinter();
		lechazoService = new LechazoService(printer);
		spyOn(printer, "nombre").andCallFake(fakeFunc);
	});

	it("llama a la implementación fake", function () {
		var printerName = lechazoService.nombreServicioImpresion();
		expect(printer.nombre).toHaveBeenCalled();
	});
});

describe("espiando a jquery", function () {
    it("espiamos el post", function () {
        spyOn($, "ajax");

        var lechazoService = new LechazoService();
        lechazoService.enviaCarrito();

        expect($.ajax).toHaveBeenCalled();
        expect($.ajax).toHaveBeenCalledWith(jasmine.any(Object));
        expect($.ajax.mostRecentCall.args[0].url).toEqual('http://www.plainrestaurante.com/lechazo/anadir');
        expect($.ajax.mostRecentCall.args[0].data).toEqual('{"data":[]}');
    });

    it("simulamos una llamada ajax", function () {
        var result = "{'Result': '0'}",
            printer = new ConsolePrinter();

        spyOn(printer, "imprimeMensaje");
        spyOn($, "ajax").andCallFake(function (options) {
            options.success(result);
        });

        var lechazoService = new LechazoService(printer);
        lechazoService.enviaCarrito();

        expect(printer.imprimeMensaje).toHaveBeenCalledWith(result);
    });

    it("espiamos un selector", function () {
        spyOn($.fn, "fadeToggle");

        var lechazoService = new LechazoService();
        lechazoService.muestraConfirmacion();
                
        expect($.fn.fadeToggle).toHaveBeenCalled();
        expect($.fn.fadeToggle.mostRecentCall.object.selector).toEqual("#dialog");
    });
});

describe("crear fake", function () {
	it("crear fake manualmente", function () {
		var fakePrinter = jasmine.createSpyObj('fakePrinter', ['imprime', 'nombre']),
			lechazoService = new LechazoService(fakePrinter);

		lechazoService.anadeLechazo({ mesa: 2, puntoCoccion: "bajo" });
		lechazoService.imprimeCarrito();
		expect(fakePrinter.imprime).toHaveBeenCalled();
	});
});

describe("Hacer ticks manualmente en el mock del reloj de Jasmine", function () {
	var timerCallback;

	beforeEach(function () {
		timerCallback = jasmine.createSpy('timerCallback');
		jasmine.Clock.useMock();
	});

	it("hace que un timeout se llame sincronamente", function () {
		setInterval(function () {
			timerCallback();
		}, 100);

		expect(timerCallback).not.toHaveBeenCalled();

		jasmine.Clock.tick(101);
		expect(timerCallback.callCount).toEqual(1);

		jasmine.Clock.tick(50);
		expect(timerCallback.callCount).toEqual(1);

		jasmine.Clock.tick(50);
		expect(timerCallback.callCount).toEqual(2);
	});
});