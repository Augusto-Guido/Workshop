class GestionarProductos {

    iniciar() {

        //Arreglo de productos
        productos = [

            {
                "id": 1,
                "nombre": "Intel Pentium Gold G7400",
                "descripcion": "12th Generación. Socket S1700",
                "precio": 8858,
                "stock": 50,
                "img": "pentiumGold.png",
                "destacado": 0
            },
            {
                "id": 2,
                "nombre": "Intel Celeron G6900 3.5GHz",
                "descripcion": "12th Generación. Socket S1700",
                "precio": 5907,
                "stock": 50,
                "img": "celeron.png",
                "destacado": 1
            },

            {
                "id": 3,
                "nombre": "Intel i3 12100F",
                "descripcion": "12th Generación. Sin video. Socket S1700",
                "precio": 8858,
                "stock": 50,
                "img": "i3.png",
                "destacado": 0
            },
            {
                "id": 4,
                "nombre": "Intel i3 12100",
                "descripcion": "12th Generación. Video integrado. Socket S1700",
                "precio": 23371,
                "stock": 50,
                "img": "i3.png",
                "destacado": 1
            }
        ]

        // Solo quiero mostrar los articulos destacados.
        let productosDestacados = productos.filter( prod => prod.destacado == 1 );

        this.cargarProductos( productosDestacados );
        
        this.mostrarCarrito();
        
        this.actualizarContador();
            
    }


    // Funcion encargada de cargar los productos en la pagina
    cargarProductos( productos ) { 
        
        const divProductos    = document.querySelector('#productos');
        divProductos.innerHTML = '';

        if( productos.length === 0 ) {

            this.mostrarHeader('No se han encontrado productos para su búsqueda');
            return false;
        } 
        else {          

            productos.forEach( (producto) => {

                let prod = document.createElement('div');
                prod.classList.add('col-12', 'h200', 'border', 'bg-white', 'rounded', 'mt-3', 'd-flex', 'align-items-center', 'p-3', 'flex-row', 'producto');
                prod.setAttribute('id', 'row_'+producto.id);    
            
        
                prod.innerHTML = `      <div class="w-20">
                                            <img src="./assets/img/${producto.img}" alt="" width="150" height="150" >
                                        </div>

                                        <div class="p-3 d-flex flex-column w-60 h-150">
                                            <h3>${producto.nombre}</h3>                                            
                                            <p>${producto.descripcion.substring(0,120)}</p>
                                        </div>

                                        <div class="d-flex align-items-center justify-content-center flex-column w-20 h-150">
                                            <p class="precio">$${producto.precio}</p>
                                            <a href="javascript:addCarrito(${producto.id})" class="btn btn-primary">Agregar al carrito</a>
                                        </div>`;

                divProductos.appendChild( prod );

            } )    
        }
    }

    // Funcion para buscar un producto
    buscar( q ) { 

        let resultado = productos.filter( producto => producto.nombre.toLowerCase().includes( q.toLowerCase() ) || producto.descripcion.toLowerCase().includes( q.toLowerCase() ));      
        this.cargarProductos( resultado );                   
    }



    addCart( infoProducto ) {
        
        
    const existe = carrito.some( producto => producto.id === infoProducto.id );

    // si ya existe necesito aumentar el contador
    if(existe) 
    {
        
        const articulos = carrito.map( producto => {

            if(producto.id === infoProducto.id)
            {
                producto.cantidad++;
                return producto;
            }
            else
            {
                return producto;
            }

            carrito = articulos;               

        })

            alert("Se actulizo la cantidad del producto");

    }
    else 
    {
        // Como no existe lo agrego
        carrito.push(infoProducto);
        alert("Se agrego el producto");

    }

    this.actualizarCarrito();
    }

    contarProductos() { 

        let contadorProductos = 0;

        carrito.forEach(( producto ) => {

            contadorProductos = contadorProductos + parseInt(producto.cantidad);
        })

        return contadorProductos;
    }


    actualizarCarrito() {

        
        this.actualizarContador();

        
        this.mostrarCarrito();

        
        this.guardarCarrito();
    }


    actualizarContador() { 

        let totalArticulos = this.contarProductos();

        let countCarrito = document.querySelector('#badgeCarrito');

        countCarrito.innerHTML = totalArticulos;

    }


    mostrarCarrito() { 

        let detalleCarrito = document.querySelector('#idCarrito');

        detalleCarrito.innerHTML = '';

        let total = 0;

        carrito.forEach( ( producto ) => {
        

            const row = document.createElement('div');
            row.classList.add('row');
            
            total += parseInt(producto.precio);

            row.innerHTML = `
                
                        <div class="col-3 d-flex align-items-center p-2 border-bottom">
                            <img src="${producto.img}" width="80"/>
                        </div>

                        <div class="col-3 d-flex align-items-center p-2 border-bottom">
                            ${producto.nombre}
                        </div>

                        <div class="col-3 d-flex align-items-center justify-content-end p-2 border-bottom">
                            $ ${producto.precio}
                        </div>

                        <div class="col-1 d-flex align-items-center justify-content-end p-2 border-bottom">
                            ${producto.cantidad}
                        </div>

                        <div class="col-2 d-flex align-items-center justify-content-center p-2 border-bottom">
                            <a href="javascript:eliminar(${producto.id})">
                                <i class="fa-solid fa-square-minus fa-2x"></i>
                            </a>
                        </div>
            `;

            
            detalleCarrito.appendChild(row);

        })

        let row = document.createElement('div');
        row.classList.add('row');
        
        row.innerHTML = `   <div class="col-4 d-flex align-items-center justify-content-start p-2 border-bottom">
                                Total a pagar:
                            </div>
                            <div class="col-8 d-flex align-items-center justify-content-end p-2 border-bottom">
                                <b> $ ${total}</b>
                            </div>`;


        detalleCarrito.appendChild(row);
    }



    eliminarArticulo( id ) { 

            let resp = confirm("Esta seguro de eliminar el producto ?")
            if (resp)  {
                carrito = carrito.filter( producto => producto.id != id);
                this.actualizarCarrito();

                alert("El articulo fue eliminado del carrito");
    
            }            
        
    }


    guardarCarrito() { 
    
        localStorage.setItem('carrito', JSON.stringify( carrito ));        
    }


    mostrarHeader( msg ) { 
        const headerProductos = document.querySelector('#headerProductos');
        headerProductos.innerHTML = msg;
    }




}