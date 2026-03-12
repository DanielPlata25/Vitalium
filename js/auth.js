const AUTH_URL = "http://localhost:8080/api/auth";
const GOOGLE_CLIENT_ID = "377149430777-bjvj9pe3p1lcrf1cjnn1if6r2967cmr5.apps.googleusercontent.com";

const formRegistro = document.getElementById("form-registro");

// GUARDAR Y OBTENER SESIÓN
function guardarSesion(data) {
    localStorage.setItem("vittalium_token", data.token);
    localStorage.setItem(
        "vittalium_user",
        JSON.stringify({
            userId: data.userId,
            email: data.email,
            rolId: data.rolId,
            customerId: data.customerId,
            customerName: data.customerName,
        }),
    );
}

function obtenerSesion() {
    const user = localStorage.getItem("vittalium_user");
    return user ? JSON.parse(user) : null;
}

function obtenerToken() {
    return localStorage.getItem("vittalium_token");
}

function cerrarSesion() {
    localStorage.removeItem("vittalium_token");
    localStorage.removeItem("vittalium_user");
    window.location.href = "./index.html";
}

function estaLogueado() {
    return !!obtenerToken();
}

function esAdmin() {
    const user = obtenerSesion();
    return user && user.rolId === 1;
}

// PROTEGER RUTAS DE ADMIN
function protegerRutaAdmin() {
    if (!estaLogueado()) {
        alert("⛔ Debes iniciar sesión para acceder a esta página");
        window.location.href = "./login.html";
        return;
    }

    if (!esAdmin()) {
        alert("⛔ Acceso denegado. Solo administradores pueden acceder a esta página.");
        window.location.href = "./index.html";
        return;
    }
}

function protegerRutaUsuario() {
    if (!estaLogueado()) {
        alert("⛔ Debes iniciar sesión para acceder a esta página");
        window.location.href = "./login.html";
    }
}

// API CALLS
async function loginAPI(email, password) {
    const response = await fetch(`${AUTH_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al iniciar sesión");
    }

    return data;
}

async function registroAPI(nombre, apellido, email, telefono, password) {
    const response = await fetch(`${AUTH_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: `${nombre} ${apellido}`.trim(),
            email,
            phone: telefono,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al crear la cuenta");
    }

    return data;
}

// Inicializar Google cuando carga la página
window.initGoogleLogin = function () {
    if (typeof google === "undefined") {
        console.error("❌ Librería de Google no cargada");
        return;
    }

    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
    });

    console.log("✅ Google inicializado");

    // Vincular botón existente
    const googleButton = document.querySelector(".btn-google");
    if (googleButton) {
        googleButton.addEventListener("click", function (e) {
            e.preventDefault();
            google.accounts.id.prompt();
        });
        console.log("✅ Botón de Google vinculado");
    }
};

// Manejar respuesta de Google
async function handleGoogleResponse(response) {
    if (!response.credential) {
        console.error("❌ No se recibió credential");
        return;
    }

    try {
        const fetchResponse = await fetch("http://localhost:8080/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: response.credential }),
        });

        const data = await fetchResponse.json();

        if (fetchResponse.ok) {
            guardarSesion(data);
            window.location.href = "index.html";
        } else {
            alert("Error: " + (data.error || "Error en el servidor"));
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error de conexión con el servidor");
    }
}

// OBTENER DATOS DEL USUARIO (para compatibilidad)
function getUserData() {
    const user = obtenerSesion();
    const token = obtenerToken();

    if (!user) return null;

    return {
        token: token,
        userId: user.userId,
        email: user.email,
        role: user.rolId,
        customerId: user.customerId,
        name: user.customerName,
    };
}

// Alias para compatibilidad
function logout() {
    cerrarSesion();
}

// ACTUALIZAR NAVBAR SEGÚN SESIÓN
function actualizarNavbarSesion() {
    const user = obtenerSesion();
    const btnIniciarSesion = document.querySelector(".btn-iniciar-sesion");
    const btnCerrarSesion = document.querySelector(".btn-cerrar-sesion");
    const nombreUsuario = document.querySelector(".navbar-usuario-nombre");

    if (user) {
        if (btnIniciarSesion) btnIniciarSesion.style.display = "none";
        if (btnCerrarSesion) {
            btnCerrarSesion.style.display = "inline-block";
            btnCerrarSesion.addEventListener("click", cerrarSesion);
        }
        if (nombreUsuario) nombreUsuario.textContent = user.customerName || user.email;
    } else {
        if (btnIniciarSesion) btnIniciarSesion.style.display = "inline-block";
        if (btnCerrarSesion) btnCerrarSesion.style.display = "none";
        if (nombreUsuario) nombreUsuario.textContent = "";
    }
}

// REDIRECCIÓN AUTOMÁTICA SI YA ESTÁ LOGUEADO
function redirigirSiLogueado() {
    if (estaLogueado()) {
        const user = obtenerSesion();
        if (user.rolId === 1) {
            window.location.href = "./admin-dashboard.html";
        } else {
            window.location.href = "./index.html";
        }
    }
}

if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const password = document.getElementById("password").value;
        const passwordConfirm = document.getElementById("password-confirm").value;
        const terminos = document.querySelector('input[name="terminos"]').checked;
        const newsletter = document.querySelector('input[name="newsletter"]').checked;

        if (password !== passwordConfirm) {
            alert("Las contraseñas no coinciden");
            return;
        }

        if (password.length < 8) {
            alert("La contraseña debe tener al menos 8 caracteres");
            return;
        }

        if (!terminos) {
            alert("Debes aceptar los términos y condiciones");
            return;
        }

        const usuario = {
            nombre,
            apellido,
            email,
            telefono,
            password,
            newsletter,
        };

        registroAPI(nombre, apellido, email, telefono, password);
        console.log("Datos del nuevo usuario:", usuario);

        alert(`¡Bienvenido ${nombre}! Tu cuenta ha sido creada exitosamente.`);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    actualizarNavbarSesion();

    // Inicializar Google si la librería ya está cargada
    if (typeof google !== "undefined") {
        window.initGoogleLogin();
    }
});

// Si la librería de Google carga después, la detectamos
window.addEventListener("load", function () {
    if (typeof google !== "undefined" && !window.googleInitialized) {
        window.initGoogleLogin();
        window.googleInitialized = true;
    }
});
