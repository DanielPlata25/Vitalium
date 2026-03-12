document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");
  const loginCard = document.querySelector(".login-card");

  if (!form || !loginCard) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();

    if (!email) {
      alert("Ingresa un correo válido.");
      return;
    }

    const recoveryCode = Math.floor(100000 + Math.random() * 900000).toString();

    localStorage.setItem("recoveryEmail", email);
    localStorage.setItem("recoveryCode", recoveryCode);

    try {
      await emailjs.send("default_service", "template_gyl10gv", {
        email: email,
        code: recoveryCode
      });

      loginCard.innerHTML = `
        <div class="recovery-success">
          <div class="success-icon">✓</div>
          <h1 class="login-titulo">Revisa tu correo</h1>
          <p class="login-subtitulo mensaje-final">
            Si el correo que ingresaste coincide con una cuenta registrada, te enviamos un código de verificación para restablecer tu contraseña.
          </p>

          <form id="code-form" class="registro-form" style="margin-top: 20px;">
            <div class="form-group">
              <label for="verification-code">Ingresa el código</label>
              <div class="input-wrapper">
                <input 
                  type="text" 
                  id="verification-code" 
                  name="verification-code" 
                  placeholder="Ej. 123456"
                  maxlength="6"
                  required
                >
              </div>
            </div>

            <button type="submit" class="btn-crear-cuenta">Verificar código</button>
          </form>
        </div>
      `;

      const codeForm = document.getElementById("code-form");

      codeForm.addEventListener("submit", (ev) => {
        ev.preventDefault();

        const codeInput = document.getElementById("verification-code");
        const enteredCode = codeInput.value.trim();
        const savedCode = localStorage.getItem("recoveryCode");

        if (!enteredCode) {
          alert("Ingresa el código de verificación.");
          return;
        }

        if (enteredCode !== savedCode) {
          alert("El código es incorrecto.");
          return;
        }

        localStorage.setItem("codeVerified", "true");
        alert("Código verificado correctamente.");
        window.location.href = "updatePassword.html";
      });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      alert("No se pudo enviar el correo de recuperación.");
    }
  });
});