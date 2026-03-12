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
    actualizarNavbarSesion(); // Actualizar navbar inmediatamente
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

// ACTUALIZAR NAVBAR SEGÚN SESIÓN (VERSIÓN CORREGIDA)
function actualizarNavbarSesion() {
    const user = obtenerSesion();
    
    // Elementos del navbar
    const userDropdown = document.getElementById('userDropdown');
    const btnIniciarSesion = document.getElementById('btnIniciarSesion');
    const nombreUsuario = document.getElementById('usuarioNombre');
    const cartContainer = document.getElementById('cartContainer');
    const adminOnlyElements = document.querySelectorAll('.admin-only');
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');

    if (user) {
        // --- USUARIO LOGUEADO ---
        if (userDropdown) userDropdown.style.display = 'block';
        if (btnIniciarSesion) btnIniciarSesion.style.display = 'none';
        if (nombreUsuario) nombreUsuario.textContent = user.customerName || user.email;

        // Configurar evento de cerrar sesión
        if (btnCerrarSesion) {
            btnCerrarSesion.removeEventListener('click', cerrarSesion);
            btnCerrarSesion.addEventListener('click', (e) => {
                e.preventDefault();
                cerrarSesion();
            });
        }

        // Lógica de roles
        if (user.rolId === 1) {
            // ADMIN: no ve carrito, ve opciones de admin
            if (cartContainer) cartContainer.style.display = 'none';
            adminOnlyElements.forEach(el => el.style.display = 'block');
        } else {
            // CLIENTE: ve carrito, no ve opciones de admin
            if (cartContainer) cartContainer.style.display = 'block';
            adminOnlyElements.forEach(el => el.style.display = 'none');
            
            // Actualizar contador del carrito
            if (typeof window.actualizarContadorCarrito === 'function') {
                window.actualizarContadorCarrito();
            }
        }
    } else {
        // --- USUARIO NO LOGUEADO ---
        if (userDropdown) userDropdown.style.display = 'none';
        if (btnIniciarSesion) btnIniciarSesion.style.display = 'block';
        if (cartContainer) cartContainer.style.display = 'none';
        adminOnlyElements.forEach(el => el.style.display = 'none');
        if (nombreUsuario) nombreUsuario.textContent = 'Cuenta';
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

// EXPONER FUNCIÓN GLOBALMENTE
window.actualizarNavbarSesion = actualizarNavbarSesion;
window.cerrarSesion = cerrarSesion;

