function renderAgeRestrictions() {
    // Select container
    const ageContainer = document.querySelector('.age-classifications');
    ageContainer.innerHTML = '';

    const basePath = "assets/imgs/ageRestriction/"

    const ageRatings = [
        {img: basePath + "PEGI_12.svg", name: "PEGI"},
        {img: basePath + "ESRB_Everyone_10+.svg", name: "ESRB"},
        {img: basePath + "CERO_B.svg", name: "CERO"},
        {img: basePath + "USK_12.svg", name: "USK"},
        {img: basePath + "Classind_A12.svg", name: "ClassInd"},
        {img: basePath + "GRAC_12_(12세이용가).svg", name: "GRAC"},
        {img: basePath + "Australian_Classification_Mature_(M).svg", name: "ACB"},
    ];


    // Genera los bloques dinámicamente
    ageRatings.forEach(rating => {
        const block = document.createElement("div");
        block.classList.add("age-classification");
        block.innerHTML = `
        <img src="${rating.img}" alt="${rating.name}">
        <div class="age-restriction-name">${rating.name}</div>
    `;
        ageContainer.appendChild(block);
    });
}

function renderPlatforms() {
    const platformContainer = document.querySelector('.platforms');
    platformContainer.innerHTML = '';

    const basePath = "assets/imgs/platform/"

    const platforms = [
        {img: basePath + "PlayStation_5_logo_and_wordmark.svg", name: "PlayStation 5"},
        {img: basePath + "Nintendo_Switch_2_logo.svg", name: "Nintendo Switch 2"},
        {img: basePath + "Steam_icon_logo.svg", name: "Steam"},
    ];
    platforms.forEach(rating => {
        const block = document.createElement("div");
        block.classList.add("platform");
        block.innerHTML = `
        <img src="${rating.img}" alt="${rating.name + "logo"}">
        <div class="platform-name">${rating.name}</div>
    `;
        platformContainer.appendChild(block);
    });
}

renderAgeRestrictions();
renderPlatforms();