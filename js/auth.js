// CONFIGURACIÓN GENERAL
const AUTH_URL = "http://localhost:8080/api/auth";
const GOOGLE_CLIENT_ID = "377149430777-bjvj9pe3p1lcrf1cjnn1if6r2967cmr5.apps.googleusercontent.com";
const FACEBOOK_APP_ID = "25655861484114587";

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

// PROTEGER RUTAS

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

// FUNCIÓN PARA MOSTRAR MENSAJES

function mostrarMensaje(texto, tipo) {
    const mensajeDiv = document.getElementById("login-message");
    if (!mensajeDiv) return;

    mensajeDiv.style.display = "block";
    mensajeDiv.textContent = texto;
    mensajeDiv.className = `alert alert-${tipo === "error" ? "danger" : tipo === "success" ? "success" : "info"}`;

    // Ocultar después de 5 segundos
    setTimeout(() => {
        mensajeDiv.style.display = "none";
    }, 5000);
}

// GOOGLE LOGIN - VERSIÓN CORREGIDA

// Manejador separado para el click de Google
function googleClickHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("🟢 Click en botón de Google detectado");
    if (typeof google !== "undefined" && google.accounts) {
        google.accounts.id.prompt();
    } else {
        console.error("❌ Google SDK no disponible");
        mostrarMensaje("Error: SDK de Google no disponible", "error");
    }
}

// Inicializar Google
window.initGoogleLogin = function () {
    if (typeof google === "undefined" || !google.accounts) {
        console.error("❌ Librería de Google no cargada");
        mostrarMensaje("Error: SDK de Google no cargado", "error");
        return;
    }

    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
    });

    console.log("✅ Google inicializado correctamente");

    // Vincular botón existente
    const googleButton = document.querySelector(".btn-google");
    if (googleButton) {
        // Remover eventos anteriores para evitar duplicados
        googleButton.removeEventListener("click", googleClickHandler);
        googleButton.addEventListener("click", googleClickHandler);
        console.log("✅ Botón de Google vinculado");
    } else {
        console.log("❌ Botón de Google no encontrado en el DOM");
    }
};

// Manejar respuesta de Google - VERSIÓN CORREGIDA con mostrarMensaje
async function handleGoogleResponse(response) {
    if (!response.credential) {
        console.error("❌ No se recibió credential");
        mostrarMensaje("Error: No se recibió token de Google", "error");
        return;
    }

    console.log("🔵 Respuesta de Google recibida");

    // Decodificar token para ver datos (opcional, solo para debug)
    try {
        const tokenParts = response.credential.split(".");
        if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
        }
    } catch (e) {
        console.log("Error decodificando token:", e);
    }

    mostrarMensaje("Verificando con Google...", "info");

    try {
        const fetchResponse = await fetch(`${AUTH_URL}/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: response.credential }),
        });

        const data = await fetchResponse.json();

        if (fetchResponse.ok) {
            guardarSesion(data);
            mostrarMensaje("¡Login exitoso! Redirigiendo...", "success");

            // Redirigir según el rol
            setTimeout(() => {
                if (data.rolId === 1) {
                    window.location.href = "./admin-dashboard.html";
                } else {
                    window.location.href = "./index.html";
                }
            }, 1500);
        } else {
            mostrarMensaje("Error: " + (data.error || "Error en el servidor"), "error");
        }
    } catch (error) {
        console.error("Error:", error);
        mostrarMensaje("Error de conexión con el servidor", "error");
    }
}

// FACEBOOK SDK Y FUNCIONES

// Inicializar Facebook SDK
window.fbAsyncInit = function () {
    FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v18.0",
    });

    console.log("✅ Facebook SDK inicializado");

    // Verificar si ya hay sesión activa en Facebook
    FB.getLoginStatus(function (response) {
        console.log("📊 Estado de Facebook:", response.status);
    });
};

// Cargar SDK de Facebook
(function (d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/es_LA/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

// Función para login con Facebook
async function loginWithFacebook() {
    return new Promise((resolve, reject) => {
        FB.login(
            function (response) {
                if (response.authResponse) {
                    // Enviar token a nuestro backend
                    fetch(`${AUTH_URL}/facebook`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            accessToken: response.authResponse.accessToken,
                        }),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.token) {
                                // Guardar sesión
                                guardarSesion(data);
                                resolve(data);
                            } else {
                                reject(data.error || "Error en el servidor");
                            }
                        })
                        .catch((error) => {
                            console.error("❌ Error:", error);
                            reject("Error de conexión con el servidor");
                        });
                } else {
                    console.log("❌ Usuario canceló el login o no autorizó");
                    reject("No se pudo iniciar sesión con Facebook");
                }
            },
            {
                scope: "email,public_profile",
            },
        );
    });
}

// Vincular botón de Facebook
function vincularBotonFacebook() {
    const facebookButton = document.querySelector(".btn-facebook");

    if (facebookButton) {
        console.log("✅ Botón de Facebook encontrado");

        // Remover eventos anteriores para evitar duplicados
        facebookButton.removeEventListener("click", handleFacebookClick);
        facebookButton.addEventListener("click", handleFacebookClick);

        console.log("✅ Evento click vinculado al botón de Facebook");
    } else {
        console.log("❌ Botón de Facebook no encontrado");
    }
}

// Manejador del click en Facebook
async function handleFacebookClick(e) {
    e.preventDefault();
    e.stopPropagation();

    console.log("🟢 Click en botón de Facebook detectado");

    // Verificar que FB esté cargado
    if (typeof FB === "undefined") {
        console.error("❌ Facebook SDK no cargado");
        mostrarMensaje("Error: SDK de Facebook no cargado", "error");
        return;
    }

    // Mostrar mensaje de carga
    mostrarMensaje("Iniciando sesión con Facebook...", "info");

    try {
        const result = await loginWithFacebook();
        console.log("✅ Login exitoso:", result);

        mostrarMensaje("¡Login exitoso! Redirigiendo...", "success");

        // Redirigir según el rol
        setTimeout(() => {
            if (result.rolId === 1) {
                window.location.href = "./admin-dashboard.html";
            } else {
                window.location.href = "./index.html";
            }
        }, 1500);
    } catch (error) {
        console.error("❌ Error:", error);
        mostrarMensaje("Error: " + error, "error");
    }
}

// OBTENER DATOS DEL USUARIO

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

// ACTUALIZAR NAVBAR

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

// REDIRECCIÓN AUTOMÁTICA

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

// EVENTO REGISTRO

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

        registroAPI(nombre, apellido, email, telefono, password);
        console.log("Datos del nuevo usuario:", { nombre, apellido, email, telefono, newsletter });

        alert(`¡Bienvenido ${nombre}! Tu cuenta ha sido creada exitosamente.`);
    });
}

// INICIALIZACIÓN PRINCIPAL

document.addEventListener("DOMContentLoaded", function () {
    console.log("📄 DOM Content Loaded - Inicializando auth");
    actualizarNavbarSesion();

    // Inicializar Google
    if (typeof google !== "undefined" && google.accounts) {
        window.initGoogleLogin();
    } else {
        console.log("⏳ Esperando SDK de Google...");
        // Intentar de nuevo cuando cargue la ventana
        window.addEventListener("load", function () {
            if (typeof google !== "undefined" && google.accounts) {
                window.initGoogleLogin();
            }
        });
    }

    // Vincular botón de Facebook
    vincularBotonFacebook();
});

// Por si Google carga después
window.addEventListener("load", function () {
    console.log("📄 Window Load - Verificando inicialización");

    if (typeof google !== "undefined" && google.accounts && !window.googleInitialized) {
        window.initGoogleLogin();
        window.googleInitialized = true;
    }

    // Re-vincular botón de Facebook por si acaso
    vincularBotonFacebook();
});
