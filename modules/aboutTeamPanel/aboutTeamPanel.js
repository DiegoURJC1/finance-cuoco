/**
 * Global enum definition for roles and tasks.
 * Stores centralized information about project contributions.
 * @enum {Object}
 */
const TASKS = Object.freeze({
    WEB_STYLE: {
        name: "Diseño de la Web",
        desc: "Diseño, estructura y estilo de la web.",
        link: "../index.html"
    },
    TABLE_OF_CONTENTS_MODULE: {
        name: "Módulo Table Of Contents",
        desc: "Desarrollo de módulo TOC que se genera automáticamente leyendo los contenidos de la página y los muestra en el panel lateral.",
        link: "../index.html"
    },
    GAME_LOGO: {
        name: "Logo del Juego",
        desc: "Diseño e ilustración del logo.",
        link: "../index.html#game-logo"
    },
    DRESSING_ICONS: {
        name: "Iconos de Aderezos",
        desc: "Diseño y creación de iconos vectoriales para los aderezos.",
        link: "../index.html#dressing-mechanic"
    },
    MUSIC_MODULE: {
        name: "Módulo Reproductor de Música",
        desc: "Desarrollo del reproductor de música con animación de CD, controles de reproducción y playlist.",
        link: "../index.html#music"
    },
    INFO_MODULE: {
        name: "Módulo Datos de Juego",
        desc: "Desarrollo de módulo con elementos auto generados sobre calificación por edades y plataformas.",
        link: "../index.html#game-info"
    },
    HOW_TO_PLAY_DIAGRAMS: {
        name: "Diagramas \"Cómo Jugar\"",
        desc: "Ilustración vectorial de los diagramas sobre cómo jugar y controlar el juego.",
        link: "../index.html#how-to-play"
    },
    DRESSING_MODULE: {
        name: "Módulo Aderezos",
        desc: "Desarrollo de módulo de aderezos generados mediante datos internos.",
        link: "../index.html#dressing-mechanic"
    },
    COMMENTS_MODULE: {
        name: "Módulo Comentarios",
        desc: "Desarrollo de módulo de comentarios de la web.",
        link: "./faq.html#comments"
    },
    ABOUT_PAGE: {
        name: "Página About",
        desc: "Creación de la página About y el módulo de Equipo de Desarrollo.",
        link: "./about.html"
    },
    FAQ_PAGE: {
        name: "Página FAQ",
        desc: "Creación de la página FAQ y el módulo de Preguntas Frecuentes.",
        link: "./faq.html"
    },
    SONG: {
        name: "Canción original",
        desc: "Creación del tema principal a usar en menús y canción por defecto de combate. Utiliza elementos de cocina comunes para obtener los sonidos de la mezcla.",
        link: "../index.html#music"
    },
    COVER_ART: {
        name: "Carátula del juego",
        desc: "Ilustrar la carátula y arte principal del juego.",
        link: "../index.html#game-cover-art"
    },
    UI_DESIGN: {
        name: "Diseño de Interfaz",
        desc: "Creación de la Interfaz de combate",
        link: "../index.html#image-gallery"
    },
    BACKGROUND_ART: {
        name: "Creación de fondo",
        desc: "Creación e ilustración de un fondo de escenario de juego.",
        link: "../index.html#image-gallery"
    },
    CHARACTER_ART: {
        name: "Creación de personaje",
        desc: "Creación e ilustración de un personaje luchador del juego.",
        link: "../index.html#image-gallery"
    },
    TRAILER: {
        name: "Trailer del Juego",
        desc: "Desarrollo completo: Maquetación, narración y efectos de sonido.",
        link: "../index.html#main-trailer"
    },
    FONT: {
        name: "Fuente personalizada",
        desc: "Diseño y creación de la fuente de texto FoodFont basada en comida.",
        link: "../index.html#custom-font"
    },
    DRESSING_SYSTEM: {
        name: "Mecánica de Aderezos",
        desc: "Diseño y desarrollo lógico del sistema de aderezos.",
        link: "../index.html#dressing-mechanic"
    },
    WEB_BACKGROUND: {
        name: "Fondo de la Web",
        desc: "Diseño e ilustración del fondo de la web.",
    },
    GOALS_PANEL: {
        name: "Panel de Objetivos",
        desc: "Redacción e ilustración del panel de Objetivos.",
        link: "../index.html#goals"
    },
    SOCIAL_MEDIA_ACCOUNT: {
        name: "Cuenta de Red Social",
        desc: "Crear la cuenta, montar el contenido y poblarla.",
        link: "./about.html#social-media"
    },
    CONTRIBUTIONS_MODULE: {
        name: "Módulo de Contribuciones",
        desc: "Diseño y creación del módulo de Contribuciones.",
        link: "../index.html#contributions"
    },
    MERCHANDISING_PANEL: {
        name: "Panel de merchandising",
        desc: "Creación del panel de merchandising y maquetación de las imágenes relacionadas.",
        link: "../index.html#merchandising"
    },
    MEET_THE_CAST: {
        name: "Conoce al plantel",
        desc: "Maquetado de la carta de menú de personajes jugables.",
        link: "../index.html#meet-the-cast"
    },
    TEXT_CONTENT: {
        name: "Desarrollo de contenidos",
        desc: "Redacción de los contenidos de la web.",
    },
    COHERENCE: {
        name: "Coherencia de contenidos",
        desc: "Revisión de los contenidos y su coherencia.",
    },
});

function initAboutTeamModule() {
    document.addEventListener("DOMContentLoaded", () => {
        const teamTarget = document.querySelector('.about-team-panel');
        if (!teamTarget) return;

        const grid = teamTarget.querySelector('.team-grid');
        if (!grid) return;

        const teamData = [
            {
                name: "HHJ",
                role: "Redacción / Narración",
                image: "../assets/imgs/devTeam/hugo.png",
                contributions: [
                    TASKS.TEXT_CONTENT,
                    TASKS.COHERENCE
                ]
            },
            {
                name: "JMA",
                role: "Multimedia / Diseño de Juego",
                image: "../assets/imgs/devTeam/chus.png",
                contributions: [
                    TASKS.TRAILER,
                    TASKS.FONT,
                    TASKS.DRESSING_SYSTEM
                ]
            },
            {
                name: "DGL",
                role: "Diseño Web / Programación / Iconos y Diagramas",
                image: "../assets/imgs/devTeam/diego.png",
                contributions: [
                    TASKS.WEB_STYLE,
                    TASKS.TABLE_OF_CONTENTS_MODULE,
                    TASKS.DRESSING_ICONS,
                    TASKS.GAME_LOGO,
                    TASKS.MUSIC_MODULE,
                    TASKS.INFO_MODULE,
                    TASKS.HOW_TO_PLAY_DIAGRAMS,
                    TASKS.DRESSING_MODULE,
                    TASKS.COMMENTS_MODULE,
                    TASKS.ABOUT_PAGE,
                    TASKS.FAQ_PAGE
                ]
            },
            {
                name: "FGG",
                role: "-",
                image: "../assets/imgs/devTeam/fernando.png",
                contributions: []
            },
            {
                name: "CAG",
                role: "Arte / Sonido",
                image: "../assets/imgs/devTeam/carla.png",
                contributions: [
                    TASKS.COVER_ART,
                    TASKS.SONG,
                    TASKS.UI_DESIGN,
                    TASKS.CHARACTER_ART,
                    TASKS.BACKGROUND_ART
                ]
            },
            {
                name: "PJL",
                role: "Multimedia / Desarrollo Web",
                image: "../assets/imgs/devTeam/paula.png",
                contributions: [
                    TASKS.WEB_BACKGROUND,
                    TASKS.GOALS_PANEL,
                    TASKS.SOCIAL_MEDIA_ACCOUNT,
                    TASKS.CONTRIBUTIONS_MODULE,
                    TASKS.MERCHANDISING_PANEL,
                    TASKS.MEET_THE_CAST
                ]
            },
        ];

        teamData.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('team-card');

            const header = document.createElement('div');
            header.classList.add('team-card-header');

            const imgNode = document.createElement('img');
            imgNode.classList.add('team-member-avatar');
            imgNode.src = member.image || 'https://api.dicebear.com/7.x/bottts/svg?seed=default';
            imgNode.alt = `Avatar de ${member.name}`;
            header.appendChild(imgNode);

            const metaContainer = document.createElement('div');
            metaContainer.classList.add('team-member-meta');

            const nameNode = document.createElement('h2');
            nameNode.classList.add('team-member-name');
            nameNode.textContent = member.name;

            const roleNode = document.createElement('span');
            roleNode.classList.add('team-member-role');
            roleNode.textContent = member.role;

            metaContainer.appendChild(nameNode);
            metaContainer.appendChild(roleNode);
            header.appendChild(metaContainer);

            card.appendChild(header);

            const taskList = document.createElement('div');
            taskList.classList.add('team-task-list');

            member.contributions.forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.classList.add('team-task-item');

                if (task.link) {
                    taskItem.innerHTML = `
                        <div class="task-title">
                            <a href="${task.link}" class="task-link" target="${task.link.startsWith('http') ? '_blank' : '_self'}">
                                ${task.name} <span class="task-link-icon">↗</span>
                            </a>
                        </div>
                        <p class="task-desc">${task.desc}</p>
                    `;
                } else {
                    taskItem.innerHTML = `
                        <div class="task-title text-accent">${task.name}</div>
                        <p class="task-desc">${task.desc}</p>
                    `;
                }
                taskList.appendChild(taskItem);
            });

            card.appendChild(taskList);
            grid.appendChild(card);
        });
    });
}

initAboutTeamModule();