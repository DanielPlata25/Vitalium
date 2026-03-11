// ========================================
// CONFIGURACIÓN DE LA API
// ========================================
const API_URL = "http://localhost:8080/api/users";

// Array para almacenar los usuarios
let usuarios = [];

// ========================================
// CARGAR USUARIOS DEL BACKEND
// ========================================
async function cargarUsuariosDelBackend() {
    try {
        console.log("📥 Cargando usuarios desde:", API_URL);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const usuariosBackend = await response.json();
        console.log("✅ Usuarios cargados del backend:", usuariosBackend);
        
        // Convertir del formato backend al formato del frontend
        usuarios = usuariosBackend.map(convertirAFormatoFrontend);
        
        // Renderizar tabla
        cargarTabla();
    } catch (error) {
        console.error("❌ Error al cargar usuarios:", error);
        const tabla = document.getElementById('userTable');
        tabla.innerHTML = '<tr><td colspan="5" class="text-center text-danger p-4">Error al cargar usuarios. Verifica que el backend esté funcionando.</td></tr>';
    }
}

// ========================================
// CONVERTIR FORMATO BACKEND → FRONTEND
// ========================================
function convertirAFormatoFrontend(usuarioBackend) {
    return {
        id: usuarioBackend.userId,
        nombre: usuarioBackend.name || 'Sin nombre',
        email: usuarioBackend.email,
        tel: usuarioBackend.phone || 'Sin teléfono',
        fecha: usuarioBackend.userCreatedAt ? new Date(usuarioBackend.userCreatedAt).toLocaleDateString() : 'Desconocida',
        estado: 'Activo', // Por ahora todos activos (puedes agregar campo isActive después)
        pedidos: 0, // TODO: Conectar con módulo de Sales cuando esté listo
        total: 0.00, // TODO: Conectar con módulo de Sales cuando esté listo
        rolId: usuarioBackend.rolId,
        rolName: usuarioBackend.rolName
    };
}

// ========================================
// MOSTRAR DETALLES DE USUARIO
// ========================================
function mostrarDetalles(idRecibido) {
    const usuarioEncontrado = usuarios.find(u => u.id === idRecibido);
    const contenedor = document.querySelector('.col-lg-4'); 

    if (usuarioEncontrado) {
        contenedor.innerHTML = `
            <div class="card shadow-sm border-0 p-4">
                <h4 class="subtitle-gestion mb-4">Detalles del Usuario</h4>
                
                <div class="mb-3">
                    <p class="mb-0 text-muted small">Nombre</p>
                    <p class="fw-bold">${usuarioEncontrado.nombre}</p>
                </div>

                <div class="mb-3">
                    <p class="mb-0 text-muted small">Email</p>
                    <p>${usuarioEncontrado.email}</p>
                </div>

                <div class="mb-3">
                    <p class="mb-0 text-muted small">Teléfono</p>
                    <p>${usuarioEncontrado.tel}</p>
                </div>

                <div class="mb-3">
                    <p class="mb-0 text-muted small">Rol</p>
                    <p><span class="badge ${usuarioEncontrado.rolId === 1 ? 'bg-danger' : 'bg-success'}">${usuarioEncontrado.rolName}</span></p>
                </div>

                <div class="mb-3">
                    <p class="mb-0 text-muted small">Fecha de registro</p>
                    <p>${usuarioEncontrado.fecha}</p>
                </div>

                <div class="d-flex justify-content-around bg-light p-3 rounded my-4">
                    <div class="text-center">
                        <div class="h3 fw-bold text-price">${usuarioEncontrado.pedidos}</div>
                        <small class="text-muted">Pedidos</small>
                    </div>
                    <div class="text-center">
                        <div class="h3 fw-bold text-price">$${usuarioEncontrado.total.toFixed(2)}</div>
                        <small class="text-muted">Gastado</small>
                    </div>
                </div>

                <!-- Acciones de Admin -->
                <div class="mt-4">
                    <h5 class="subtitle-gestion">Acciones</h5>
                    ${usuarioEncontrado.rolId === 2 
                        ? `<button class="btn btn-primary btn-sm w-100 mb-2" onclick="cambiarRol(${usuarioEncontrado.id}, 1)">
                            <i class="fa-solid fa-user-shield"></i> Hacer Administrador
                           </button>`
                        : `<button class="btn btn-warning btn-sm w-100 mb-2" onclick="cambiarRol(${usuarioEncontrado.id}, 2)">
                            <i class="fa-solid fa-user"></i> Hacer Cliente
                           </button>`
                    }
                    <button class="btn btn-danger btn-sm w-100" onclick="eliminarUsuario(${usuarioEncontrado.id})">
                        <i class="fa-solid fa-trash"></i> Eliminar Usuario
                    </button>
                </div>

                <h5 class="subtitle-gestion mt-4">Pedidos Recientes</h5>
                <div class="pedidos-lista">
                    ${generarPedidosRecientes(usuarioEncontrado)}
                </div>
            </div>
        `;
    }
}

// ========================================
// CAMBIAR ROL DE USUARIO
// ========================================
async function cambiarRol(userId, nuevoRol) {
    const rolNombre = nuevoRol === 1 ? 'Administrador' : 'Cliente';
    
    if (!confirm(`¿Cambiar este usuario a ${rolNombre}?`)) return;

    try {
        const response = await fetch(`${API_URL}/${userId}/role?rolId=${nuevoRol}`, {
            method: 'PATCH'
        });

        const data = await response.json();

        if (response.ok) {
            alert('✅ Rol actualizado exitosamente');
            await cargarUsuariosDelBackend(); // Recargar usuarios
            mostrarDetalles(userId); // Actualizar detalles
        } else {
            alert('❌ Error: ' + data.error);
        }
    } catch (error) {
        console.error('Error al cambiar rol:', error);
        alert('❌ Error al cambiar el rol');
    }
}

// ========================================
// ELIMINAR USUARIO
// ========================================
async function eliminarUsuario(userId) {
    if (!confirm('⚠️ ¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.')) return;

    try {
        const response = await fetch(`${API_URL}/${userId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (response.ok) {
            alert('✅ Usuario eliminado exitosamente');
            await cargarUsuariosDelBackend(); // Recargar usuarios
            
            // Limpiar panel de detalles
            const contenedor = document.querySelector('.col-lg-4'); 
            contenedor.innerHTML = `
                <div class="card h-100 shadow-sm border-0 text-center p-5">
                    <div class="my-auto">
                        <i class="fa-solid fa-eye fs-1 text-muted"></i>
                        <p class="text-muted mt-3">Selecciona un usuario para ver sus detalles</p>
                    </div>
                </div>
            `;
        } else {
            alert('❌ Error: ' + data.error);
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('❌ Error al eliminar el usuario');
    }
}

// ========================================
// CARGAR TABLA DE USUARIOS
// ========================================
function cargarTabla() {
    const tabla = document.getElementById('userTable');
    
    if (usuarios.length === 0) {
        tabla.innerHTML = '<tr><td colspan="5" class="text-center p-4">No hay usuarios registrados</td></tr>';
        return;
    }
    
    tabla.innerHTML = usuarios.map(u => `
        <tr>
            <td>
                <div class="fw-bold">${u.nombre}</div>
                <div class="text-muted small">${u.email}</div>
                <span class="badge ${u.estado === 'Activo' ? 'badge-active' : 'badge-inactive'}">${u.estado}</span>
                <span class="badge ${u.rolId === 1 ? 'bg-danger' : 'bg-success'} ms-1">${u.rolName}</span>
            </td>
            <td>
                <div>${u.tel}</div>
                <div class="text-muted small">Desde: ${u.fecha}</div>
            </td>
            <td><span class="badge rounded-pill bg-success px-3">${u.pedidos}</span></td>
            <td class="text-price">$${u.total.toFixed(2)}</td>
            <td>
                <button class="btn btn-view btn-sm" onclick="mostrarDetalles(${u.id})">
                    <i class="fa-solid fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// ========================================
// FILTRAR USUARIOS
// ========================================
function filtrarUsuarios() {
    const filtroEstado = document.getElementById('filtroEstado').value;
    const textoBusqueda = document.getElementById('buscador').value.toLowerCase();
    
    let usuariosFiltrados = usuarios.filter(u => {
        const cumpleEstado = filtroEstado === 'todos' || u.estado.toLowerCase() === filtroEstado.toLowerCase();
        const cumpleBusqueda = textoBusqueda === '' || 
            u.nombre.toLowerCase().includes(textoBusqueda) || 
            u.email.toLowerCase().includes(textoBusqueda);
        
        return cumpleEstado && cumpleBusqueda;
    });
    
    const tabla = document.getElementById('userTable');
    
    if (usuariosFiltrados.length === 0) {
        tabla.innerHTML = `<tr><td colspan="5" class="text-center p-4">No se encontraron usuarios</td></tr>`;
    } else {
        tabla.innerHTML = usuariosFiltrados.map(u => `
            <tr>
                <td>
                    <div class="fw-bold">${u.nombre}</div>
                    <div class="text-muted small">${u.email}</div>
                    <span class="badge ${u.estado === 'Activo' ? 'badge-active' : 'badge-inactive'}">${u.estado}</span>
                    <span class="badge ${u.rolId === 1 ? 'bg-danger' : 'bg-success'} ms-1">${u.rolName}</span>
                </td>
                <td>
                    <div>${u.tel}</div>
                    <div class="text-muted small">Desde: ${u.fecha}</div>
                </td>
                <td><span class="badge rounded-pill bg-success px-3">${u.pedidos}</span></td>
                <td class="text-price">$${u.total.toFixed(2)}</td>
                <td>
                    <button class="btn btn-view btn-sm" onclick="mostrarDetalles(${u.id})">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

// ========================================
// GENERAR PEDIDOS RECIENTES
// ========================================
function generarPedidosRecientes(usuario) {
    // TODO: Conectar con módulo de Sales cuando esté listo
    const pedidos = [
        { id: `#ORDEN-${usuario.id}-1`, fecha: usuario.fecha, estado: "Pendiente" },
    ];
    
    return `<div class="text-muted text-center p-3">
        <i class="fa-solid fa-box-open fs-1 mb-2"></i>
        <p>No hay pedidos registrados aún</p>
        <small>Se mostrará cuando el módulo de Sales esté conectado</small>
    </div>`;
}

// ========================================
// EXPORTAR CSV
// ========================================
function exportarCSV() {
    const csv = [
        ['ID', 'Nombre', 'Email', 'Teléfono', 'Rol', 'Fecha Registro', 'Estado', 'Pedidos', 'Total Gastado'],
        ...usuarios.map(u => [
            u.id,
            u.nombre,
            u.email,
            u.tel,
            u.rolName,
            u.fecha,
            u.estado,
            u.pedidos,
            u.total.toFixed(2)
        ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `usuarios_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
}

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Cargar usuarios del backend
    cargarUsuariosDelBackend();
    
    // Event listeners
    document.getElementById('filtroEstado').addEventListener('change', filtrarUsuarios);
    
    let timeoutId;
    document.getElementById('buscador').addEventListener('input', function() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(filtrarUsuarios, 300);
    });
    
    // Exportar CSV
    document.getElementById('btn-exportar-csv').addEventListener('click', exportarCSV);
});