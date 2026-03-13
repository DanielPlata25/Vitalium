document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-contacto');

    if (!form) return;

    const btn = form.querySelector('.btn-enviar');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const textoOriginal = btn.textContent;
        btn.textContent = 'Enviando...';
        btn.disabled = true;

     const serviceID = 'default_service';
   const templateID = 'template_vg8p05h';

        emailjs.sendForm(serviceID, templateID, form)
            .then(() => {
                btn.textContent = textoOriginal;
                btn.disabled = false;

                alert('Mensaje enviado correctamente. También te mandamos una copia a tu correo.');
                form.reset();
            })
            .catch((err) => {
                btn.textContent = textoOriginal;
                btn.disabled = false;

                console.error('Error EmailJS:', err);
                alert('No se pudo enviar el mensaje');
            });
    });
});