const productos = [

    {
        id: "pcgamer01",
        titulo: "GP9800 Amd Ryzen 9 5950X-32Gb-RTX3080 TI",
        imagen: "./img/pcgamer1.jpeg",
        categoria: {
            nombre: "Computadoras Gaming",
            id: "gaming",
        },
        precio: 887508,
    },
    {
        id: "pcgamer02",
        titulo: "GP8900 Intel Core i9 12900-32GB-RX6800XT",
        imagen: "./img/pcgamer2.jpeg",
        categoria: {
            nombre: "Computadoras Gaming",
            id: "gaming",
        },
        precio: 743194,
    },
    {
        id: "pcgamer03",
        titulo: "GP9700 Amd Ryzen 9 5900X-32Gb-RTX2060",
        imagen: "./img/pcgamer3.jpeg",
        categoria: {
            nombre: "Computadoras Gaming",
            id: "gaming",
        },
        precio: 488289,
    },
    {
        id: "pcgamer04",
        titulo: "GP8600 Intel Core i7 11700KF-16Gb-RTX2060",
        imagen: "./img/pcgamer4.jpeg",
        categoria: {
            nombre: "Computadoras Gaming",
            id: "gaming",
        },
        precio: 467007,
    },
    {
        id: "pcgamer05",
        titulo: "GP8100Intel Core i3 12100F-16Gb-RTX1660",
        imagen: "./img/pcgamer5.jpeg",
        categoria: {
            nombre: "Computadoras Gaming",
            id: "gaming",
        },
        precio: 324689,
    },
    {
        id: "pcgamer06",
        titulo: "GP9000 Amd Ryzen 3 3200G-16Gb-GTX1660",
        imagen: "./img/pcgamer6.jpeg",
        categoria: {
            nombre: "Computadoras Gaming",
            id: "gaming",
        },
        precio: 310589,
    },
    {
        id: "pcoyh01",
        titulo: "MX501 Intel Core i3 10105-8Gb-240-1Tb",
        imagen: "./img/pcoyh1.jpeg",
        categoria: {
            nombre: "Computadoras Hogar y Oficina",
            id: "ofyho",
        },
        precio: 134573,
    },
    {
        id: "pcoyh02",
        titulo: "Z425 Intel Core i3 10105-8Gb-480-KIT",
        imagen: "./img/pcoyh2.jpeg",
        categoria: {
            nombre: "Computadoras Hogar y Oficina",
            id: "ofyho",
        },
        precio: 125674,
    },
    {
        id: "pcoyh03",
        titulo: "Z520 Intel Core i3 10105-4Gb-240-KIT",
        imagen: "./img/pcoyh3.jpeg",
        categoria: {
            nombre: "Computadoras Hogar y Oficina",
            id: "ofyho",
        },
        precio: 110824,
    },
    {
        id: "noteb1",
        titulo: "Notebook Asus X515EA Core i5 1135G7 12Gb Ssd 256Gb 15.6 Win11",
        imagen: "./img/noteb1.jpeg",
        categoria: {
            nombre: "Notebooks",
            id: "notebooks",
        },
        precio: 212198,
    },
    {
        id: "noteb2",
        titulo: "Notebook Hp 245 G8 Ryzen 5 5500U 8Gb Ssd M2 120Gb Ssd 480Gb 14",
        imagen: "./img/noteb2.jpeg",
        categoria: {
            nombre: "Notebooks",
            id: "notebooks",
        },
        precio: 205678,
    },
    {
        id: "noteb3",
        titulo: "Notebook Asus X515EA Core i5 1135G7 8Gb Ssd 256Gb 15.6 Win11",
        imagen: "./img/noteb3.jpeg",
        categoria: {
            nombre: "Notebooks",
            id: "notebooks",
        },
        precio: 204699,
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar">Agregar</button>
            </div>
        `;
        
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos"
            cargarProductos(productos);
        }
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

const productosEnCarrito = [];

function agregarAlCarrito() {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado); 
    }

    actualizarNumerito();
    
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}