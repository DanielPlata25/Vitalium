document.addEventListener("DOMContentLoaded", async () => {
  const respuestasGuardadas = Number(JSON.parse(localStorage.getItem("respuestas")));
  console.log("Puntaje recuperado:", respuestasGuardadas);

  function redirigirAlQuizConMensaje() {
    document.body.innerHTML = `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;background:#f7f7f7;">
        <div style="background:white;padding:32px 40px;border-radius:16px;box-shadow:0 8px 24px rgba(0,0,0,0.08);text-align:center;max-width:420px;">
          <h2 style="margin-bottom:12px;">Primero realiza el quizz</h2>
          <p style="margin-bottom:0;color:#555;">Te estamos redirigiendo para que completes tu evaluación y podamos mostrarte recomendaciones personalizadas.</p>
        </div>
      </div>
    `;

    setTimeout(() => {
      window.location.href = "/quiz.html";
    }, 1800);
  }

  function limpiarCard(numero) {
    document.getElementById(`productoImagen${numero}`).src = "";
    document.getElementById(`productoImagen${numero}`).alt = "";
    document.getElementById(`nombreClase${numero}`).textContent = "";
    document.getElementById(`nombreProducto${numero}`).textContent = "";
    document.getElementById(`descripcionProducto${numero}`).textContent = "";
    document.querySelector(`.producto${numero} .precio span`).textContent = "";

    const beneficiosMap = {
      1: [".beneficio1 p", ".beneficio2 p", ".beneficio3 p"],
      2: [".beneficio2-1 p", ".beneficio2-2 p", ".beneficio2-3 p"],
      3: [".beneficio3-1 p", ".beneficio3-2 p", ".beneficio3-3 p"]
    };

    beneficiosMap[numero].forEach((selector) => {
      const el = document.querySelector(`.producto${numero} ${selector}`);
      if (el) el.textContent = "";
    });
  }

  function renderCard(numero, product) {
  if (!product) {
    limpiarCard(numero);
    return;
  }

  const img = document.getElementById(`productoImagen${numero}`);
  const nombreClase = document.getElementById(`nombreClase${numero}`);
  const nombreProducto = document.getElementById(`nombreProducto${numero}`);
  const descripcionProducto = document.getElementById(`descripcionProducto${numero}`);
  const precio = document.querySelector(`.producto${numero} .precio span`);
  const botonAgregar = document.querySelector(`.producto${numero} .agregar`);

  img.src = product.imageUrl || "/img/producto.png";
  img.alt = product.productName || "producto";
  nombreClase.textContent = "Recomendado para ti";
  nombreProducto.textContent = product.productName || "";
  descripcionProducto.textContent = product.description || "";
  precio.textContent = product.price != null ? `$${product.price}` : "";

  if (botonAgregar) {
    botonAgregar.setAttribute("data-producto", product.productName || "");
    botonAgregar.setAttribute("data-precio", product.price ?? 0);
    botonAgregar.setAttribute("data-img", product.imageUrl || "/img/producto.png");
  }

  const beneficiosMap = {
    1: [".beneficio1 p", ".beneficio2 p", ".beneficio3 p"],
    2: [".beneficio2-1 p", ".beneficio2-2 p", ".beneficio2-3 p"],
    3: [".beneficio3-1 p", ".beneficio3-2 p", ".beneficio3-3 p"]
  };

  const beneficios = [];
  if (product.description) beneficios.push(product.description);
  if (product.price != null) beneficios.push("Precio accesible");
  beneficios.push("Producto recomendado");

  beneficiosMap[numero].forEach((selector, index) => {
    const el = document.querySelector(`.producto${numero} ${selector}`);
    if (el) {
      el.textContent = beneficios[index] || "";
    }
  });
}

  if (isNaN(respuestasGuardadas)) {
    redirigirAlQuizConMensaje();
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8080/api/recommendations/by-points?points=${respuestasGuardadas}`
    );

    console.log("Status response:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error backend recomendaciones:", response.status, errorText);
      alert(`No se pudieron cargar las recomendaciones. Status: ${response.status}`);
      return;
    }

    const data = await response.json();
    console.log("Recomendaciones:", data);

    // Pintar nombre de recomendación
    const nombreRecomendacion = document.getElementById("nombreRecomendacion");
    const nombreRecomendacionTexto = document.getElementById("nombreRecomendacionTexto");

    if (nombreRecomendacion) {
      nombreRecomendacion.textContent = data.recommendationName || "Recomendación personalizada";
    }

    if (nombreRecomendacionTexto) {
      nombreRecomendacionTexto.textContent = data.recommendationName || "Recomendación personalizada";
    }

    // Pintar cards
   const products = data.products || [];

renderCard(1, products[0]);
renderCard(2, products[1]);
renderCard(3, products[2]);

inicializarBotonesAgregarRecomendaciones();
actualizarContadorCarrito();

  } catch (error) {
    console.error("Error fetch recomendaciones:", error);
    alert("Ocurrió un error al conectar con el backend.");
  }
});
function agregarAlCarrito(productoNuevo) {
  let carrito = JSON.parse(localStorage.getItem("vittalium_cart")) || [];
  const existe = carrito.find(item => item.name === productoNuevo.name);

  if (existe) {
    existe.quantity += 1;
  } else {
    carrito.push(productoNuevo);
  }

  localStorage.setItem("vittalium_cart", JSON.stringify(carrito));

  if (typeof actualizarContadorCarrito === "function") {
    actualizarContadorCarrito();
  }

  console.log("Carrito actualizado:", productoNuevo.name);
}

function actualizarContadorCarrito() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;

  const carrito = JSON.parse(localStorage.getItem("vittalium_cart")) || [];
  const totalItems = carrito.reduce((acc, item) => acc + item.quantity, 0);

  badge.textContent = totalItems;
  badge.style.display = totalItems > 0 ? "flex" : "none";
}

function inicializarBotonesAgregarRecomendaciones() {
  const botones = document.querySelectorAll(".agregar");

  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const nombreProducto = e.currentTarget.getAttribute("data-producto");
      const precioProducto = Number(e.currentTarget.getAttribute("data-precio"));
      const imagenProducto = e.currentTarget.getAttribute("data-img");

      if (!nombreProducto) {
        alert("No se encontró el producto.");
        return;
      }

      agregarAlCarrito({
        name: nombreProducto,
        price: precioProducto,
        img: imagenProducto || "https://placehold.co/300x300?text=Sin+imagen",
        quantity: 1
      });
    });
  });
}