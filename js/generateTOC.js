// js/generateTOC.js

function generateNavigationMenu() {
    // Espera que todo el DOM esté cargado
    document.addEventListener("DOMContentLoaded", () => {
        // Contenedor del menú
        const nav = document.createElement("div");
        nav.classList.add("page-toc");

        const ul = document.createElement("div");
        nav.appendChild(ul).classList.add("side-menu-list");

        // Selecciona todos los títulos h1, h2, h3
        const headings = document.querySelectorAll("h1, h2, h3");

        headings.forEach((heading, index) => {
            // Si no tiene id, se lo asignamos automáticamente
            if (!heading.id) {
                heading.id = "heading-" + index;
            }

            const li = document.createElement("div");
            li.classList.add(heading.tagName.toLowerCase()); // h1, h2, h3
            const a = document.createElement("a");
            a.href = "#" + heading.id;
            a.textContent = heading.textContent;

            li.appendChild(a);
            ul.appendChild(li);
        });

        // Inserta el menú al inicio del body (o donde quieras)
        document.body.prepend(nav);
    });
}

// Ejecuta la función
generateNavigationMenu();