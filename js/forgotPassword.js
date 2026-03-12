document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");
  const loginCard = document.querySelector(".login-card");

  if (!form || !loginCard) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();

    if (!email) return;

    loginCard.innerHTML = `
      <div class="recovery-success">
        <div class="success-icon">✓</div>
        <h1 class="login-titulo">Revisa tu correo</h1>
        <p class="login-subtitulo mensaje-final">
          Si el correo que ingresaste coincide con una cuenta registrada te enviaremos instrucciones para restablecer tu contraseña. 
        </p>
        <a href="index.html" class="btn-home">Ir al inicio</a>
      </div>
    `;
  });
});