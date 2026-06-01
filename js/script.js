// Cargar barra navegacion
fetch("../recursos/barraNavegacion.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("barraNavegacion").innerHTML = data;
    });

fetch("../recursos/piePagina.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("piePagina").innerHTML = data;
    });


