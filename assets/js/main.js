// Variables Globales
let carrito       = [];
let productos     = [];

let gestor;

// Evento que se dispara cuadno se carga la pagina
document.addEventListener('DOMContentLoaded', () => {

    // Cargar el carrito con el localstorage, si no hay nada asignarle un array vacio
    carrito = JSON.parse( localStorage.getItem('carrito') ) || [];

    gestor = new GestionarProductos();
    gestor.iniciar();
})

// Funcion para agregar al carrito un articulo
function addCarrito( id ) {
    
    const prod = document.querySelector('#row_'+id);
    let producto = new Producto (   id,
                                    prod.querySelector('h3').textContent,
                                    prod.querySelector('.precio').textContent.substring(1,6),
                                    prod.querySelector('img').src
                                );

   
    gestor.addCart( producto );
}