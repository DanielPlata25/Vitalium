
document.addEventListener('DOMContentLoaded', () => {
    
    // ? ---------------PEDIDOS RECIENTES--------------------
    const ventasRecientes = [
        { id: "#VIT-001", cliente: "Juan Pérez García", fecha: "2025-02-20", total: "$949.99", estado: "Completado", clase: "status-completado" },
        { id: "#VIT-002", cliente: "María López Martínez", fecha: "2025-02-21", total: "$599.98", estado: "Completado", clase: "status-completado" },
        { id: "#VIT-003", cliente: "Carlos Ruiz Sánchez", fecha: "2025-02-22", total: "$1,249.97", estado: "Pendiente", clase: "status-pendiente" },
        { id: "#VIT-004", cliente: "Ana García Hernández", fecha: "2025-02-23", total: "$499.99", estado: "Completado", clase: "status-completado" },
        { id: "#VIT-005", cliente: "Pedro Rodríguez López", fecha: "2025-02-24", total: "$949.98", estado: "Completado", clase: "status-completado" }
    ];

    //?------------------------CARD DE STOCK---------------------
    const productosStock = [
        { nombre: "Proteína Whey Gold", stock: 30, porcentaje: 30 },
        { nombre: "Creatina Monohidrato", stock: 35, porcentaje: 35 },
        { nombre: "Omega 3 Plus", stock: 3, porcentaje: 15 }, // Simulación de stock bajando
        { nombre: "Multivitamínico Premium", stock: 5, porcentaje: 10 } // Crítico
    ];

//?-----------Renderizar Tabla de Pedidos (Unión de sales + customer + payments)-----------------------------------
    const tablaBody = document.getElementById('pedidos-recientes');
    if(tablaBody) {
        tablaBody.innerHTML = ventasRecientes.map(v => `
            <tr>
                <td class="fw-bold text-dark-green">${v.id}</td>
                <td>${v.cliente}</td>
                <td>${v.fecha}</td>
                <td class="fw-bold">${v.total}</td>
                <td><span class="badge-status ${v.clase}">${v.estado}</span></td>
            </tr>
        `).join('');
    }

    //?---------------Renderizar Sección de Stock Bajo--------------------------------------------
    const stockList = document.getElementById('low-stock-list');
    if(stockList) {
        // Ordenamos para mostrar los más bajos primero
        const stockOrdenado = productosStock.sort((a, b) => a.stock - b.stock);
        
        stockList.innerHTML = stockOrdenado.map(p => `
            <div class="mb-3">
                <div class="d-flex justify-content-between mb-1 small">
                    <span>${p.nombre}</span>
                    <span class="${p.stock <= 10 ? 'text-danger' : 'text-muted'} fw-bold">${p.stock} u.</span>
                </div>
                <div class="progress">
                    <div class="progress-bar ${p.stock <= 10 ? 'bg-danger' : 'bg-warning'}" 
                         style="width: ${p.porcentaje}%"></div>
                </div>
            </div>
        `).join('');
    }

    //?-----------------------------------Actualizar KPIs con totales del SQL-----------------------------------
    //?------------------------------Total de la consulta: SELECT SUM(total) FROM sales;------------------------
    const totalVentas = ventasRecientes.reduce((acc, curr) => acc + parseFloat(curr.total.replace('$', '').replace(',', '')), 0);
    console.log("Total de ingresos calculado del SQL: $" + totalVentas.toFixed(2));
});