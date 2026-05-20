function initDressingPanel() {
    const gridContainer = document.querySelector('.dressing-icons-grid');
    const nameTarget = document.getElementById('dressing-name');
    const descTarget = document.getElementById('dressing-description');
    const detailsPanel = document.querySelector('.dressing-details');

    // End if DOM not loaded
    if (!gridContainer || !nameTarget || !descTarget) return;

    const dressings = [
        {
            name: "Glaseado",
            icon: "./assets/icons/dressings/Glaseado.svg",
            description: "Absorbe 1 hit completo sin stun ni daño. Se consume a los 3 segundos o tras absorber un hit.<br><br><strong>Ejemplos temáticos:</strong> Caramelo, miel, azúcar caramelizada."
        },
        {
            name: "Picante",
            icon: "./assets/icons/dressings/Picante.svg",
            description: "Aumenta el daño en ataques y reduce la resistencia al daño recibido. Se consume a los 2 segundos.<br><br><strong>Ejemplos temáticos:</strong> Chile, sriracha, tabasco."
        },
        {
            name: "Salsa Especiada",
            icon: "./assets/icons/dressings/Salsa Especiada.svg",
            description: "Aumenta el rango en todos los ataques del personaje. Se representa con visuales especiales que no deforman las animaciones del personaje. Se consume a los 2 segundos.<br><br><strong>Ejemplos temáticos:</strong> Romero, albahaca, tomillo."
        },
        {
            name: "Fermentado",
            icon: "./assets/icons/dressings/Fermentado.svg",
            description: "Proporciona regeneración lenta de vida durante 3 segundos.<br><br><strong>Ejemplos temáticos:</strong> Kimchi, masa madre, miso."
        },
        {
            name: "Pringoso",
            icon: "./assets/icons/dressings/Pringoso.svg",
            description: "Reduce la velocidad de movimiento durante 1,5 segundos.<br><br><strong>Ejemplos temáticos:</strong> Caramelo quemado, jarabe."
        },
        {
            name: "Mareado",
            icon: "./assets/icons/dressings/Mareado.svg",
            description: "Inputs invertidos durante 2 segundos. <br><br><strong>Ejemplos temáticos:</strong> Alcohol, vinagre fuerte."
        },
        {
            name: "Saciado",
            icon: "./assets/icons/dressings/Saciado.svg",
            description: "Sin posibilidad de dash ni salto 1,5 segundos.<br><br><strong>Ejemplos temáticos:</strong> Sobrealimentación, salsa densa."
        },
        {
            name: "Quemado",
            icon: "./assets/icons/dressings/Quemado.svg",
            description: "Daño continuo leve (DoT) durante 5 segundos (mínimo 1, no puede hacer kill).<br><br><strong>Ejemplos temáticos:</strong> Picante extremo, curry, brasa."
        }
    ];

    function setMaxPanelHeight() {

        let maxHeight = 0;

        const temp = document.createElement('div');

        temp.style.position = 'absolute';
        temp.style.visibility = 'hidden';
        temp.style.pointerEvents = 'none';
        temp.style.width = `${detailsPanel.clientWidth - 50}px`;

        temp.className = 'dressing-details-content';

        document.body.appendChild(temp);

        dressings.forEach(dressing => {

            temp.innerHTML = `
            <p class="dressing-name">${dressing.name}</p>
            <p>${dressing.description}</p>
        `;

            maxHeight = Math.max(maxHeight, temp.offsetHeight);
        });

        document.body.removeChild(temp);

        detailsPanel.style.minHeight = `${maxHeight + 20}px`;
    }

    function selectDressing(index, element) {

        document.querySelectorAll('.dressing-card')
            .forEach(card => card.classList.remove('active'));

        element.classList.add('active');

        const content = document.getElementById('dressing-content');

        if (content.classList.contains('animating')) return;

        content.classList.add('animating');

        content.classList.remove('fade-in');
        content.classList.add('fade-out');

        setTimeout(() => {

            nameTarget.textContent = dressings[index].name;
            descTarget.innerHTML = dressings[index].description;

            content.classList.remove('fade-out');

            void content.offsetWidth;

            content.classList.add('fade-in');

            setTimeout(() => {
                content.classList.remove('animating');
            }, 300);

        }, 250);
    }

    gridContainer.innerHTML = '';
    setMaxPanelHeight();

    dressings.forEach((dressing, idx) => {
        const card = document.createElement('div');
        card.className = `dressing-card ${idx === 0 ? 'active' : ''}`;

        card.innerHTML = `<img class="dressing-icon" src="${dressing.icon}" alt="${dressing.name}">`;

        card.onclick = () => selectDressing(idx, card);
        gridContainer.appendChild(card);

        if (idx === 0) {
            nameTarget.textContent = dressing.name;
            descTarget.innerHTML = dressing.description;
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initDressingPanel, 120);
});