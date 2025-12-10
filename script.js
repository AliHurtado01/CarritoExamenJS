/*Creación de los productos*/

const productosDisponibles = [
    { id: 1, concepto: "League of Legends", precioUnitario: 10.00 },
    { id: 2, concepto: "El señor de los anillos", precioUnitario: 8.50 },
    { id: 3, concepto: "Como conoci a vuestra madre", precioUnitario: 25.00 },
    { id: 4, concepto: "Indiana Jones", precioUnitario: 45.00 },
    { id: 5, concepto: "El Padrino", precioUnitario: 30.00 }
];

/*Creacion de la factura vacia*/
let factura = [];

/*Reconocimiento de los elementos del DOM para interactuar con ellos*/
const tablaProductos = document.getElementById('tabla-productos');
const tablaFactura = document.getElementById('tabla-factura');
const totalDiv = document.getElementById('total-factura');
const promoDiv = document.getElementById('promocion-info');

/*Mostrar los productos al principio*/
function cargarProductos(lista) {
    tablaProductos.innerHTML = '';
    lista.forEach(p => {
        const row = tablaProductos.insertRow();
        row.innerHTML = `
            <td>${p.concepto}</td>
            <td>${p.precioUnitario} €</td>
            <td><button onclick="anadir(${p.id})">Añadir</button></td>
        `;
    });
}
/*Para mostrar los productoss al abrir la pagina, sino no me los mostraba hasta que buscaba un item*/
cargarProductos(productosDisponibles);

/*Filtro aplicado al input para buscar item especificos, poniendo las letras a lowercase para que no sea key sensitive*/
function filtrarProductos() {
    const texto = document.getElementById('filtro-concepto').value.toLowerCase();
    const filtrados = productosDisponibles.filter(p => p.concepto.toLowerCase().includes(texto));
    cargarProductos(filtrados);
}

/*Añadir nuevos productos a la factura, si ya está añadido sube la cantidad, si no lo está añade uno*/
function anadir(id) {
    const prod = productosDisponibles.find(p => p.id === id);
    const enFactura = factura.find(f => f.id === id);

    if (enFactura) {
        enFactura.cantidad++;
    } else {
        factura.push({ ...prod, cantidad: 1 });
    }
    mostrarFactura();
    calcularTotal();
}

/*Modificar la cantidad de items dentro de la factura*/
function modificar(id, val) {
    const item = factura.find(f => f.id === id);
    if (item) {
        item.cantidad += val;
        if (item.cantidad <= 0) {
            factura = factura.filter(f => f.id !== id);
        }
    }
    mostrarFactura();
    calcularTotal();
}

/*Mostrar la factura dentro de su elemento del html, con los botones de añadir y quitar*/
function mostrarFactura() {
    tablaFactura.innerHTML = '';
    factura.forEach(item => {
        const row = tablaFactura.insertRow();
        row.innerHTML = `
            <td>${item.concepto}</td>
            <td>${item.cantidad}</td>
            <td>${item.precioUnitario} €</td>
            <td>${(item.cantidad * item.precioUnitario).toFixed(2)} €</td>
            <td>
                <button onclick="modificar(${item.id}, 1)">+</button>
                <button onclick="modificar(${item.id}, -1)">-</button>
            </td>
        `;
    });
}

/*Elimina el contenido de la factura, dejandola vacia y recargando el contenido*/
function reiniciarFactura() {
    factura=[];
    mostrarFactura();
    calcularTotal();
}

/*Calcular el total de la factura*/
function calcularTotal() {
    let subtotal = factura.reduce((acc, el) => acc + (el.cantidad * el.precioUnitario), 0);
    let descuento = 0;
    let textoPromo = "";

    const tipoCliente = document.querySelector('input[name="tipo_cliente"]:checked').value;
    const fechaInput = document.getElementById('fecha-compra').value;
    
    if (fechaInput) {
        const fecha = new Date(fechaInput);
        const mes = fecha.getMonth(); 
        const dia = fecha.getDate();
        
        if ((mes === 10 && dia >= 15) || (mes === 11 && dia <= 5)) {
            descuento = 0.25;
            textoPromo = "Descuento por Black Friday aplicado(25%)";
        }
    }

    if (descuento === 0 && tipoCliente === 'empresa') {
        descuento = 0.20;
        textoPromo = "Descuento a empresas aplicado(20%)";
    }

    const total = subtotal * (1 - descuento);
    promoDiv.innerText = textoPromo;
    totalDiv.innerHTML = `Total: ${total.toFixed(2)} €`;
}

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos(productosDisponibles);
});

/*Por hacerlo más visual tambien puse un boton para hacer un pedido que sólo limpia todo al igual que el boton de reiniciar*/
function hacerPedido(){
    factura=[];
    mostrarFactura();
    calcularTotal();
}