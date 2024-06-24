var urlBase = 'https://api.yumserver.com/16979/products';

function AgregarProducto() {fetch(urlBase, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        titulo: document.getElementById('Titulo').value,
        precioPeso: parseFloat(document.getElementById('precioPesos').value),
        precioDolar: parseFloat(document.getElementById('precioDolares').value),
        fecha: document.getElementById('Fecha').value
    })
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
}

function ObtenerProducto() {
    fetch(urlBase)
    .then(response => response.json())
    .then(MostrarProducto)
    .catch(error => console.error('Error:', error));
    }

function MostrarProducto(data) {

    let html = ``;

    for (let i = 0; i < data.length; i++)
    {
        html += `
        <tr>
            <td>${data[i].titulo}</td>
            <td>${data[i].precioPeso}</td>
            <td>${data[i].precioDolar}</td>
            <td>${data[i].fecha}</td>
            <td><button onclick="AgregarAlCarrito()">Agregar al carrito</button></td>
        </tr>
    `   
    }
    document.getElementById('tabla').innerHTML = html;
}