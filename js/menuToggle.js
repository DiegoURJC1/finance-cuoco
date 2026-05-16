document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("menu-toggle");

    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Evita interferencias de propagación

        // Buscamos el panel en el momento del click, asegurando que ya exista en el DOM
        const toc = document.querySelector(".page-toc");
        const icon = toggleBtn.querySelector(".icon");

        if (toc) {
            toc.classList.toggle("open");
            toggleBtn.classList.toggle("open");

            if (icon) {
                icon.textContent = toggleBtn.classList.contains("open") ? "✕" : "☰";
            }
        }
    });

    // Opcional y muy recomendado: Cerrar el menú automáticamente si se hace click fuera de él
    document.addEventListener("click", (e) => {
        const toc = document.querySelector(".page-toc");
        if (toc && toc.classList.contains("open") && !toc.contains(e.target)) {
            toc.classList.remove("open");
            toggleBtn.classList.remove("open");
            const icon = toggleBtn.querySelector(".icon");
            if (icon) icon.textContent = "☰";
        }
    });
});