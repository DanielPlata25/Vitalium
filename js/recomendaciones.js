const respuestasGuardadas = Number(JSON.parse(localStorage.getItem("respuestas")));
console.log(respuestasGuardadas);

// ========= 0 a 2 =========
if (respuestasGuardadas >= 0 && respuestasGuardadas <= 2) {

  // ===== PRODUCTO 1 =====
  document.getElementById("productoImagen1").src = "";
  document.getElementById("nombreClase1").textContent = "";
  document.getElementById("nombreProducto1").textContent = "";
  document.getElementById("descripcionProducto1").textContent = "";

  document.querySelector(".producto1 .beneficio1 p").textContent = "";
  document.querySelector(".producto1 .beneficio2 p").textContent = "";
  document.querySelector(".producto1 .beneficio3 p").textContent = "";

  document.querySelector(".producto1 .precio span").textContent = "";
  document.querySelector(".producto1 .agregar").innerHTML =
    `<img src="/img/carrito.png" alt="carrito" class="carrito"> ` + "";

  // ===== PRODUCTO 2 =====
  document.getElementById("productoImagen2").src = "";
  document.getElementById("nombreClase2").textContent = "";
  document.getElementById("nombreProducto2").textContent = "";
  document.getElementById("descripcionProducto2").textContent = "";

  document.querySelector(".producto2 .beneficio2-1 p").textContent = "";
  document.querySelector(".producto2 .beneficio2-2 p").textContent = "";
  document.querySelector(".producto2 .beneficio2-3 p").textContent = "";

  document.querySelector(".producto2 .precio span").textContent = "";
  document.querySelector(".producto2 .agregar").innerHTML =
    `<img src="/img/carrito.png" alt="carrito" class="carrito"> ` + "";

  // ===== PRODUCTO 3 =====
  document.getElementById("productoImagen3").src = "";
  document.getElementById("nombreClase3").textContent = "";
  document.getElementById("nombreProducto3").textContent = "";
  document.getElementById("descripcionProducto3").textContent = "";

  document.querySelector(".producto3 .beneficio3-1 p").textContent = "";
  document.querySelector(".producto3 .beneficio3-2 p").textContent = "";
  document.querySelector(".producto3 .beneficio3-3 p").textContent = "";

  document.querySelector(".producto3 .precio span").textContent = "";
  document.querySelector(".producto3 .agregar").innerHTML =
    `<img src="/img/carrito.png" alt="carrito" class="carrito"> ` + "";


// ========= 3 a 4 =========
} else if (respuestasGuardadas >= 3 && respuestasGuardadas <= 4) {

  // ===== PRODUCTO 1 =====
  document.getElementById("productoImagen1").src = "";
  document.getElementById("nombreClase1").textContent = "";
  document.getElementById("nombreProducto1").textContent = "";
  document.getElementById("descripcionProducto1").textContent = "";

  document.querySelector(".producto1 .beneficio1 p").textContent = "";
  document.querySelector(".producto1 .beneficio2 p").textContent = "";
  document.querySelector(".producto1 .beneficio3 p").textContent = "";

  document.querySelector(".producto1 .precio span").textContent = "";
  document.querySelector(".producto1 .agregar").innerHTML =
    `<img src="/img/carrito.png" alt="carrito" class="carrito"> ` + "";

  // ===== PRODUCTO 2 =====
  document.getElementById("productoImagen2").src = "";
  document.getElementById("nombreClase2").textContent = "";
  document.getElementById("nombreProducto2").textContent = "";
  document.getElementById("descripcionProducto2").textContent = "";

  document.querySelector(".producto2 .beneficio2-1 p").textContent = "";
  document.querySelector(".producto2 .beneficio2-2 p").textContent = "";
  document.querySelector(".producto2 .beneficio2-3 p").textContent = "";

  document.querySelector(".producto2 .precio span").textContent = "";
  document.querySelector(".producto2 .agregar").innerHTML =
    `<img src="/img/carrito.png" alt="carrito" class="carrito"> ` + "";

  // ===== PRODUCTO 3 =====
  document.getElementById("productoImagen3").src = "";
  document.getElementById("nombreClase3").textContent = "";
  document.getElementById("nombreProducto3").textContent = "";
  document.getElementById("descripcionProducto3").textContent = "";

  document.querySelector(".producto3 .beneficio3-1 p").textContent = "";
  document.querySelector(".producto3 .beneficio3-2 p").textContent = "";
  document.querySelector(".producto3 .beneficio3-3 p").textContent = "";

  document.querySelector(".producto3 .precio span").textContent = "";
  document.querySelector(".producto3 .agregar").innerHTML =
    `<img src="/img/carrito.png" alt="carrito" class="carrito"> ` + "";


// ========= 5 a 6 =========
} else if (respuestasGuardadas >= 5 && respuestasGuardadas <= 6) {

  // ===== PRODUCTO 1 =====
  document.getElementById("productoImagen1").src = "";
  document.getElementById("nombreClase1").textContent = "";
  document.getElementById("nombreProducto1").textContent = "";
  document.getElementById("descripcionProducto1").textContent = "";

  document.querySelector(".producto1 .beneficio1 p").textContent = "";
  document.querySelector(".producto1 .beneficio2 p").textContent = "";
  document.querySelector(".producto1 .beneficio3 p").textContent = "";

  document.querySelector(".producto1 .precio span").textContent = "";
  document.querySelector(".producto1 .agregar").innerHTML =
    `<img src="/img/carrito.png" alt="carrito" class="carrito"> ` + "";

  // ===== PRODUCTO 2 =====
  document.getElementById("productoImagen2").src = "";
  document.getElementById("nombreClase2").textContent = "";
  document.getElementById("nombreProducto2").textContent = "";
  document.getElementById("descripcionProducto2").textContent = "";

  document.querySelector(".producto2 .beneficio2-1 p").textContent = "";
  document.querySelector(".producto2 .beneficio2-2 p").textContent = "";
  document.querySelector(".producto2 .beneficio2-3 p").textContent = "";

  document.querySelector(".producto2 .precio span").textContent = "";
  document.querySelector(".producto2 .agregar").innerHTML =
    `<img src="/img/carrito.png" alt="carrito" class="carrito"> ` + "";

  // ===== PRODUCTO 3 =====
  document.getElementById("productoImagen3").src = "";
  document.getElementById("nombreClase3").textContent = "";
  document.getElementById("nombreProducto3").textContent = "";
  document.getElementById("descripcionProducto3").textContent = "";

  document.querySelector(".producto3 .beneficio3-1 p").textContent = "";
  document.querySelector(".producto3 .beneficio3-2 p").textContent = "";
  document.querySelector(".producto3 .beneficio3-3 p").textContent = "";

  document.querySelector(".producto3 .precio span").textContent = "";
  document.querySelector(".producto3 .agregar").innerHTML =
    `<img src="/img/carrito.png" alt="carrito" class="carrito"> ` + "";

} else {
  console.warn("Puntaje fuera de rango o no existe en localStorage:", respuestasGuardadas);
}