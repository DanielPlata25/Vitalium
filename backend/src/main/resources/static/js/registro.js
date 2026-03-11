// ========================================
// FORMULARIO DE REGISTRO
// ========================================

const formRegistro = document.getElementById('form-registro');

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

if (formRegistro) {
    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        const terminos = document.querySelector('input[name="terminos"]').checked;
        const newsletter = document.querySelector('input[name="newsletter"]').checked;
        
        if (password !== passwordConfirm) {
            alert('Las contraseñas no coinciden');
            return;
        }
        
        if (password.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres');
            return;
        }
        
        if (!terminos) {
            alert('Debes aceptar los términos y condiciones');
            return;
        }
        
        const usuario = {
            nombre,
            apellido,
            email,
            telefono,
            password,
            newsletter
        };
        
        console.log('Datos del nuevo usuario:', usuario);

        alert(`¡Bienvenido ${nombre}! Tu cuenta ha sido creada exitosamente.`);
        
    });
}

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

//verifica si las contraseñas estan correctas (funcion)
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