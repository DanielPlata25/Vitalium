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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  // El email del usuario ya debió quedar guardado desde el paso anterior
  const recoveryEmail = localStorage.getItem("recoveryEmail");

  if (!recoveryEmail) {
    alert("No se encontró el usuario para actualizar la contraseña.");
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

  // Simulación frontend: actualizar contraseña en localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userIndex = users.findIndex((user) => user.email === recoveryEmail);

  if (userIndex === -1) {
    alert("No se encontró una cuenta asociada a ese correo.");
    return;
  }

  users[userIndex].password = password;
  localStorage.setItem("users", JSON.stringify(users));

  // Limpiar datos temporales del proceso de recuperación
  localStorage.removeItem("recoveryEmail");
  localStorage.removeItem("recoveryCode");
  localStorage.removeItem("codeVerified");

  alert("Contraseña actualizada correctamente.");
  window.location.href = "./login.html";
});