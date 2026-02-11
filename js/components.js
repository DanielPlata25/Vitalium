// Función para cargar componentes
async function cargarComponente(ruta, contenedorId) {
    try {
        const response = await fetch(ruta);
        const html = await response.text();
        document.getElementById(contenedorId).innerHTML = html;
    } catch (error) {
        console.error('Error al cargar componente:', error);
    }
}

// Cargar navbar y footer cuando la página esté lista
document.addEventListener('DOMContentLoaded', async () => {
    // Cargar navbar
    await cargarComponente('./components/navbar.html', 'navbar-container');
    
    // Cargar footer
    await cargarComponente('./components/footer.html', 'footer-container');
    
    console.log('✅ Navbar y Footer cargados');
    
    // 👇 AHORA SÍ inicializar el menú hamburguesa
    inicializarMenu();
});

// Función para el menú hamburguesa
function inicializarMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Verificar que existan los elementos
    if (!menuBtn || !navLinks) {
        console.error('No se encontró el botón o los links del menú');
        return;
    }
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });
    
    console.log('✅ Menú hamburguesa inicializado');
}