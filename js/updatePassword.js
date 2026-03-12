const form = document.getElementById("form-registro");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("password-confirm");
const toggleButtons = document.querySelectorAll(".toggle-password");

// Mostrar / ocultar contraseña
toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.parentElement.querySelector("input");
    if (!input) return;

    input.type = input.type === "password" ? "text" : "password";
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  const recoveryEmail = localStorage.getItem("recoveryEmail");
  const codeVerified = localStorage.getItem("codeVerified");

  if (!recoveryEmail) {
    alert("No se encontró el usuario para actualizar la contraseña.");
    return;
  }

  if (codeVerified !== "true") {
    alert("Primero debes verificar el código.");
    return;
  }

  if (password.length < 8) {
    alert("La contraseña debe tener al menos 8 caracteres.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/users/update-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: recoveryEmail,
        newPassword: password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || data.message || "No se pudo actualizar la contraseña.");
      return;
    }

    localStorage.removeItem("recoveryEmail");
    localStorage.removeItem("recoveryCode");
    localStorage.removeItem("codeVerified");

    alert(data.message || "Contraseña actualizada correctamente.");
    window.location.href = "./login.html";
  } catch (error) {
    console.error("Error al actualizar contraseña:", error);
    alert("Ocurrió un error al conectar con el servidor.");
  }
});