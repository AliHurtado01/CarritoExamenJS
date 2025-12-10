# **Sistema de Facturación \- Pulido S.L.**

Este proyecto es una aplicación web sencilla desarrollada con **HTML** y **JavaScript Vanilla** para la gestión de productos y generación de facturas dinámicas. Permite a los usuarios seleccionar productos, ajustar cantidades y calcular el precio final aplicando descuentos automáticos basados en la fecha o el tipo de cliente.

## **📋 Características**

* **Catálogo de Productos:** Visualización de una lista predefinida de productos con su precio unitario.  
* **Filtrado en Tiempo Real:** Buscador para filtrar productos por concepto/nombre sin distinción entre mayúsculas y minúsculas.  
* **Gestión de Carrito (Factura):**  
  * Añadir productos desde el catálogo.  
  * Modificar cantidades (aumentar/disminuir) directamente en la tabla de factura.  
  * Eliminación automática de ítems al llegar a cantidad 0\.  
* **Cálculo de Totales:** Actualización automática del subtotal y total final al modificar el carrito o cambiar parámetros de cliente.

## **🧠 Lógica de Descuentos**

El sistema aplica una lógica de negocio específica para calcular el precio final en la función `calcularTotal`:

1. **Black Friday (Prioridad Alta):**  
   * Se aplica un **25% de descuento** si la fecha seleccionada se encuentra entre el **15 de noviembre** y el **5 de diciembre**.  
   * *Código:* Mes 10 (Noviembre) día \>= 15 O Mes 11 (Diciembre) día \<= 5\.  
2. **Descuento Empresarial:**  
   * Se aplica un **20% de descuento** si el usuario selecciona el tipo de cliente "Empresa".  
   * **Nota:** Este descuento solo se aplica si **no** está activo el descuento de Black Friday.

## **🛠️ Tecnologías Utilizadas**

* **HTML5:** Estructura semántica de la página y formularios.  
* **JavaScript (ES6):** Manipulación del DOM, lógica de arrays (`filter`, `find`, `reduce`) y gestión de eventos.

## **🚀 Instalación y Uso**

1. Clona este repositorio o descarga los archivos.  
2. Asegúrate de tener los archivos `index.html` y `script.js` en la misma carpeta.  
3. Abre el archivo `index.html` en tu navegador web de preferencia.

## **📂 Estructura del Proyecto**

Plaintext  
/  
├── index.html   \# Interfaz de usuario (tablas, inputs y botones)  
└── script.js    \# Lógica de negocio, datos de productos y funciones del DOM

## **📸 Funcionalidades Clave (Snippets)**

### **Filtrado de Productos**

El filtrado convierte el texto a minúsculas para facilitar la búsqueda:

JavaScript  
function filtrarProductos() {  
    const texto \= document.getElementById('filtro-concepto').value.toLowerCase();  
    const filtrados \= productosDisponibles.filter(p \=\> p.concepto.toLowerCase().includes(texto));  
    cargarProductos(filtrados);  
}

### **Regla de Black Friday**

Lógica de fechas utilizando el objeto `Date` nativo:

JavaScript  
if ((mes \=== 10 && dia \>= 15\) || (mes \=== 11 && dia \<= 5)) {  
    descuento \= 0.25;  
    textoPromo \= "Descuento por Black Friday aplicado(25%)";  
}  
