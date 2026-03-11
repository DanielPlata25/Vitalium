// js/modal.js
document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("surveyOverlay");
    const btnClose = document.getElementById("btnClose");

    const shownOverlay = sessionStorage.getItem("shownOverlay");
    if (!shownOverlay) {
        setTimeout(function () {
            overlay.classList.add("show");
            document.body.classList.add("modal-abierto");
            sessionStorage.setItem("shownOverlay", "true");
        }, 1000);
    }

    btnClose.addEventListener("click", function () {
        overlay.classList.remove("show");
        document.body.classList.remove("modal-abierto");
    });

    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            overlay.classList.remove("show");
            document.body.classList.remove("modal-abierto");
        }
    });
});
