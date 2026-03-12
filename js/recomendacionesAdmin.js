protegerRutaAdmin();
recomendacionesAdmin.html
const btnAgregar = document.getElementById("btnAgregar");
const btnCancelar = document.getElementById("btnCancelar");
const panelAgregar = document.getElementById("panelAgregar");

const categorias = document.querySelectorAll(".categoria-item");
const categoriasTabla = document.querySelectorAll(".categoria-item2");

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

function seleccionarCategoria(categoriaId) {
  categorias.forEach(item => item.classList.remove("active"));
  categoriasTabla.forEach(item => item.classList.remove("active"));

  const categoriaIzquierda = document.querySelector(`.categoria-item[data-categoria="${categoriaId}"]`);
  const categoriaResumen = document.querySelector(`.categoria-item2[data-categoria="${categoriaId}"]`);

  if (categoriaIzquierda) {
    categoriaIzquierda.classList.add("active");
  }

  if (categoriaResumen) {
    categoriaResumen.classList.add("active");
  }

  let icono = "";
  let nombre = "";
  let cantidad = "";

  if (categoriaIzquierda) {
    icono = categoriaIzquierda.querySelector(".cat-icon")?.textContent || "";
    nombre = categoriaIzquierda.querySelector(".cat-nombre")?.textContent || "";
    cantidad = categoriaIzquierda.querySelector(".cat-badge")?.textContent || "";
  } else if (categoriaResumen) {
    nombre = categoriaResumen.children[0]?.textContent.trim() || "";
    cantidad = categoriaResumen.querySelector(".productos")?.textContent.trim() || "";
  }

  document.getElementById("tituloCategoria").textContent = nombre;
  document.getElementById("productosAsignados").textContent = `Productos asignados a "${nombre}"`;
  document.getElementById("subtituloCategoria").textContent = `${cantidad} productos asignados`;
  document.getElementById("imagenChiquita").textContent = icono;

  abrirEdicion();
}

categorias.forEach(item => {
  item.addEventListener("click", () => {
    const categoriaId = item.dataset.categoria;
    seleccionarCategoria(categoriaId);
  });
});

categoriasTabla.forEach(item => {
  item.addEventListener("click", () => {
    const categoriaId = item.dataset.categoria;
    seleccionarCategoria(categoriaId);
  });
});

btnAgregar.addEventListener("click", function () {
  abrirEdicion();
});

btnCancelar.addEventListener("click", function () {
  cerrarEdicion();
});