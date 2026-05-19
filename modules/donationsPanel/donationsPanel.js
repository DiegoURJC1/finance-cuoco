/**
 * Inicializa los eventos interactivos del panel de donaciones
 */
function initDonationsPanel() {
    const areas = document.querySelectorAll('map[name="board-map"] area');

    areas.forEach(area => {
        const ingredientAttr = area.getAttribute('data-ingredient');
        if (!ingredientAttr) return;

        const ingredientId = `img-${ingredientAttr}`;
        const imgElement = document.getElementById(ingredientId);

        if (imgElement) {
            area.addEventListener('mouseenter', () => {
                imgElement.classList.add('rotated');
            });

            area.addEventListener('mouseleave', () => {
                imgElement.classList.remove('rotated');
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initDonationsPanel();
});