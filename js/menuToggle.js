document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("menu-toggle");
    const toc = document.querySelector(".page-toc");
    const icon = toggleBtn.querySelector(".icon");

    toggleBtn.addEventListener("click", () => {
        toc.classList.toggle("open");
        toggleBtn.classList.toggle("open");
        icon.textContent = toggleBtn.classList.contains("open") ? "✕" : "☰";
    });
});