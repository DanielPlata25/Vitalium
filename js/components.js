// 1. Carga de componentes de forma eficiente
async function cargarComponente(ruta, contenedorId) {
    try {
        const response = await fetch(ruta);
        const html = await response.text();
        const contenedor = document.getElementById(contenedorId);
        if (contenedor) {
            contenedor.innerHTML = html;
        }
    } catch (error) {
        console.error(`Error al cargar el componente ${ruta}:`, error);
    }
}

// 2. Función única y centralizada para el carrito
window.actualizarContadorCarrito = function() {
    const badge = document.getElementById('cart-count');
    if (!badge) return;

    const carrito = JSON.parse(localStorage.getItem('vittalium_cart')) || [];
    const totalItems = carrito.reduce((acc, item) => acc + item.quantity, 0);

    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
    
    if (totalItems > 0) {
        badge.classList.add('animar-badge');
    }
};

// 3. Inicialización centralizada (CORREGIDA)
document.addEventListener('DOMContentLoaded', async () => {
    // Cargamos primero el navbar y footer
    await cargarComponente('./components/navbar.html', 'navbar-container');
    await cargarComponente('./components/footer.html', 'footer-container');
    
    console.log('✅ Componentes base cargados');

    // Actualizar contador del carrito
    window.actualizarContadorCarrito();
    
    // LLAMADA CORREGIDA: usar actualizarNavbarSesion en lugar de gestionarSesionNavbar
    if (typeof window.actualizarNavbarSesion === 'function') {
        window.actualizarNavbarSesion();
    } else {
        console.warn('⚠️ función actualizarNavbarSesion no encontrada');
    }
});

// 4. Sincronización automática si el carrito cambia en otra pestaña
window.addEventListener('storage', (e) => {
    if (e.key === 'vittalium_cart') {
        window.actualizarContadorCarrito();
    }
});