const AUTH_URL = "http://localhost:8080/api/auth";

// GUARDAR Y OBTENER SESIÓN
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

// PROTEGER RUTAS DE ADMIN
function protegerRutaAdmin() {
    if (!estaLogueado()) {
        
        alert('⛔ Debes iniciar sesión para acceder a esta página');
        window.location.href = './login.html';
        return;
    }
    
    if (!esAdmin()) {
        alert('⛔ Acceso denegado. Solo administradores pueden acceder a esta página.');
        window.location.href = './index.html';
        return;
    }
}

function protegerRutaUsuario() {
    if (!estaLogueado()) {
        alert('⛔ Debes iniciar sesión para acceder a esta página');
        window.location.href = './login.html';
    }
}

// API CALLS
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
        name: user.customerName
    };
}

// Alias para compatibilidad
function logout() {
    cerrarSesion();
}

// ACTUALIZAR NAVBAR SEGÚN SESIÓN

function actualizarNavbarSesion() {
    const user = obtenerSesion();
    const btnIniciarSesion = document.querySelector('.btn-iniciar-sesion');
    const btnCerrarSesion = document.querySelector('.btn-cerrar-sesion');
    const nombreUsuario = document.querySelector('.navbar-usuario-nombre');
    const cartContainer = document.getElementById('cartContainer');
    const adminOnlyElements = document.querySelectorAll('.admin-only');
    const userDropdown = document.getElementById('userDropdown'); // <-- AGREGAR ESTA LÍNEA

    if (user) {
        // --- LÓGICA DE USUARIO LOGUEADO ---
        if (btnIniciarSesion) btnIniciarSesion.style.display = 'none';
        if (userDropdown) userDropdown.style.display = 'block'; // <-- AGREGAR ESTA LÍNEA
        
        if (btnCerrarSesion) {
            btnCerrarSesion.style.display = 'inline-block';
            btnCerrarSesion.removeEventListener('click', cerrarSesion);
            btnCerrarSesion.addEventListener('click', cerrarSesion);
        }
        if (nombreUsuario) nombreUsuario.textContent = user.customerName || user.email;

        // Lógica de roles (Carrito vs Admin)
        if (user.rolId === 1) {
            // Es Administrador
            cartContainer.style.display = 'none';
            adminOnlyElements.forEach(el => el.style.display = 'inline-block');
        } else {
            // Es Cliente
            cartContainer.style.display = 'block';
            adminOnlyElements.forEach(el => el.style.display = 'none');
        }
    } else {
        // --- LÓGICA DE USUARIO NO LOGUEADO (Invitado) ---
        if (btnIniciarSesion) btnIniciarSesion.style.display = 'inline-block';
        if (userDropdown) userDropdown.style.display = 'none'; // <-- AGREGAR ESTA LÍNEA
        if (btnCerrarSesion) btnCerrarSesion.style.display = 'none';
        if (cartContainer) cartContainer.style.display = 'none';
        adminOnlyElements.forEach(el => el.style.display = 'none');
        if (nombreUsuario) nombreUsuario.textContent = '';
    }
}

// REDIRECCIÓN AUTOMÁTICA SI YA ESTÁ LOGUEADO
function redirigirSiLogueado() {
    if (estaLogueado()) {
        const user = obtenerSesion();
        if (user.rolId === 1) {
            window.location.href = './admin-dashboard.html';
        } else {
            window.location.href = './index.html';
        }
    }
}

// document.addEventListener('DOMContentLoaded', actualizarNavbarSesion);


const gestionarSesionNavbar = actualizarNavbarSesion;