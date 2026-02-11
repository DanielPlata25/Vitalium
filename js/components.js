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
    
    // Variable para controlar el timeout del scroll
    let scrollTimeout;
    
    // Toggle del menú al hacer click
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
        
        // Cambiar el icono
        menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    
    // Cerrar menú al hacer scroll
    window.addEventListener('scroll', () => {
        // Limpiar timeout anterior
        clearTimeout(scrollTimeout);
        
        // Ejecutar después de que el usuario deje de hacer scroll
        scrollTimeout = setTimeout(() => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
                menuBtn.textContent = '☰'; // Restaurar icono
            }
        }, 50); // Pequeño retraso para mejor rendimiento
    });
    
    //  Cerrar menú al hacer click en un enlace
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            menuBtn.textContent = '☰';
        });
    });
    
    //  Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        const isClickInside = menuBtn.contains(e.target) || navLinks.contains(e.target);
        
        if (!isClickInside && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            menuBtn.textContent = '☰';
        }
    });
    
    //  Cerrar menú al redimensionar la ventana (para responsive)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            menuBtn.textContent = '☰';
        }
    });
    
    console.log('✅ Menú hamburguesa inicializado con todas las funcionalidades');
}