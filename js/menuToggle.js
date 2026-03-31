document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("menu-toggle");
    const toc = document.querySelector(".page-toc");

    toggleBtn.addEventListener("click", () => {
        toc.classList.toggle("open");
    });
});