const AUTH_URL = "http://localhost:8080/api/auth";

// ========================================
// GUARDAR Y OBTENER SESIÓN
// ========================================
function guardarSesion(data) {
    localStorage.setItem('vittalium_token', data.token);
    localStorage.setItem('vittalium_user', JSON.stringify({
        userId: data.userId,
        email: data.email,
        rolId: data.rolId,
        customerId: data.customerId,
        customerName: data.customerName
    }));
}

function obtenerSesion() {
    const user = localStorage.getItem('vittalium_user');
    return user ? JSON.parse(user) : null;
}

function obtenerToken() {
    return localStorage.getItem('vittalium_token');
}

function cerrarSesion() {
    localStorage.removeItem('vittalium_token');
    localStorage.removeItem('vittalium_user');
    window.location.href = './index.html';
}

function estaLogueado() {
    return !!obtenerToken();
}

function esAdmin() {
    const user = obtenerSesion();
    return user && user.rolId === 1;
}

// ========================================
// PROTEGER RUTAS DE ADMIN
// ========================================
function protegerRutaAdmin() {
    if (!estaLogueado() || !esAdmin()) {
        window.location.href = './login.html';
    }
}

function protegerRutaUsuario() {
    if (!estaLogueado()) {
        window.location.href = './login.html';
    }
}

// ========================================
// API CALLS
// ========================================
async function loginAPI(email, password) {
    const response = await fetch(`${AUTH_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
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
            password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al crear la cuenta");
    }

    return data;
}

// ========================================
// ACTUALIZAR NAVBAR SEGÚN SESIÓN
// ========================================
function actualizarNavbarSesion() {
    const user = obtenerSesion();
    const btnIniciarSesion = document.querySelector('.btn-iniciar-sesion');
    const btnCerrarSesion = document.querySelector('.btn-cerrar-sesion');
    const nombreUsuario = document.querySelector('.navbar-usuario-nombre');

    if (user) {
        if (btnIniciarSesion) btnIniciarSesion.style.display = 'none';
        if (btnCerrarSesion) {
            btnCerrarSesion.style.display = 'inline-block';
            btnCerrarSesion.addEventListener('click', cerrarSesion);
        }
        if (nombreUsuario) nombreUsuario.textContent = user.customerName || user.email;
    } else {
        if (btnIniciarSesion) btnIniciarSesion.style.display = 'inline-block';
        if (btnCerrarSesion) btnCerrarSesion.style.display = 'none';
        if (nombreUsuario) nombreUsuario.textContent = '';
    }
}

document.addEventListener('DOMContentLoaded', actualizarNavbarSesion);