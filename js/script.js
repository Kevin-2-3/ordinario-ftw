// Cargar barra navegacion y el pie de pagina "heredados"
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


function cargar(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function (){
        const xmlDoc = xhttp.responseXML;
        const productos = xmlDoc.getElementsByTagName("producto");
        crearTabla(productos);
    }
    xhttp.open("GET","../recursos/carritoCompras.xml");
    xhttp.send();
}

function crearTabla(productos) { 
    let table = "<thead><tr><th>Nombre</th><th>Cantidad</th><th>Modelo</th><th>Precio Unitario</th><th>Color</th><th>Subtotal</th></tr></thead><tbody>";
    let totalCompras = 0; 

    for (let i = 0; i < productos.length; i++) {
        const nombre = productos[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
        const cantidad = parseInt(productos[i].getElementsByTagName("cantidad")[0].childNodes[0].nodeValue);
        const modelo = productos[i].getElementsByTagName("modelo")[0].childNodes[0].nodeValue;
        const precioUnitario = parseFloat(productos[i].getElementsByTagName("precioUnitario")[0].childNodes[0].nodeValue);
        const color = productos[i].getElementsByTagName("color")[0].childNodes[0].nodeValue;
        
        const subtotal = cantidad * precioUnitario;
        totalCompras += subtotal;

        table += "<tr>";
        table += "<td>" + nombre + "</td>";
        table += "<td>" + cantidad + "</td>";
        table += "<td>" + modelo + "</td>";
        table += "<td>$" + precioUnitario.toFixed(2) + "</td>"; 
        table += "<td>" + color + "</td>";
        table += "<td>$" + subtotal.toFixed() + "</td>"; 
        table += "</tr>";
    }
    table += "</tbody>";
    
    document.getElementById("tablaCarrito").innerHTML = table; 
    document.getElementById("totalMonto").innerText = "$" + totalCompras.toFixed(2); 
}        