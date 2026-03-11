document.addEventListener('DOMContentLoaded', function () {
    const formLogin = document.getElementById('form-login');

    if (!formLogin) return;

    formLogin.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const btnSubmit = formLogin.querySelector('.btn-login');

        if (!email || !password) {
            alert("Por favor completa todos los campos");
            return;
        }

        btnSubmit.textContent = "Iniciando sesión...";
        btnSubmit.disabled = true;

        try {
            const data = await loginAPI(email, password);
            guardarSesion(data);

            // Redirigir según rol
            if (data.rolId === 1) {
                window.location.href = './admin-dashboard.html';
            } else {
                window.location.href = './index.html';
            }

        } catch (error) {
            alert(error.message || "Credenciales incorrectas");
            btnSubmit.textContent = "Iniciar Sesión";
            btnSubmit.disabled = false;
        }
    });
});