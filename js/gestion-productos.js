//protegerRutaAdmin();
const API_URL = "http://localhost:8080/api/product";
const API_CATEGORIAS_URL = "http://localhost:8080/api/categorias";

let productos = [];
let productosFiltrados = [];
let paginaActual = 1;
const productosPorPagina = 10;
let categoriasCache = []; // ← CACHE DE CATEGORÍAS

function convertirUrlDrive(url) {
    if (!url) return url;
    if (url.includes("thumbnail?id=")) return url;
    const match = url.match(/\/d\/([-\w]{25,})/);
    if (match) return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`;
    return url;
}

async function cargarCategoriasDelBackend() {
    try {
        const response = await fetch(`${API_CATEGORIAS_URL}/activas`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const categorias = await response.json();
        categoriasCache = categorias; // ← GUARDAR EN CACHE
        return categorias;
    } catch (error) {
        console.error("Error al cargar categorías:", error);
        return [];
    }
}

async function actualizarSelectCategorias() {
    const categorias = await cargarCategoriasDelBackend();
    const selectCategoria = document.getElementById("categoria");
    
    if (!selectCategoria) return;
    
    // Limpiar opciones existentes (excepto la primera que es el placeholder)
    selectCategoria.innerHTML = '<option value="" disabled selected>Seleccionar</option>';
    
    // Agregar categorías desde el backend
    categorias.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.categoryName.toLowerCase();
        option.textContent = cat.categoryName;
        selectCategoria.appendChild(option);
    });
}

function convertirCategoriaAId(categoryName) {
    const categoria = categoriasCache.find(
        cat => cat.categoryName.toLowerCase() === categoryName.toLowerCase()
    );
    return categoria ? categoria.idCategory : 1; // Default a 1 si no encuentra
}

function convertirAFrontend(p) {
    // Buscar nombre de categoría desde el cache
    const categoria = categoriasCache.find(cat => cat.idCategory === p.idCategory);
    const categoryName = categoria ? categoria.categoryName.toLowerCase() : 'sin categoría';
    
    return {
        id: p.idProduct,
        name: p.productName,
        img: p.imageUrl || "./img/producto_prueba.png",
        description: p.description,
        price: p.price,
        oldPrice: p.oldPrice,
        stock: p.stock,
        discount: p.discount,
        category: categoryName,
    };
}

function convertirABackend(producto) {
    if (!producto.category) {
        throw new Error("Category is required");
    }

    return {
        productName: producto.name,
        description: producto.description,
        stock: parseInt(producto.stock) || 0,
        price: parseFloat(producto.price),
        oldPrice: producto.oldPrice ? parseFloat(producto.oldPrice) : null,
        discount: producto.discount ? parseInt(producto.discount) : null,
        imageUrl: convertirUrlDrive(producto.img),
        idCategory: convertirCategoriaAId(producto.category),
        isActive: true,
    };
}

async function cargarProductosDelBackend() {
    try {
        // Cargar categorías primero
        await cargarCategoriasDelBackend();
        
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        productos = data.map(convertirAFrontend);
        productos = productos.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        productosFiltrados = [...productos];
        paginaActual = 1;

        renderizarTablaProductos();
        actualizarBotones();
    } catch (error) {
        console.error("Error al cargar productos:", error);
        productos = [];
        productosFiltrados = [];
        renderizarTablaProductos();
    }
}

async function crearProductoAPI(producto) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(convertirABackend(producto)),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
}

async function actualizarProductoAPI(id, producto) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(convertirABackend(producto)),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
}

async function eliminarProducto(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
}

document.addEventListener("DOMContentLoaded", async function () {
    window.productoAEliminar = null;

    crearModalProducto();
    crearModalEliminar();
    await cargarProductosDelBackend();

    const modalOverlay = document.querySelector(".modal-overlay");
    const modalEliminarOverlay = document.querySelector(".modal-eliminar-overlay");
    const btnAgregar = document.querySelector(".btn-agregar");
    const formulario = document.querySelector("#productoForm");

    const buscador = document.getElementById("buscador");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");

    btnAgregar.addEventListener("click", () => abrirModalParaCrear(modalOverlay, formulario));
    modalOverlay.querySelector(".btn-cancelar").addEventListener("click", () => cerrarModal(modalOverlay, formulario));

    if (buscador) {
        buscador.addEventListener("input", function (e) {
            const terminoBusqueda = e.target.value.toLowerCase().trim();

            if (terminoBusqueda === "") {
                productosFiltrados = [...productos];
            } else {
                productosFiltrados = productos.filter((producto) => producto.name.toLowerCase().startsWith(terminoBusqueda));
            }

            paginaActual = 1;
            renderizarTablaProductos();
            actualizarBotones();

            const tablaContainer = document.querySelector(".table-container");
            if (tablaContainer) {
                tablaContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        });
    }

    if (prevPageBtn) {
        prevPageBtn.addEventListener("click", () => {
            if (paginaActual > 1) {
                paginaActual--;
                renderizarTablaProductos();
                actualizarBotones();

                const tablaContainer = document.querySelector(".table-container");
                if (tablaContainer) {
                    tablaContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }
            }
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener("click", () => {
            const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
            if (paginaActual < totalPaginas) {
                paginaActual++;
                renderizarTablaProductos();
                actualizarBotones();

                const tablaContainer = document.querySelector(".table-container");
                if (tablaContainer) {
                    tablaContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }
            }
        });
    }

    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) cerrarModal(modalOverlay, formulario);
    });

    modalEliminarOverlay.addEventListener("click", (e) => {
        if (e.target === modalEliminarOverlay) cerrarModalEliminar(modalEliminarOverlay);
    });

    formulario.addEventListener("submit", async function (e) {
        e.preventDefault();

        const datosProducto = Object.fromEntries(new FormData(formulario).entries());

        if (!datosProducto.category) {
            alert("Por favor selecciona una categoría");
            return;
        }

        const productoProcesado = {
            name: datosProducto.name,
            img: datosProducto.img,
            description: datosProducto.description,
            price: parseFloat(datosProducto.price),
            oldPrice: datosProducto.oldPrice ? parseFloat(datosProducto.oldPrice) : null,
            stock: parseInt(datosProducto.stock),
            discount: datosProducto.discount ? parseInt(datosProducto.discount) : null,
            category: datosProducto.category
        };

        const modoEdicion = formulario.dataset.modo === "editar";
        const productoId = formulario.dataset.productoId;

        try {
            if (modoEdicion) {
                productoProcesado.id = parseInt(productoId);
                await actualizarProductoAPI(productoId, productoProcesado);
                alert("Producto actualizado exitosamente");
            } else {
                await crearProductoAPI(productoProcesado);
                alert("Producto creado exitosamente");
            }
            cerrarModal(modalOverlay, formulario);
            await cargarProductosDelBackend();

            const tablaContainer = document.querySelector(".table-container");
            if (tablaContainer) {
                tablaContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        } catch (error) {
            console.error("Error en submit:", error);
            alert("Ocurrió un error. Revisa la consola.");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (modalOverlay.style.display === "flex") cerrarModal(modalOverlay, formulario);
            if (modalEliminarOverlay.style.display === "flex") cerrarModalEliminar(modalEliminarOverlay);
        }
    });

    document.addEventListener("click", async function (e) {
        if (e.target.classList.contains("btn-confirmar-eliminar")) {
            if (window.productoAEliminar) {
                try {
                    await eliminarProducto(window.productoAEliminar);
                    alert("Producto eliminado exitosamente");
                } catch (error) {
                    alert("Error al eliminar el producto");
                }
                cerrarModalEliminar(document.querySelector(".modal-eliminar-overlay"));
                window.productoAEliminar = null;
                await cargarProductosDelBackend();

                const tablaContainer = document.querySelector(".table-container");
                if (tablaContainer) {
                    tablaContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }
            }
        }

        if (e.target.classList.contains("btn-cancelar-eliminar")) {
            cerrarModalEliminar(document.querySelector(".modal-eliminar-overlay"));
            window.productoAEliminar = null;
        }
    });
});

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
                            <!-- Las categorías se cargarán dinámicamente -->
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
                        <input type="number" id="discount" name="discount" min="0" max="100" step="1" placeholder="0">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="oldPrice">Precio Anterior ($)</label>
                        <input type="number" id="oldPrice" name="oldPrice" step="0.01" min="0" placeholder="0.00">
                    </div>
                    <div class="form-group">
                        <label for="img">URL de la Imagen *</label>
                        <input type="text" id="img" name="img" placeholder="./img/producto.png" required>
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
    
    // IMPORTANTE: Cargar categorías después de crear el modal
    actualizarSelectCategorias();
}

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

function renderizarTablaProductos() {
    const tbody = document.getElementById("tabla-productos-body");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (productosFiltrados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">No hay productos. Agrega uno nuevo.</td></tr>';

        const currentPageSpan = document.getElementById("currentPage");
        const totalPagesSpan = document.getElementById("totalPages");
        if (currentPageSpan) currentPageSpan.textContent = paginaActual;
        if (totalPagesSpan) totalPagesSpan.textContent = "1";
        return;
    }

    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productosFiltrados.slice(inicio, fin);

    productosPagina.forEach((producto) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${producto.img}" alt="${producto.name}" class="producto-imagen-tabla" onerror="this.onerror=null; this.src='https://placehold.co/80x80?text=Sin+imagen'"></td>
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

    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    const currentPageSpan = document.getElementById("currentPage");
    const totalPagesSpan = document.getElementById("totalPages");

    if (currentPageSpan) currentPageSpan.textContent = paginaActual;
    if (totalPagesSpan) totalPagesSpan.textContent = totalPaginas || 1;

    document.querySelectorAll(".btn-editar").forEach((boton) => {
        boton.addEventListener("click", (e) => abrirModalParaEditar(parseInt(e.target.dataset.id)));
    });

    document.querySelectorAll(".btn-eliminar").forEach((boton) => {
        boton.addEventListener("click", (e) => {
            window.productoAEliminar = parseInt(e.target.dataset.id);
            const modalEliminar = document.querySelector(".modal-eliminar-overlay");
            if (modalEliminar) {
                modalEliminar.style.display = "flex";
                document.body.style.overflow = "hidden";
            }
        });
    });
}

function actualizarBotones() {
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

    if (prevPageBtn) prevPageBtn.disabled = paginaActual === 1;
    if (nextPageBtn) nextPageBtn.disabled = paginaActual === totalPaginas || totalPaginas === 0;
}

function abrirModalParaCrear(modalOverlay, formulario) {
    document.getElementById("modalTitulo").textContent = "Agregar Nuevo Producto";
    document.getElementById("btnSubmit").textContent = "✓ Crear Producto";
    formulario.reset();
    formulario.dataset.modo = "crear";
    delete formulario.dataset.productoId;
    
    // Actualizar categorías antes de abrir
    actualizarSelectCategorias();
    
    modalOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function abrirModalParaEditar(productoId) {
    const producto = productos.find((p) => p.id === productoId);
    if (!producto) return;

    const modalOverlay = document.querySelector(".modal-overlay");
    const formulario = document.querySelector("#productoForm");

    document.getElementById("modalTitulo").textContent = "Editar Producto";
    document.getElementById("btnSubmit").textContent = "✓ Actualizar Producto";
    formulario.dataset.modo = "editar";
    formulario.dataset.productoId = productoId;

    // Actualizar categorías antes de llenar el formulario
    actualizarSelectCategorias().then(() => {
        document.getElementById("product_name").value = producto.name;
        document.getElementById("categoria").value = producto.category;
        document.getElementById("price").value = producto.price;
        document.getElementById("stock").value = producto.stock;
        document.getElementById("discount").value = producto.discount || "";
        document.getElementById("oldPrice").value = producto.oldPrice || "";
        document.getElementById("img").value = producto.img;
        document.getElementById("description").value = producto.description;
    });

    modalOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function cerrarModal(modalOverlay, formulario) {
    modalOverlay.style.display = "none";
    document.body.style.overflow = "auto";
    formulario.reset();
}

function cerrarModalEliminar(modalEliminar) {
    modalEliminar.style.display = "none";
    document.body.style.overflow = "auto";
}