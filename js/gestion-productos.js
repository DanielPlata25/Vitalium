const productos = [
    {
        id: 1,
        name: "Multivitamínico Premium",
        img: "./img/producto_prueba.png",
        description: "Complejo vitamínico completo para la salud diaria",
        price: 29.99,
        oldPrice: 39.99,
        stock: 50,
        discount: 10,
        category: "vitaminas",
    },
    {
        id: 2,
        name: "Proteína Whey",
        img: "./img/producto_prueba.png",
        description: "Proteína de alta calidad para el desarrollo muscular",
        price: 42.49,
        oldPrice: 49.99,
        stock: 30,
        discount: 15,
        category: "proteinas",
    },
    {
        id: 3,
        name: "Omega 3",
        img: "./img/producto_prueba.png",
        description: "Ácidos grasos esenciales para el corazón",
        price: 24.99,
        oldPrice: 29.99,
        stock: 45,
        discount: 5,
        category: "naturales",
    },
    {
        id: 4,
        name: "Suplementos Naturales",
        img: "./img/producto_prueba.png",
        description: "Extractos herbales naturales para tu bienestar",
        price: 31.49,
        oldPrice: 34.99,
        stock: 25,
        discount: 10,
        category: "naturales",
    },
    {
        id: 5,
        name: "Vitaminas Esenciales",
        img: "./img/producto_prueba.png",
        description: "Vitaminas esenciales para fortalecer tu sistema inmune",
        price: 19.99,
        oldPrice: 24.99,
        stock: 60,
        discount: 5,
        category: "vitaminas",
    },
    {
        id: 6,
        name: "Proteína Vegetal",
        img: "./img/producto_prueba.png",
        description: "Proteína 100% vegetal de alta absorción",
        price: 31.99,
        oldPrice: 39.99,
        stock: 40,
        discount: 20,
        category: "proteinas",
    },
    {
        id: 7,
        name: "Creatina Monohidrato",
        img: "./img/producto_prueba.png",
        description: "Creatina pura para mejorar tu rendimiento deportivo",
        price: 27.99,
        oldPrice: 32.99,
        stock: 35,
        discount: 15,
        category: "proteinas",
    },
    {
        id: 8,
        name: "Complejo B",
        img: "./img/producto_prueba.png",
        description: "Vitaminas del complejo B para energía y vitalidad",
        price: 18.99,
        oldPrice: 22.99,
        stock: 55,
        discount: 8,
        category: "vitaminas",
    },
    {
        id: 9,
        name: "Colágeno Hidrolizado",
        img: "./img/producto_prueba.png",
        description: "Colágeno para piel, cabello y articulaciones saludables",
        price: 35.99,
        oldPrice: 42.99,
        stock: 28,
        discount: 12,
        category: "naturales",
    },
    {
        id: 10,
        name: "Pre-Workout Energía",
        img: "./img/producto_prueba.png",
        description: "Fórmula pre-entrenamiento para máxima energía",
        price: 38.99,
        oldPrice: 45.99,
        stock: 22,
        discount: 15,
        category: "proteinas",
    },
    {
        id: 11,
        name: "Vitamina D3",
        img: "./img/producto_prueba.png",
        description: "Vitamina D3 de alta potencia para huesos fuertes",
        price: 16.99,
        oldPrice: 19.99,
        stock: 70,
        discount: 5,
        category: "vitaminas",
    },
    {
        id: 12,
        name: "Magnesio Plus",
        img: "./img/producto_prueba.png",
        description: "Magnesio con vitamina B6 para músculos y nervios",
        price: 21.99,
        oldPrice: 26.99,
        stock: 42,
        discount: 10,
        category: "naturales",
    },
];

document.addEventListener("DOMContentLoaded", function () {
    // Variables globales
    let productoAEliminar = null;

    // Crear modales
    crearModalProducto();
    crearModalEliminar();

    // Referencias a elementos
    const modalOverlay = document.querySelector(".modal-overlay");
    const modalEliminarOverlay = document.querySelector(".modal-eliminar-overlay");
    const btnAgregar = document.querySelector(".btn-agregar");
    const btnCancelar = modalOverlay.querySelector(".btn-cancelar");
    const formulario = modalOverlay.querySelector("#productoForm");

    // Renderizar tabla inicial
    renderizarTablaProductos();

    // Event listeners
    btnAgregar.addEventListener("click", () => abrirModalParaCrear(modalOverlay, formulario));
    btnCancelar.addEventListener("click", () => cerrarModal(modalOverlay, formulario));

    // Cerrar modal al hacer clic fuera
    modalOverlay.addEventListener("click", function (e) {
        if (e.target === modalOverlay) {
            cerrarModal(modalOverlay, formulario);
        }
    });

    modalEliminarOverlay.addEventListener("click", function (e) {
        if (e.target === modalEliminarOverlay) {
            cerrarModalEliminar(modalEliminarOverlay);
        }
    });

    // Submit del formulario
    formulario.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(formulario);
        const datosProducto = Object.fromEntries(formData.entries());
        const modoEdicion = formulario.dataset.modo === "editar";
        const productoId = formulario.dataset.productoId;

        // Convertir tipos de datos
        const productoProcesado = {
            name: datosProducto.name,
            img: datosProducto.img,
            description: datosProducto.description,
            price: parseFloat(datosProducto.price),
            oldPrice: datosProducto.oldPrice ? parseFloat(datosProducto.oldPrice) : null,
            stock: parseInt(datosProducto.stock),
            discount: datosProducto.discount ? parseInt(datosProducto.discount) : null,
            category: datosProducto.category,
        };

        if (modoEdicion) {
            // PUT - Actualizar producto existente
            productoProcesado.id = parseInt(productoId);
            await actualizarProductoAPI(productoId, productoProcesado);
        } else {
            // POST - Crear nuevo producto
            await crearProductoAPI(productoProcesado);
        }

        cerrarModal(modalOverlay, formulario);
        renderizarTablaProductos();
    });

    // Cerrar con ESC
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            if (modalOverlay.style.display === "flex") {
                cerrarModal(modalOverlay, formulario);
            }
            if (modalEliminarOverlay.style.display === "flex") {
                cerrarModalEliminar(modalEliminarOverlay);
            }
        }
    });
});

// Función para crear el modal de producto
function crearModalProducto() {
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";

    modalOverlay.innerHTML = `
        <div class="modal-container">
            <form class="modal-form" id="productoForm">
                <h2 id="modalTitulo">Agregar Nuevo Producto</h2>
                <input type="hidden" id="productoId" name="id">
                
                <div class="form-group">
                    <label for="product_name">Nombre del Producto *</label>
                    <input type="text" id="product_name" name="name" placeholder="Ej: Multivitamínico Premium" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="categoria">Categoría *</label>
                        <select id="categoria" name="category" required>
                            <option value="" disabled selected>Seleccionar</option>
                            <option value="vitaminas">Vitaminas</option>
                            <option value="proteinas">Proteínas</option>
                            <option value="naturales">Naturales</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="price">Precio ($) *</label>
                        <input type="number" id="price" name="price" step="0.01" min="0" placeholder="0.00" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="stock">Stock *</label>
                        <input type="number" id="stock" name="stock" min="0" placeholder="0" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="discount">Descuento (%)</label>
                        <input type="number" id="discount" name="discount" min="0" max="100" step="1" value="0" placeholder="0">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="oldPrice">Precio Anterior ($)</label>
                        <input type="number" id="oldPrice" name="oldPrice" step="0.01" min="0" placeholder="0.00">
                    </div>
                    
                    <div class="form-group">
                        <label for="img">URL de la Imagen *</label>
                        <input type="url" id="img" name="img" placeholder="./img/producto.png" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="description">Descripción del Producto *</label>
                    <textarea id="description" name="description" placeholder="Describe las características del producto..." required></textarea>
                </div>
                
                <div class="modal-buttons">
                    <button type="submit" class="btn-crear" id="btnSubmit">✓ Crear Producto</button>
                    <button type="button" class="btn-cancelar">✕ Cancelar</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modalOverlay);
}

// Función para crear el modal de eliminar
function crearModalEliminar() {
    const modalEliminar = document.createElement("div");
    modalEliminar.className = "modal-eliminar-overlay";

    modalEliminar.innerHTML = `
        <div class="modal-eliminar-container">
            <h3>Eliminar Producto</h3>
            <p>¿Estás seguro de que deseas eliminar este producto?</p>
            <div class="modal-eliminar-buttons">
                <button class="btn-confirmar-eliminar">Sí, eliminar</button>
                <button class="btn-cancelar-eliminar">Cancelar</button>
            </div>
        </div>
    `;

    document.body.appendChild(modalEliminar);
}

// Función para renderizar la tabla
function renderizarTablaProductos() {
    const tbody = document.getElementById("tabla-productos-body");

    if (!tbody) {
        console.error("No se encontró el elemento tabla-productos-body");
        return;
    }

    tbody.innerHTML = "";

    productos.forEach((producto) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${producto.img}" alt="${producto.name}" class="producto-imagen-tabla" onerror="this.src='./img/placeholder.png'"></td>
            <td>${producto.name}</td>
            <td>${producto.category}</td>
            <td>$${producto.price.toFixed(2)}</td>
            <td>${producto.stock}</td>
            <td>${producto.discount ? producto.discount + "%" : "-"}</td>
            <td>
                <button class="btn-editar" data-id="${producto.id}">✏️</button>
                <button class="btn-eliminar" data-id="${producto.id}">🗑️</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Agregar event listeners a los nuevos botones
    document.querySelectorAll(".btn-editar").forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const productoId = parseInt(e.target.dataset.id);
            abrirModalParaEditar(productoId);
        });
    });

    document.querySelectorAll(".btn-eliminar").forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const productoId = parseInt(e.target.dataset.id);
            productoAEliminar = productoId;

            const modalEliminar = document.querySelector(".modal-eliminar-overlay");
            if (modalEliminar) {
                modalEliminar.style.display = "flex";
                document.body.style.overflow = "hidden";
            } else {
                console.error("No se encontró el modal de eliminar");
            }
        });
    });
}

// Función para abrir modal en modo creación
function abrirModalParaCrear(modalOverlay, formulario) {
    const modalTitulo = document.getElementById("modalTitulo");
    const btnSubmit = document.getElementById("btnSubmit");

    modalTitulo.textContent = "Agregar Nuevo Producto";
    btnSubmit.textContent = "✓ Crear Producto";
    formulario.reset();
    formulario.dataset.modo = "crear";
    delete formulario.dataset.productoId;

    modalOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
}

// Función para abrir modal en modo edición
function abrirModalParaEditar(productoId) {
    const producto = productos.find((p) => p.id === productoId);

    if (producto) {
        const modalOverlay = document.querySelector(".modal-overlay");
        const formulario = document.querySelector("#productoForm");
        const modalTitulo = document.getElementById("modalTitulo");
        const btnSubmit = document.getElementById("btnSubmit");

        modalTitulo.textContent = "Editar Producto";
        btnSubmit.textContent = "✓ Actualizar Producto";
        formulario.dataset.modo = "editar";
        formulario.dataset.productoId = productoId;

        // Llenar formulario
        document.getElementById("product_name").value = producto.name;
        document.getElementById("categoria").value = producto.category;
        document.getElementById("price").value = producto.price;
        document.getElementById("stock").value = producto.stock;
        document.getElementById("discount").value = producto.discount || 0;
        document.getElementById("oldPrice").value = producto.oldPrice || "";
        document.getElementById("img").value = producto.img;
        document.getElementById("description").value = producto.description;

        modalOverlay.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}

// Función para cerrar modal de producto
function cerrarModal(modalOverlay, formulario) {
    modalOverlay.style.display = "none";
    document.body.style.overflow = "auto";
    formulario.reset();
}

// Función para cerrar modal de eliminar
function cerrarModalEliminar(modalEliminar) {
    modalEliminar.style.display = "none";
    document.body.style.overflow = "auto";
    productoAEliminar = null;
}

//PETICIÓN POST - Crear nuevo producto
async function crearProductoAPI(producto) {
    const url = "https://tu-api.com/api/productos";

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
    };

    try {
        console.log("📤 Enviando POST a:", url);
        console.log("📦 Datos:", producto);

        return new Promise((resolve) => {
            setTimeout(() => {
                const nuevoId = productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1;
                const nuevoProducto = { ...producto, id: nuevoId };
                productos.push(nuevoProducto);
                console.log("✅POST exitoso (simulado)");
                resolve(nuevoProducto);
            }, 500);
        });
    } catch (error) {
        console.error("❌ Error en POST:", error);
        alert("❌ Error al crear el producto");
        throw error;
    }
}

// 🚀 PETICIÓN PUT - Actualizar producto existente
async function actualizarProductoAPI(id, producto) {
    const url = `https://tu-api.com/api/productos/${id}`;

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
    };

    try {
        console.log("📤 Enviando PUT a:", url);
        console.log("📦 Datos:", producto);

        return new Promise((resolve) => {
            setTimeout(() => {
                const index = productos.findIndex((p) => p.id === parseInt(id));
                if (index !== -1) {
                    productos[index] = { ...producto, id: parseInt(id) };
                }
                console.log("✅ PUT exitoso (simulado)");
                resolve(producto);
            }, 500);
        });
    } catch (error) {
        console.error("❌ Error en PUT:", error);
        alert("Error al actualizar el producto");
        throw error;
    }
}

//PETICIÓN DELETE - Eliminar producto
async function eliminarProducto(id) {
    const url = `https://tu-api.com/api/productos/${id}`;

    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        console.log("📤 Enviando DELETE a:", url);

        return new Promise((resolve) => {
            setTimeout(() => {
                const index = productos.findIndex((p) => p.id === id);

                if (index !== -1) {
                    const productoEliminado = productos.splice(index, 1)[0];
                    console.log("✅ Producto eliminado:", productoEliminado);
                    renderizarTablaProductos();
                } else {
                    console.warn("⚠️ Producto no encontrado con ID:", id);
                }

                resolve();
            }, 500);
        });
    } catch (error) {
        console.error("❌ Error en DELETE:", error);
        throw error;
    }
}

// Event listeners para los botones del modal de eliminar
document.addEventListener("click", function (e) {
    // Botón confirmar eliminar
    if (e.target.classList.contains("btn-confirmar-eliminar")) {
        console.log("✅ Confirmar eliminar clickeado");
        if (productoAEliminar) {
            eliminarProducto(productoAEliminar);
            const modalEliminar = document.querySelector(".modal-eliminar-overlay");
            if (modalEliminar) {
                modalEliminar.style.display = "none";
                document.body.style.overflow = "auto";
            }
            productoAEliminar = null;
        }
    }

    // Botón cancelar eliminar
    if (e.target.classList.contains("btn-cancelar-eliminar")) {
        console.log("❌ Cancelar eliminar clickeado");
        const modalEliminar = document.querySelector(".modal-eliminar-overlay");
        if (modalEliminar) {
            modalEliminar.style.display = "none";
            document.body.style.overflow = "auto";
        }
        productoAEliminar = null;
    }
});
