protegerRutaAdmin();

const btnAgregar = document.getElementById("btnAgregar");
const btnCancelar = document.getElementById("btnCancelar");
const btnGuardar = document.querySelector(".botonGuardar");
const panelAgregar = document.getElementById("panelAgregar");
const buscador = document.getElementById("buscadorProductos");
const contenedorBusqueda = document.getElementById("insertar-grid-lista");
const contenedorAsignados = document.getElementById("productosAsignadosLista");

const categorias = document.querySelectorAll(".categoria-item");
const categoriasTabla = document.querySelectorAll(".categoria-item2");

const categoriaToPoints = {
  "equilibrio-vital": 0,
  "bienestar-interior": 1,
  "control-energia": 2,
  "control-estres": 3,
  "rendimiento": 4,
  "movimiento-articular": 5,
  "mantenimiento-general": 6
};

let categoriaActual = null;
let puntosActuales = null;
let productosBusqueda = [];
let productosSeleccionados = [];

btnCancelar.style.display = "none";
panelAgregar.style.display = "none";

function abrirEdicion() {
  btnAgregar.style.display = "none";
  btnCancelar.style.display = "flex";
  panelAgregar.style.display = "flex";
}

function cerrarEdicion() {
  btnAgregar.style.display = "";
  btnCancelar.style.display = "none";
  panelAgregar.style.display = "none";
}

function actualizarBadgeYCabecera() {
  const cantidad = productosSeleccionados.length;

  document.getElementById("subtituloCategoria").textContent = `${cantidad} productos asignados`;

  const categoriaIzquierda = document.querySelector(
    `.categoria-item[data-categoria="${categoriaActual}"]`
  );
  const categoriaResumen = document.querySelector(
    `.categoria-item2[data-categoria="${categoriaActual}"]`
  );

  if (categoriaIzquierda) {
    const badge = categoriaIzquierda.querySelector(".cat-badge");
    if (badge) badge.textContent = cantidad;
  }

  if (categoriaResumen) {
    const productosSpan = categoriaResumen.querySelector(".productos");
    if (productosSpan) productosSpan.textContent = cantidad;

    const nombres = categoriaResumen.querySelector(".categoriaResumenPadre");
    if (nombres) {
      nombres.innerHTML = productosSeleccionados
        .map(
          (p) => `<span class="categoriaResumen">${p.productName}</span>`
        )
        .join("");
    }
  }
}

function renderProductosAsignados() {
  contenedorAsignados.innerHTML = "";

  if (productosSeleccionados.length === 0) {
    contenedorAsignados.innerHTML = `<p>No hay productos asignados.</p>`;
    return;
  }

  productosSeleccionados.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "producto1";

    card.innerHTML = `
      <div class="imagen1">
        <img 
          src="${product.imageUrl || "/img/producto.png"}" 
          alt="${product.productName}" 
          class="productoImagen"
        >
      </div>
      <div class="mitadAbajo">
        <div class="clase">
          <span>${product.categoryName || `Categoría ID: ${product.idCategory ?? "-"}`}</span>
        </div>
        <div class="nombreProducto">
          <span>${product.productName}</span>
        </div>
        <div class="precios">
          <div class="precio">
            <span>$${product.price ?? ""}</span>
          </div>
          <img 
            src="/img/borrar.png" 
            alt="borrar" 
            class="borrar" 
            data-index="${index}"
          >
        </div>
      </div>
    `;

    contenedorAsignados.appendChild(card);
  });

  contenedorAsignados.querySelectorAll(".borrar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);

      productosSeleccionados.splice(index, 1);

      actualizarBadgeYCabecera();
      renderProductosAsignados();
      renderBusqueda();
    });
  });
}

function renderBusqueda() {
  contenedorBusqueda.innerHTML = "";

  if (productosBusqueda.length === 0) {
    contenedorBusqueda.innerHTML = `<p>No se encontraron productos.</p>`;
    return;
  }

  productosBusqueda.forEach((product) => {
    const yaSeleccionado = productosSeleccionados.some(
      (p) => Number(p.idProduct) === Number(product.idProduct)
    );

    const item = document.createElement("div");
    item.className = "insertar-grid";

    item.innerHTML = `
      <div class="insertar-grid-imagen">
        <img 
          src="${product.imageUrl || "/img/producto.png"}" 
          alt="${product.productName}" 
          class="imagenGrid"
        >
      </div>
      <div class="insertar-grid-detalles">
        <div class="insertar-grid-nombre">${product.productName}</div>
        <div class="insertar-grid-categoria">
          ${product.categoryName || `Categoría ID: ${product.idCategory ?? "-"}`}
        </div>
        <div class="insertar-grid-precio">$${product.price ?? ""}</div>
      </div>
    `;

    if (!yaSeleccionado) {
      item.style.cursor = "pointer";
      item.style.opacity = "1";

      item.addEventListener("click", () => {
        if (productosSeleccionados.length >= 3) {
          alert("Solo puedes asignar máximo 3 productos por recomendación.");
          return;
        }

        productosSeleccionados.push({
          ...product,
          idProduct: Number(product.idProduct)
        });

        actualizarBadgeYCabecera();
        renderProductosAsignados();
        renderBusqueda();
      });
    } else {
      item.style.opacity = "0.5";
      item.style.cursor = "not-allowed";
    }

    contenedorBusqueda.appendChild(item);
  });
}

async function buscarProductos(query = "") {
  try {
    const response = await fetch(
      `http://localhost:8080/api/product/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("No se pudieron cargar productos");
    }

    productosBusqueda = (await response.json()).map((p) => ({
      ...p,
      idProduct: Number(p.idProduct)
    }));

    renderBusqueda();
  } catch (error) {
    console.error("Error buscando productos:", error);
    contenedorBusqueda.innerHTML = `<p>Error al cargar productos.</p>`;
  }
}

async function cargarRecomendacionPorPuntos(points) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/recommendations/by-points?points=${points}`
    );

    if (!response.ok) {
      throw new Error("No se pudo cargar la recomendación");
    }

    const data = await response.json();

    productosSeleccionados = (data.products || []).map((p) => ({
      ...p,
      idProduct: Number(p.idProduct)
    }));

    actualizarBadgeYCabecera();
    renderProductosAsignados();
    renderBusqueda();
  } catch (error) {
    console.error("Error cargando recomendación:", error);

    productosSeleccionados = [];
    actualizarBadgeYCabecera();
    renderProductosAsignados();
    renderBusqueda();
  }
}

function seleccionarCategoria(categoriaId) {
  categoriaActual = categoriaId;
  puntosActuales = categoriaToPoints[categoriaId];

  categorias.forEach((item) => item.classList.remove("active"));
  categoriasTabla.forEach((item) => item.classList.remove("active"));

  const categoriaIzquierda = document.querySelector(
    `.categoria-item[data-categoria="${categoriaId}"]`
  );
  const categoriaResumen = document.querySelector(
    `.categoria-item2[data-categoria="${categoriaId}"]`
  );

  if (categoriaIzquierda) categoriaIzquierda.classList.add("active");
  if (categoriaResumen) categoriaResumen.classList.add("active");

  let icono = "";
  let nombre = "";
  let cantidad = "0";

  if (categoriaIzquierda) {
    icono = categoriaIzquierda.querySelector(".cat-icon")?.textContent || "";
    nombre = categoriaIzquierda.querySelector(".cat-nombre")?.textContent || "";
    cantidad = categoriaIzquierda.querySelector(".cat-badge")?.textContent || "0";
  } else if (categoriaResumen) {
    nombre = categoriaResumen.children[0]?.textContent.trim() || "";
    cantidad = categoriaResumen.querySelector(".productos")?.textContent.trim() || "0";
  }

  document.getElementById("tituloCategoria").textContent = nombre;
  document.getElementById("productosAsignados").textContent = `Productos asignados a "${nombre}"`;
  document.getElementById("subtituloCategoria").textContent = `${cantidad} productos asignados`;
  document.getElementById("imagenChiquita").textContent = icono;

  abrirEdicion();
  cargarRecomendacionPorPuntos(puntosActuales);
}

async function guardarCambios() {
  if (puntosActuales === null) {
    alert("Selecciona una categoría primero.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8080/api/recommendations/by-points/${puntosActuales}/products`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productIds: productosSeleccionados.map((p) => Number(p.idProduct))
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "No se pudieron guardar los cambios.");
      return;
    }

    alert("Productos asignados guardados correctamente.");
    cerrarEdicion();
    await cargarRecomendacionPorPuntos(puntosActuales);
  } catch (error) {
    console.error("Error guardando recomendación:", error);
    alert("Ocurrió un error al guardar.");
  }
}

categorias.forEach((item) => {
  item.addEventListener("click", () => {
    seleccionarCategoria(item.dataset.categoria);
  });
});

categoriasTabla.forEach((item) => {
  item.addEventListener("click", () => {
    seleccionarCategoria(item.dataset.categoria);
  });
});

btnAgregar.addEventListener("click", abrirEdicion);
btnCancelar.addEventListener("click", cerrarEdicion);
btnGuardar.addEventListener("click", guardarCambios);

if (buscador) {
  buscador.addEventListener("input", (e) => {
    buscarProductos(e.target.value.trim());
  });
}

buscarProductos();
seleccionarCategoria("equilibrio-vital");