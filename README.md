PucelaTechDay
=============

Código de ejemplo de unit testing en JavaScript con Jasmine

Para ver el resultado de los tests basta con abrir el archivo SpecRunner.html con un navegador.

Es un proyecto de Visual Studio, pero solo tiene html, css y JavaScript. Podeis crearos facilmente un proyecto con vuestro IDE preferido.

Para pasar los tests con jsTestDriver seguir estos pasos:
 - Descargarse jsTestDriver de http://code.google.com/p/js-test-driver/
 - Abrir dos consolas de windows/mac y navegar hasta la carpeta donde tengais el proyecto
 - En una consola ejecutar el siguiente comando (para windows): java -jar %JSTESTDRIVER_HOME%\JsTestDriver-1.3.5.jar --port 4224 --config jstd.conf --browser "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
 - Cuando levante el navegador, ejecutar el siguiente comando en la otra consola: java -jar %JSTESTDRIVER_HOME%\JsTestDriver-1.3.5.jar --config jstd.conf --runnerMode PROFILE --reset --dryRunFor all --tests all

