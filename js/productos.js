// ========================================
// PRODUCTOS DINÁMICOS DESDE JSON
// ========================================

// Array de productos en formato JSON
const productos = [
    {
        name: 'Multivitamínico Premium',
        img: './img/producto_prueba.png',
        description: 'Complejo vitamínico completo para la salud diaria',
        price: 29.99,
        oldPrice: 39,
        stock: 50,
        discount: null,
        category: 'vitaminas'
    },
    {
        name: 'Proteína Whey',
        img: './img/producto_prueba.png',
        description: 'Proteína de alta calidad para el desarrollo muscular',
        price: 42.49,
        oldPrice: 49,
        stock: 30,
        discount: null,
        category: 'proteinas'
    },
    {
        name: 'Omega 3',
        img: './img/producto_prueba.png',
        description: 'Ácidos grasos esenciales para el corazón',
        price: 24.99,
        oldPrice: null,
        stock: 45,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Suplementos Naturales',
        img: './img/producto_prueba.png',
        description: 'Extractos herbales naturales para tu bienestar',
        price: 31.49,
        oldPrice: 34.99,
        stock: 25,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Vitaminas Esenciales',
        img: './img/producto_prueba.png',
        description: 'Vitaminas esenciales para fortalecer tu sistema inmune',
        price: 19.99,
        oldPrice: null,
        stock: 60,
        discount: null,
        category: 'vitaminas'
    },
    {
        name: 'Proteína Vegetal',
        img: './img/producto_prueba.png',
        description: 'Proteína 100% vegetal de alta absorción',
        price: 31.99,
        oldPrice: 39.99,
        stock: 40,
        discount: null,
        category: 'proteinas'
    },
    {
        name: 'Creatina Monohidrato',
        img: './img/producto_prueba.png',
        description: 'Creatina pura para mejorar tu rendimiento deportivo',
        price: 27.99,
        oldPrice: null,
        stock: 35,
        discount: null,
        category: 'proteinas'
    },
    {
        name: 'Complejo B',
        img: './img/producto_prueba.png',
        description: 'Vitaminas del complejo B para energía y vitalidad',
        price: 18.99,
        oldPrice: 22.99,
        stock: 55,
        discount: null,
        category: 'vitaminas'
    },
    {
        name: 'Colágeno Hidrolizado',
        img: './img/producto_prueba.png',
        description: 'Colágeno para piel, cabello y articulaciones saludables',
        price: 35.99,
        oldPrice: null,
        stock: 28,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Pre-Workout Energía',
        img: './img/producto_prueba.png',
        description: 'Fórmula pre-entrenamiento para máxima energía',
        price: 38.99,
        oldPrice: 45.99,
        stock: 22,
        discount: null,
        category: 'proteinas'
    },
    {
        name: 'Vitamina D3',
        img: './img/producto_prueba.png',
        description: 'Vitamina D3 de alta potencia para huesos fuertes',
        price: 16.99,
        oldPrice: null,
        stock: 70,
        discount: null,
        category: 'vitaminas'
    },
    {
        name: 'Magnesio Plus',
        img: './img/producto_prueba.png',
        description: 'Magnesio con vitamina B6 para músculos y nervios',
        price: 21.99,
        oldPrice: 26.99,
        stock: 42,
        discount: null,
        category: 'naturales'
    }
];

// Función para crear un card de producto
function crearProductoCard(producto) {
    // Calcular precio con centavos separados
    const precioEntero = Math.floor(producto.price);
    const precioCentavos = (producto.price % 1).toFixed(2).substring(2);
    
    return `
        <div class="producto-card" data-category="${producto.category}">
            <div class="producto-imagen">
                ${producto.discount ? `<span class="badge-descuento">-${producto.discount}%</span>` : ''}
                <img src="${producto.img}" alt="${producto.name}">
            </div>
            <div class="producto-contenido">
                <h3 class="producto-nombre">${producto.name}</h3>
                <p class="producto-descripcion">${producto.description}</p>
                
                <div class="producto-precio-stock">
                    <div class="precio-info">
                        <span class="precio-actual">$${precioEntero}<span class="precio-centavos">.${precioCentavos}</span></span>
                        ${producto.oldPrice ? `<span class="precio-anterior">$${producto.oldPrice}</span>` : ''}
                    </div>
                    <div class="stock-info">
                        <span class="stock-label">Stock:</span>
                        <span class="stock-numero">${producto.stock}</span>
                    </div>
                </div>

                <button class="btn-agregar" data-producto="${producto.name}" data-precio="${producto.price}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    Agregar al Carrito
                </button>
            </div>
        </div>
    `;
}

// Función para renderizar todos los productos
function renderizarProductos(productosAMostrar = productos) {
    const grid = document.querySelector('.productos-grid');
    
    if (!grid) {
        console.error('No se encontró el contenedor de productos');
        return;
    }
    
    // Limpiar el grid
    grid.innerHTML = '';
    
    // Agregar cada producto
    productosAMostrar.forEach(producto => {
        grid.innerHTML += crearProductoCard(producto);
    });
    
    // Inicializar eventos de los botones
    inicializarBotonesAgregar();
}

// Función para filtrar productos por categoría
function filtrarProductos(categoria) {
    if (categoria === 'todos') {
        renderizarProductos(productos);
    } else {
        const productosFiltrados = productos.filter(p => p.category === categoria);
        renderizarProductos(productosFiltrados);
    }
}

// Inicializar botones de filtro
function inicializarFiltros() {
    const botonesFiltro = document.querySelectorAll('.filtro-btn');
    
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            // Remover clase active de todos
            botonesFiltro.forEach(b => b.classList.remove('active'));
            
            // Agregar clase active al clickeado
            boton.classList.add('active');
            
            // Obtener categoría
            const categoria = boton.textContent.toLowerCase();
            
            // Filtrar productos
            filtrarProductos(categoria);
        });
    });
}

// Inicializar botones de agregar al carrito
function inicializarBotonesAgregar() {
    const botones = document.querySelectorAll('.btn-agregar');
    
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const nombreProducto = e.currentTarget.getAttribute('data-producto');
            const precio = e.currentTarget.getAttribute('data-precio');
            //console.log(`Agregado al carrito: ${nombreProducto} - $${precio}`);
            
            //se busca el objeto exacto en el aray 'productos'
            const productoEncontrado = productos.find(p => p.name === nombreProducto);

            if (productoEncontrado) {
                // 3. Creamos el objeto para el carrito usando tus nombres exactos
                const productoParaCarrito = {
                    name: productoEncontrado.name,
                    price: productoEncontrado.price,
                    img: productoEncontrado.img,
                    quantity: 1
                };
                
                agregarAlCarrito(productoParaCarrito);
            }
            // Aquí conectarías con tu carrito
            // agregarAlCarrito(nombreProducto, precio);
            
            // Mostrar feedback visual
            //alert(`✅ ${nombreProducto} agregado al carrito`);
        });
    });
}

function agregarAlCarrito(productoNuevo) {
    // 1. Intentamos traer lo que ya existe en el carrito, si no, creamos un array vacío
    let carrito = JSON.parse(localStorage.getItem('vittalium_cart')) || [];

    // 2. Revisamos si el producto ya está en el carrito para no repetirlo
    const existe = carrito.find(item => item.name === productoNuevo.name);

    if (existe) {
        // Si ya existe, solo aumentamos la cantidad
        existe.quantity += 1;
    } else {
        // Si es nuevo, lo empujamos al array
        carrito.push(productoNuevo);
    }

    // 3. Guardamos el carrito actualizado de vuelta en el LocalStorage
    localStorage.setItem('vittalium_cart', JSON.stringify(carrito));
    
    
    //actualiza el contador del carro
    actualizarContadorCarrito()
    
    console.log("Carrito actualizado:", productoNuevo.nombreProducto);
}

// Cargar productos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Renderizar todos los productos
    renderizarProductos();
    
    // Inicializar filtros
    inicializarFiltros();
    
    console.log(`✅ ${productos.length} productos cargados`);
});

// Exportar para uso en otros archivos (opcional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productos, renderizarProductos, filtrarProductos };
}

function actualizarContadorCarrito() {
    const badge = document.getElementById('cart-count');
    if (!badge) return;

    const datosMem = localStorage.getItem('vittalium_cart');
    const carrito = JSON.parse(datosMem) || [];

    // Sumamos todas las cantidades de los productos
    const totalItems = carrito.reduce((acc, item) => acc + item.quantity, 0);

    badge.textContent = totalItems;

    // Opcional: Ocultar el badge si el carrito está vacío
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Ejecutar al cargar la página para que el número persista al navegar
document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);