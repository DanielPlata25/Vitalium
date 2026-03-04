document.addEventListener("DOMContentLoaded", function () {
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";

    modalOverlay.innerHTML = `
        <div class="modal-container">
            <form class="modal-form" id="productoForm" method="POST" action="/api/productos">
                <h2> Agregar Nuevo Producto</h2>
                
                <div class="form-group">
                    <label for="nombre">Nombre del Producto *</label>
                    <input type="text" id="product_name" name="product_name" placeholder="Ej: Laptop Gamer" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="categoria">Categoría *</label>
                        <select id="categoria" name="categoria" required>
                            <option value="" disabled selected>Seleccionar</option>
                            <option value="electronica">📱 Electrónica</option>
                            <option value="ropa">👕 Ropa</option>
                            <option value="hogar">🏠 Hogar</option>
                            <option value="deportes">⚽ Deportes</option>
                            <option value="libros">📚 Libros</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="precio">Precio ($) *</label>
                        <input type="number" id="price" name="price" step="0.01" min="0" placeholder="0.00" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="stock">Stock *</label>
                        <input type="number" id="stock" name="stock" min="0" placeholder="0" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="descuento">Descuento (%)</label>
                        <input type="number" id="descuento" name="descuento" min="0" max="100" step="1" value="0" placeholder="0">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="urlImagen">URL de la Imagen *</label>
                    <input type="url" id="image_url" name="image_url" placeholder="https://ejemplo.com/imagen.jpg" required>
                </div>
                
                <div class="form-group">
                    <label for="descripcion">Descripción del Producto *</label>
                    <textarea id="description" name="description" placeholder="Describe las características del producto..." required></textarea>
                </div>
                
                <div class="modal-buttons">
                    <button type="submit" class="btn-crear">✓ Crear Producto</button>
                    <button type="button" class="btn-cancelar">✕ Cancelar</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modalOverlay);

    const btnAgregar = document.querySelector(".btn-agregar");
    const btnCancelar = modalOverlay.querySelector(".btn-cancelar");
    const formulario = modalOverlay.querySelector("#productoForm");

    function abrirModal() {
        modalOverlay.style.display = "flex";
        document.body.style.overflow = "hidden";
    }

    function cerrarModal() {
        modalOverlay.style.display = "none";
        document.body.style.overflow = "auto";
        formulario.reset();
    }

    btnAgregar.addEventListener("click", abrirModal);

    btnCancelar.addEventListener("click", cerrarModal);

    modalOverlay.addEventListener("click", function (e) {
        if (e.target === modalOverlay) {
            cerrarModal();
        }
    });

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(formulario);
        const datosProducto = Object.fromEntries(formData.entries());

        console.log("Producto a crear:", datosProducto);

        // Aquí iría la petición POST real
        setTimeout(() => {
            alert("✅ Producto creado exitosamente");
            cerrarModal();
        }, 500);
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modalOverlay.style.display === "flex") {
            cerrarModal();
        }
    });
});
