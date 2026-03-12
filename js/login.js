
// login.js - VERSIÓN CORREGIDA
document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const btnSubmit = e.target.querySelector('.btn-login'); 

    try {
        // CORREGIDO: Usar la misma URL que en auth.js
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            
            // Guardar sesión
            guardarSesion(data);
            
            // CORREGIDO: Actualizar navbar antes de redirigir
            if (typeof window.actualizarNavbarSesion === 'function') {
                window.actualizarNavbarSesion();
            }
            
            // Redirigir según rol
            if (data.rolId === 1) {
                window.location.href = './admin-dashboard.html';
            } else {
                window.location.href = './index.html';
            }
        } else {
            const errorData = await response.json();
            alert(errorData.error || 'Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error al conectar con Spring:', error);
        alert('Error al conectar con el servidor');
    }
});