// CONFIGURACIÓN API
const API_URL = "http://localhost:8080/api/product";

let productos = [];

// MAPEO BACKEND -> FRONTEND
const categoriaMap = {
    1: 'vitaminas',
    2: 'proteinas',
    3: 'naturales'
};

function convertirAFrontend(p) {
    return {
        id: p.idProduct,
        name: p.productName,
        img: p.imageUrl || 'https://placehold.co/300x300?text=Sin+imagen',
        description: p.description,
        price: parseFloat(p.price),
        oldPrice: p.oldPrice ? parseFloat(p.oldPrice) : null,
        stock: p.stock,
        discount: p.discount,
        category: categoriaMap[p.idCategory] || 'vitaminas'
    };
}

// CARGAR PRODUCTOS DESDE EL BACKEND
async function cargarProductos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        productos = data.map(convertirAFrontend);
        renderizarProductos(productos);
        inicializarFiltros();
        console.log(`✅ ${productos.length} productos cargados desde el backend`);
    } catch (error) {
        console.error("❌ Error al cargar productos:", error);
        productos = [];
        renderizarProductos([]);
    }
}

// CREAR CARD DE PRODUCTO
function crearProductoCard(producto) {
    const precioFinal = producto.discount 
        ? producto.price * (1 - producto.discount / 100) 
        : producto.price;

    const precioEntero = Math.floor(precioFinal);
    const precioCentavos = (precioFinal % 1).toFixed(2).substring(2);

    return `
        <div class="producto-card" data-category="${producto.category}">
            <div class="producto-imagen">
                ${producto.discount ? `<span class="badge-descuento">-${producto.discount}%</span>` : ''}
                <img src="${producto.img}" alt="${producto.name}" onerror="this.onerror=null; this.src='https://placehold.co/300x300?text=Sin+imagen'">
            </div>
            <div class="producto-contenido">
                <h3 class="producto-nombre">${producto.name}</h3>
                <p class="producto-descripcion">${producto.description}</p>

                <div class="producto-precio-stock">
                    <div class="precio-info">
                        <span class="precio-actual">$${precioEntero}<span class="precio-centavos">.${precioCentavos}</span></span>
                        ${producto.discount && !producto.oldPrice
                            ? `<span class="precio-anterior">$${producto.price}</span>`
                            : producto.oldPrice
                            ? `<span class="precio-anterior">$${producto.oldPrice}</span>`
                            : ''}
                    </div>
                    <div class="stock-info">
                        <span class="stock-label">Stock:</span>
                        <span class="stock-numero">${producto.stock}</span>
                    </div>
                </div>

                <button class="btn-agregar" data-producto="${producto.name}" data-precio="${precioFinal}">
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

// ========================================
// RENDERIZAR PRODUCTOS
// ========================================
function renderizarProductos(productosAMostrar = productos) {
    const grid = document.querySelector('.productos-grid');

    if (!grid) {
        console.error('No se encontró el contenedor de productos');
        return;
    }

    grid.innerHTML = '';

    if (productosAMostrar.length === 0) {
        grid.innerHTML = '<p style="text-align:center; width:100%; padding: 2rem;">No hay productos disponibles.</p>';
        return;
    }

    productosAMostrar.forEach(producto => {
        grid.innerHTML += crearProductoCard(producto);
    });

    inicializarBotonesAgregar();
}

// FILTRAR PRODUCTOS POR CATEGORÍA
function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function filtrarProductos(categoria) {
    if (categoria === 'todos') {
        renderizarProductos(productos);
    } else {
        const filtrados = productos.filter(p => p.category === categoria);
        renderizarProductos(filtrados);
    }
}

function inicializarFiltros() {
    const botonesFiltro = document.querySelectorAll('.filtro-btn');

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesFiltro.forEach(b => b.classList.remove('active'));
            boton.classList.add('active');

            // normalizarTexto convierte "Proteínas" → "proteinas" para que coincida con category
            const categoria = normalizarTexto(boton.textContent.trim());
            filtrarProductos(categoria);
        });
    });
}

// CARRITO (localStorage — temporal hasta integrar tabla cart)
function inicializarBotonesAgregar() {
    const botones = document.querySelectorAll('.btn-agregar');

    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const nombreProducto = e.currentTarget.getAttribute('data-producto');
            const productoEncontrado = productos.find(p => p.name === nombreProducto);

            if (productoEncontrado) {
                const productoParaCarrito = {
                    name: productoEncontrado.name,
                    price: productoEncontrado.price,
                    img: productoEncontrado.img,
                    quantity: 1
                };
                agregarAlCarrito(productoParaCarrito);
            }
        });
    });
}

function agregarAlCarrito(productoNuevo) {
    let carrito = JSON.parse(localStorage.getItem('vittalium_cart')) || [];
    const existe = carrito.find(item => item.name === productoNuevo.name);

    if (existe) {
        existe.quantity += 1;
    } else {
        carrito.push(productoNuevo);
    }

    localStorage.setItem('vittalium_cart', JSON.stringify(carrito));

    if (typeof actualizarContadorCarrito === 'function') {
        actualizarContadorCarrito();
    }

    console.log("Carrito actualizado:", productoNuevo.name);
}

function actualizarContadorCarrito() {
    const badge = document.getElementById('cart-count');
    if (!badge) return;

    const carrito = JSON.parse(localStorage.getItem('vittalium_cart')) || [];
    const totalItems = carrito.reduce((acc, item) => acc + item.quantity, 0);

    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
}

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    actualizarContadorCarrito();
});

// Exportar para uso en otros archivos (opcional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productos, renderizarProductos, filtrarProductos };
}