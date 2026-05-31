// Cargar barra navegacion
fetch("/recursos/barraNavegacion.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("barraNavegacion").innerHTML = data;
    });
