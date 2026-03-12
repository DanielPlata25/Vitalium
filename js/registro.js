// registro.js

// ========================================
// TOGGLE MOSTRAR/OCULTAR CONTRASEÑA
// ========================================
const togglePasswordButtons = document.querySelectorAll('.toggle-password');

togglePasswordButtons.forEach(button => {
    button.addEventListener('click', () => {
        const input = button.previousElementSibling;
        
        if (input.type === 'password') {
            input.type = 'text';
            button.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
            `;
        } else {
            input.type = 'password';
            button.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            `;
        }
    });
});

// ========================================
// VALIDACIÓN DE EMAIL EN TIEMPO REAL
// ========================================
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            emailInput.style.borderColor = '#e74c3c';
        } else {
            emailInput.style.borderColor = '';
        }
    });
}

// ========================================
// VALIDACIÓN DE CONTRASEÑAS EN TIEMPO REAL
// ========================================
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('password-confirm');

if (passwordConfirmInput) {
    passwordConfirmInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const passwordConfirm = passwordConfirmInput.value;
        
        if (passwordConfirm && password !== passwordConfirm) {
            passwordConfirmInput.style.borderColor = '#e74c3c';
        } else {
            passwordConfirmInput.style.borderColor = '';
        }
    });
}

// ========================================
// MANEJO DEL ENVÍO DEL FORMULARIO DE REGISTRO
// ========================================
const formRegistro = document.getElementById('form-registro');

if (formRegistro) {
    formRegistro.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        const terminos = document.querySelector('input[name="terminos"]').checked;
        
        // ========================================
        // VALIDACIONES
        // ========================================
        
        // Validar que todos los campos estén llenos
        if (!nombre || !apellido || !email || !telefono || !password || !passwordConfirm) {
            alert('Por favor, completa todos los campos');
            return;
        }
        
        // Validar que las contraseñas coincidan
        if (password !== passwordConfirm) {
            alert('Las contraseñas no coinciden');
            return;
        }
        
        // Validar longitud de contraseña
        if (password.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres');
            return;
        }
        
        // Validar email con expresión regular
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresa un email válido');
            return;
        }
        
        // Validar que el teléfono solo contenga números
        if (!/^\d+$/.test(telefono)) {
            alert('El teléfono debe contener solo números');
            return;
        }
        
        // Validar que aceptó términos
        if (!terminos) {
            alert('Debes aceptar los términos y condiciones');
            return;
        }
        
        // ========================================
        // ENVIAR AL BACKEND USANDO registroAPI
        // ========================================
        
        // Referencia al botón para mostrar estado de carga
        const btnSubmit = formRegistro.querySelector('.btn-login, .btn-crear-cuenta');
        const textoOriginal = btnSubmit.textContent;
        
        // Deshabilitar botón y cambiar texto
        btnSubmit.textContent = 'Creando cuenta...';
        btnSubmit.disabled = true;
        
        try {
            console.log('Enviando datos de registro...', { nombre, apellido, email, telefono });
            
            // ¡IMPORTANTE! Llamar a la función registroAPI de auth.js
            const data = await registroAPI(nombre, apellido, email, telefono, password);
            
            console.log('Respuesta del servidor:', data);
            
            // Si el registro fue exitoso y devuelve token, iniciar sesión automáticamente
            if (data && data.token) {
                // Guardar sesión usando la función de auth.js
                guardarSesion(data);
                alert(`¡Bienvenido ${nombre}! Tu cuenta ha sido creada exitosamente.`);
                window.location.href = './index.html';
            } else {
                // Si no devuelve token, redirigir al login
                alert('Registro exitoso. Por favor, inicia sesión.');
                window.location.href = './login.html';
            }
            
        } catch (error) {
            // Manejar errores
            console.error('Error en registro:', error);
            alert(error.message || 'Error al crear la cuenta. Intenta de nuevo.');
            
            // Restaurar botón
            btnSubmit.textContent = textoOriginal;
            btnSubmit.disabled = false;
        }
    });
}

// ========================================
// BOTONES DE REDES SOCIALES (placeholder)
// ========================================
const btnGoogle = document.querySelector('.btn-google');
const btnFacebook = document.querySelector('.btn-facebook');

if (btnGoogle) {
    btnGoogle.addEventListener('click', () => {
        console.log('Registro con Google');
        alert('Funcionalidad de registro con Google en desarrollo');
    });
}

if (btnFacebook) {
    btnFacebook.addEventListener('click', () => {
        console.log('Registro con Facebook');
        alert('Funcionalidad de registro con Facebook en desarrollo');
    });
}