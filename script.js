var urlBase = 'https://api.yumserver.com/16979/products';

function AgregarProducto() {

    let html = ``;
    
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
})

    fetch(urlBase, {
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
.then(data => {
    if (data == 'OK')
        {
            alert('Producto creado correctamente');
            html +=  `
            <button class="form-input-enviar" onclick="ObtenerIdCod()">Obtener idcod de producto creado</button>
            `

            document.getElementById('button-obtenerIdCod').innerHTML = html;
        }
    else
        {
            alert('Fallo al crear el producto');
        }
})
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
    html += `
    <tr>
        <th>Titulo</th>
        <th>Precio Pesos</th>
        <th>Precio Dolar</th>
        <th>Fecha</th>
    </tr>
    `

    for (let i = 0; i < data.length; i++)
    {
        html += `
        <tbody>
        <tr>
            <td>${data[i].titulo}</td>
            <td>${data[i].precioPeso}</td>
            <td>${data[i].precioDolar}</td>
            <td>${data[i].fecha}</td>
            <td><button onclick="AgregarAlCarrito()">Agregar al carrito</button></td>
        </tr>
        </tbody>
    `
    }
    document.getElementById('tabla').innerHTML = html;
}

function ObtenerIdCod() {
    fetch(urlBase)
    .then(response => response.json())
    .then(MostrarIdCod)
    .catch(error => console.error('Error:', error));
    }

function MostrarIdCod(data) {
    for (let i = 0; i < data.length; i++)
    {
        globalThis.idcod = data[i].idcod;
    }
    alert(idcod);
}

function ModificarProducto() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
    })

    fetch(urlBase, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            idcod: document.getElementById('idCod').value,
            titulo: document.getElementById('Titulo').value,
            precioPeso: parseFloat(document.getElementById('precioPesos').value),
            precioDolar: parseFloat(document.getElementById('precioDolares').value),
            fecha: document.getElementById('Fecha').value
        })
    })
    .then(response => response.text())
    .then(data => {
        if (data == 'OK')
            {
                alert('Producto modificado exitosamente');
            }
        else
            {
                alert('Fallo al modificar el producto');
            }
    })
    .catch(error => console.error('Error:', error));
}