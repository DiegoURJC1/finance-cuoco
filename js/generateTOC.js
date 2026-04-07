function generateNavigationMenu() {
    // Espera que todo el DOM esté cargado
    document.addEventListener("DOMContentLoaded", () => {
        // Menu content
        const nav = document.createElement("div");
        nav.classList.add("page-toc");

        const ul = document.createElement("div");
        nav.appendChild(ul).classList.add("side-menu-list");

        // Select headers
        const headings = document.querySelectorAll("h1, h2, h3");

        headings.forEach((heading, index) => {
            // If no id, assigns automatically
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

        // Add menu to the top of the page
        document.body.prepend(nav);
    });
}

generateNavigationMenu();