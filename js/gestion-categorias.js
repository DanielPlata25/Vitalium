const API_URL = "http://localhost:8080/api/categorias";

let categorias = [];
let categoriaAEliminar = null;
let modalBS = null;
let eliminarModalBS = null;

let paginaActual = 1;
const categoriasPorPagina = 5; // 5 por página para categorías

// ========================================
// MAPEO BACKEND → FRONTEND
// ========================================
function convertirAFrontend(c) {
    return {
        id: c.idCategory,
        nombre: c.categoryName,
        descripcion: c.description || "",
        activa: c.isActive,
    };
}

function convertirABackend(categoria) {
    return {
        categoryName: categoria.nombre,
        description: categoria.descripcion,
        isActive: categoria.activa ?? true,
    };
}

// ========================================
// API CALLS
// ========================================
async function cargarCategorias() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        categorias = data.map(convertirAFrontend);
        // 🔍 NUEVO: Ordenar categorías de A a Z
        categorias = categorias.sort((a, b) => a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()));
        paginaActual = 1;

        renderizarTabla(categorias); // 🔍 MODIFICADO: pasamos categorias directamente
        actualizarBotones(); // 🔍 NUEVO: actualizar estado de botones
    } catch (error) {
        console.error("Error al cargar categorías:", error);
        categorias = [];
        renderizarTabla([]);
    }
}

async function crearCategoriaAPI(categoria) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(convertirABackend(categoria)),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
}

async function actualizarCategoriaAPI(id, categoria) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(convertirABackend(categoria)),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
}

async function eliminarCategoriaAPI(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
}

async function toggleCategoriaAPI(id) {
    const response = await fetch(`${API_URL}/${id}/toggle-status`, { method: "PATCH" });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
}

// ========================================
// RENDERIZAR TABLA
// ========================================
function renderizarTabla(lista) {
    const tbody = document.getElementById("tabla-categorias-body");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (lista.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted py-4">No hay categorías. Agrega una nueva.</td></tr>';
        return;
    }

    // Calcular índices para paginación usando la lista recibida
    const inicio = (paginaActual - 1) * categoriasPorPagina;
    const fin = inicio + categoriasPorPagina;
    const categoriasPagina = lista.slice(inicio, fin);

    categoriasPagina.forEach((categoria) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="fw-bold">${categoria.nombre}</td>
            <td>${categoria.descripcion || "-"}</td>
            <td>
                <span class="badge ${categoria.activa ? "bg-success" : "bg-secondary"}">
                    ${categoria.activa ? "Activa" : "Inactiva"}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1 btn-editar" data-id="${categoria.id}">Editar</button>
                <button class="btn btn-sm ${categoria.activa ? "btn-outline-warning" : "btn-outline-success"} me-1 btn-toggle" data-id="${categoria.id}">
                    ${categoria.activa ? "Desactivar" : "Activar"}
                </button>
                <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${categoria.id}" data-nombre="${categoria.nombre}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Actualizar información de paginación con la lista completa
    actualizarInfoPaginacion(lista);

    // Event listeners
    document.querySelectorAll(".btn-editar").forEach((btn) => {
        btn.addEventListener("click", (e) => abrirModalEditar(parseInt(e.target.dataset.id)));
    });

    document.querySelectorAll(".btn-toggle").forEach((btn) => {
        btn.addEventListener("click", (e) => toggleCategoria(parseInt(e.target.dataset.id)));
    });

    document.querySelectorAll(".btn-eliminar").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            categoriaAEliminar = parseInt(e.target.dataset.id);
            document.getElementById("nombreCategoriaEliminar").textContent = e.target.dataset.nombre;
            eliminarModalBS.show();
        });
    });
}

// 🔍 NUEVA: Función para actualizar información de paginación
function actualizarInfoPaginacion(lista) {
    const totalCategorias = lista.length;
    const totalPaginas = Math.ceil(totalCategorias / categoriasPorPagina);
    const inicio = totalCategorias === 0 ? 0 : (paginaActual - 1) * categoriasPorPagina + 1;
    const fin = Math.min(paginaActual * categoriasPorPagina, totalCategorias);

    // Actualizar texto informativo
    const mostrandoDesde = document.getElementById("mostrandoDesde");
    const mostrandoHasta = document.getElementById("mostrandoHasta");
    const totalCategoriasSpan = document.getElementById("totalCategorias");

    if (mostrandoDesde) mostrandoDesde.textContent = inicio;
    if (mostrandoHasta) mostrandoHasta.textContent = fin;
    if (totalCategoriasSpan) totalCategoriasSpan.textContent = totalCategorias;

    // Actualizar números de página
    const currentPageSpan = document.getElementById("currentPageCategorias");
    const totalPagesSpan = document.getElementById("totalPagesCategorias");

    if (currentPageSpan) currentPageSpan.textContent = paginaActual;
    if (totalPagesSpan) totalPagesSpan.textContent = totalPaginas || 1;
}

// 🔍 NUEVA: Función para actualizar el estado de los botones de paginación
function actualizarBotones() {
    const prevPageBtn = document.getElementById("prevPageCategorias");
    const nextPageBtn = document.getElementById("nextPageCategorias");
    const totalPaginas = Math.ceil(categorias.length / categoriasPorPagina);

    if (prevPageBtn) prevPageBtn.disabled = paginaActual === 1;
    if (nextPageBtn) nextPageBtn.disabled = paginaActual === totalPaginas || totalPaginas === 0;
}

// ========================================
// MODAL CREAR
// ========================================
function abrirModalCrear() {
    document.getElementById("categoriaModalTitulo").textContent = "Nueva Categoría";
    document.getElementById("btnGuardarCategoria").textContent = "Guardar";
    document.getElementById("categoriaForm").reset();
    document.getElementById("categoriaId").value = "";
    modalBS.show();
}

// ========================================
// MODAL EDITAR
// ========================================
function abrirModalEditar(id) {
    const categoria = categorias.find((c) => c.id === id);
    if (!categoria) return;

    document.getElementById("categoriaModalTitulo").textContent = "Editar Categoría";
    document.getElementById("btnGuardarCategoria").textContent = "Actualizar";
    document.getElementById("categoriaId").value = categoria.id;
    document.getElementById("categoriaNombre").value = categoria.nombre;
    document.getElementById("categoriaDescripcion").value = categoria.descripcion;
    modalBS.show();
}

// ========================================
// TOGGLE ACTIVO/INACTIVO
// ========================================
async function toggleCategoria(id) {
    try {
        await toggleCategoriaAPI(id);
        await cargarCategorias();
    } catch (error) {
        console.error("Error al cambiar estado:", error);
        alert("Error al cambiar el estado de la categoría");
    }
}

// ========================================
// BUSCADOR
// ========================================
function inicializarBuscador() {
    const buscador = document.getElementById("buscadorCategorias");
    if (!buscador) return;

    buscador.addEventListener("input", (e) => {
        const texto = e.target.value.toLowerCase().trim();

        let categoriasFiltradas;

        if (texto === "") {
            categoriasFiltradas = [...categorias];
        } else {
            // Buscar palabras que EMPIECEN con el término (en nombre o descripción)
            categoriasFiltradas = categorias.filter((c) => c.nombre.toLowerCase().startsWith(texto) || c.descripcion.toLowerCase().startsWith(texto));
        }

        paginaActual = 1;
        renderizarTabla(categoriasFiltradas);
        actualizarBotones();

        // Scroll suave al inicio de la tabla
        const tablaContainer = document.querySelector(".admin-card");
        if (tablaContainer) {
            tablaContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    });
}

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener("DOMContentLoaded", async function () {
    modalBS = new bootstrap.Modal(document.getElementById("categoriaModal"));
    eliminarModalBS = new bootstrap.Modal(document.getElementById("eliminarModal"));

    await cargarCategorias();
    inicializarBuscador();

    // 🔍 NUEVO: Eventos de paginación
    const prevPageBtn = document.getElementById("prevPageCategorias");
    const nextPageBtn = document.getElementById("nextPageCategorias");

    if (prevPageBtn) {
        prevPageBtn.addEventListener("click", () => {
            if (paginaActual > 1) {
                paginaActual--;
                renderizarTabla(categorias); // Pasamos el array original
                actualizarBotones();

                // Scroll suave al inicio de la tabla
                const tablaContainer = document.querySelector(".admin-card");
                if (tablaContainer) {
                    tablaContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }
            }
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener("click", () => {
            const totalPaginas = Math.ceil(categorias.length / categoriasPorPagina);
            if (paginaActual < totalPaginas) {
                paginaActual++;
                renderizarTabla(categorias); // Pasamos el array original
                actualizarBotones();

                // Scroll suave al inicio de la tabla
                const tablaContainer = document.querySelector(".admin-card");
                if (tablaContainer) {
                    tablaContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }
            }
        });
    }

    // Botón nueva categoría
    document.getElementById("btnNuevaCategoria").addEventListener("click", abrirModalCrear);

    // Guardar (crear o editar)
    document.getElementById("btnGuardarCategoria").addEventListener("click", async function () {
        const nombre = document.getElementById("categoriaNombre").value.trim();
        const descripcion = document.getElementById("categoriaDescripcion").value.trim();
        const id = document.getElementById("categoriaId").value;

        if (!nombre) {
            alert("El nombre de la categoría es requerido");
            return;
        }

        const categoria = { nombre, descripcion, activa: true };

        try {
            if (id) {
                await actualizarCategoriaAPI(id, categoria);
                alert("Categoría actualizada exitosamente");
            } else {
                await crearCategoriaAPI(categoria);
                alert("Categoría creada exitosamente");
            }
            modalBS.hide();
            await cargarCategorias();
        } catch (error) {
            console.error("Error al guardar categoría:", error);
            alert("Error al guardar la categoría. Revisa la consola.");
        }
    });

    // Confirmar eliminar
    document.getElementById("btnConfirmarEliminar").addEventListener("click", async function () {
        if (!categoriaAEliminar) return;
        try {
            await eliminarCategoriaAPI(categoriaAEliminar);
            alert("Categoría eliminada exitosamente");
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("Error al eliminar la categoría");
        }
        eliminarModalBS.hide();
        categoriaAEliminar = null;
        await cargarCategorias();
    });
});
