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

let productosCarrito = []; 

function cargar(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function (){
        const xmlDoc = xhttp.responseXML;
        productosCarrito = xmlDoc.getElementsByTagName("producto"); 
        crearTabla(productosCarrito); // 
    }
    xhttp.open("GET","../recursos/carritoCompras.xml");
    xhttp.send();
}

function crearTabla(productos) { 
    let table = "<thead><tr><th>Nombre</th><th>Cantidad</th><th>Modelo</th><th>Precio Unitario</th><th>Color</th><th>Subtotal</th></tr></thead><tbody>";
    let totalCompras = 0; 
    if (productos.length === 0) {
        table += '<tr><td colspan="6">No hay productos que coincidan con el filtro.</td></tr>';
    } else {
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
    }
    table += "</tbody>";
    
    document.getElementById("tablaCarrito").innerHTML = table; 
    document.getElementById("totalMonto").innerText = "$" + totalCompras.toFixed(2); 
}   

function filtrarProductos() {
    const textoFiltro = document.getElementById("filtroProducto").value.toLowerCase();
    
    const productosArray = Array.from(productosCarrito); 

    const productosFiltrados = productosArray.filter(producto => {
        const nombreProducto = producto.getElementsByTagName("nombre")[0].childNodes[0].nodeValue.toLowerCase();
        return nombreProducto.includes(textoFiltro);
    });

    crearTabla(productosFiltrados); // Regenerar la tabla con los productos filtrados
}

function verificarLogin(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function (){
        const xmlDoc = xhttp.responseXML;
        const usuariosXML = xmlDoc.getElementsByTagName("usuario"); 

        const usernameInput = document.getElementById("username").value;
        const passwordInput = document.getElementById("password").value;
        const mensajeError = document.getElementById("mensajeError");
        
        let loginExitoso = false;
        for (let i = 0; i < usuariosXML.length; i++) {
            const nombreUsuarioXML = usuariosXML[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
            const contraseñaXML = usuariosXML[i].getElementsByTagName("contraseña")[0].childNodes[0].nodeValue;

            if (usernameInput === nombreUsuarioXML && passwordInput === contraseñaXML) {
                loginExitoso = true;
                break; 
            }
        }

        if (loginExitoso) {
            mensajeError.textContent = ""; 
            window.location.href = 'html/feed.html'; 
        } else {
            mensajeError.textContent = "Usuario o contraseña incorrectos. Inténtalo de nuevo.";
        }
    }
    xhttp.open("GET","recursos/usuarios.xml"); 
    xhttp.send();
}