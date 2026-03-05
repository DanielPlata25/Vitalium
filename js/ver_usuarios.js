let usuarios = [
  { id:1, nombre: "Juan Pérez", email: "juan.perez@email.com", tel: "+52 555 123 4567", fecha: "14/8/2025", pedidos: 12, total: 1456.80, estado: "Activo" },
  { id:2, nombre: "María García", email: "maria.garcia@email.com", tel: "+52 555 234 5678", fecha: "21/9/2025", pedidos: 8, total: 892.50, estado: "Activo"},
  { id:3, nombre: "Carlos López", email: "carlos.lopez@email.com", tel: "+52 555 345 6789", fecha: "9/10/2025", pedidos: 15, total: 2234.00, estado: "Activo" },
  { id:4, nombre: "Ana Martínez", email: "ana.martinez@email.com", tel: "+52 555 456 7890", fecha: "4/11/2025", pedidos: 5, total: 567.25, estado: "Inactivo" },
  { id:5, nombre: "Pedro Sánchez", email: "pedro.sanchez@email.com", tel: "+52 555 567 8901", fecha: "11/1/2026", pedidos: 3, total: 234.90,estado: "Activo" }
];


//En este parte se crea una funcion para mostrar los detalles al seleccionar al usuario
function mostrarDetalles(idRecibido) {
  const usuarioEncontrado = usuarios.find(u => u.id === idRecibido);
  
  
  const contenedor = document.querySelector('.col-lg-4'); 

  if (usuarioEncontrado) {
    contenedor.innerHTML = `
      <div class="card shadow-sm border-0 p-4">
        <h4 class="subtitle-gestion  mb-4">Detalles del Usuario</h4>
        
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

        <h5 class="subtitle-gestion mt-2">Pedidos Recientes</h5>
        <div class="pedidos-lista">
            ${generarPedidosRecientes(usuarioEncontrado)}
        </div>
      </div>
    `;
  }
}

// funcion para que cargue la tabla de usuarios 

function cargarTabla() {
  const tabla = document.getElementById('userTable');
  tabla.innerHTML = usuarios.map(u => `
    <tr>
      <td>
        <div class="fw-bold">${u.nombre}</div>
        <div class="text-muted small">${u.email}</div>
        <span class="badge ${u.estado === 'Activo' ? 'badge-active' : 'badge-inactive'}">${u.estado}</span>
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

//Barra filtrar activo e inactivo

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


document.addEventListener('DOMContentLoaded', function() {
  cargarTabla();
  
  
  document.getElementById('filtroEstado').addEventListener('change', filtrarUsuarios);
  
  let timeoutId;
  document.getElementById('buscador').addEventListener('input', function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(filtrarUsuarios, 300);
  });
});

function generarPedidosRecientes(usuario) {
    
    const pedidos = [
        { id: `#ORDEN-${usuario.id}-1`, fecha: usuario.fecha, estado: "Completado" },
        { id: `#ORDEN-${usuario.id}-2`, fecha: "2026-01-15", estado: "Completado" },
        { id: `#ORDEN-${usuario.id}-3`, fecha: "2025-12-20", estado: "Enviado" },
        { id: `#ORDEN-${usuario.id}-4`, fecha: "2025-11-05", estado: "Completado" },
    ];
    
    return pedidos.map(p => `
        <div class="border-start border-success border-4 ps-3 py-2 bg-light mt-2">
            <div class="d-flex justify-content-between">
                <strong>${p.id}</strong>
                <span class="badge ${p.estado === 'Completado' ? 'bg-success' : 'bg-warning'}">${p.estado}</span>
            </div>
            <small class="text-muted">${p.fecha}</small>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', cargarTabla);