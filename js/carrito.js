document.addEventListener('DOMContentLoaded', () => {
    renderizarContenidoCarrito();
});

function renderizarContenidoCarrito() {
    const contenedor = document.getElementById('items-lista'); // El ID que pusimos en el HTML anterior
    const datosMem = localStorage.getItem('vittalium_cart')
    const carrito = JSON.parse(datosMem) || [];

    if (!contenedor) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div style="padding: 20px; text-align: center;">
                <p>Tu carrito está vacío</p>
                <a href="./catalogo-producto.html" style="color: var(--verde-principal)">Ir a la tienda</a>
            </div>`;
        actualizarResumen(0);
        return;
    }

    contenedor.innerHTML = ''; // Limpiar
    let subtotalGeneral = 0;

    carrito.forEach((item, index) => {
        const totalPorProducto = item.price * item.quantity;
        subtotalGeneral += totalPorProducto;

        contenedor.innerHTML += `
            <article class="item-carrito">
                <img src="${item.img}" alt="${item.name}">
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <div class="controles-cantidad">
                        <button onclick="actualizarCantidad(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="actualizarCantidad(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="item-precio-eliminar">
                    <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">🗑️</button>
                    <p class="precio-unitario">$${item.price.toFixed(2)}</p>
                    <p class="precio-total">Total: $${totalPorProducto.toFixed(2)}</p>
                </div>
            </article>
        `;
    });

    actualizarResumen(carrito);
}

function actualizarCantidad(index, cambio) {
    let carrito = JSON.parse(localStorage.getItem('vittalium_cart'));
    carrito[index].quantity += cambio;

    if (carrito[index].quantity <= 0) {
        carrito.splice(index, 1);
    }

    localStorage.setItem('vittalium_cart', JSON.stringify(carrito));
    renderizarContenidoCarrito();
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('vittalium_cart'));
    carrito.splice(index, 1);
    localStorage.setItem('vittalium_cart', JSON.stringify(carrito));
    renderizarContenidoCarrito();
}

function actualizarResumen(subtotal) {
    // Aquí seleccionas los elementos de tu columna derecha (aside)
    // Supongamos que tienes IDs en el HTML del resumen:
    const elSubtotal = document.querySelector('.detalles-pago p:nth-child(1) span');
    const elTotal = document.querySelector('.total-grande span');
    
    if (elSubtotal && elTotal) {
        const impuestos = subtotal * 0.08;
        const totalFinal = subtotal + impuestos;

        elSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        elTotal.textContent = `$${totalFinal.toFixed(2)}`;
    }
}