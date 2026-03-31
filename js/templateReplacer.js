/**
 * This funcion places all templates with a certain ``id``
 * into ``div``s with the same ``class`` name
 */
function replateTempaltes() {
    document.querySelectorAll('div').forEach(div => {
        div.classList.forEach(cls => {
            const template = document.getElementById(cls);
            if (template) {
                div.appendChild(template.content.cloneNode(true));
            }
        });
    });
}

replateTempaltes();