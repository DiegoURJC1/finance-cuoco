/**
 * This function places all templates with a certain ``id``
 * into ``div``s with the same ``class`` name
 */
function replateTemplates() {
    document.querySelectorAll('div').forEach(div => {
        div.classList.forEach(cls => {
            const template = document.getElementById(cls);
            if (template && template.content) {
                div.appendChild(template.content.cloneNode(true));
            }
        });
    });
}

replateTemplates();