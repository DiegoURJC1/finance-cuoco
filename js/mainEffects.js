document.addEventListener("DOMContentLoaded", () => {
    // 1. Controlador de Video
    const video = document.getElementById('main-trailer');
    const playBtn = document.getElementById('v-play');
    const muteBtn = document.getElementById('v-mute');
    const bar = document.querySelector('.progress-bar-fill');

    if (video) {
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    playBtn.textContent = 'PAUSE';
                } else {
                    video.pause();
                    playBtn.textContent = 'PLAY';
                }
            });
        }

        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                video.muted = !video.muted;
                muteBtn.textContent = video.muted ? 'UNMUTE' : 'MUTE';
            });
        }

        if (bar) {
            video.addEventListener('timeupdate', () => {
                const pct = (video.currentTime / video.duration) * 100;
                bar.style.width = `${pct}%`;
            });
        }
    }

    // 2. Observer para animaciones al hacer scroll (SÓLIDO Y SELECTIVO)
    const observerOptions = {
        root: null, // Usa el viewport del navegador
        rootMargin: '0px',
        threshold: 0.15 // Un 15% visible para activar la animación con más margen de seguridad
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase que activa la animación
                entry.target.classList.add('is-revealed');

                // OPTIMIZACIÓN CLAVE: Una vez animado, dejamos de observarlo.
                // Así ahorramos rendimiento y evitamos que vuelva a interferir con el CSS.
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // En lugar de escuchar TODOS los divs del universo, solo escuchamos a los que tengan la clase .scroll-animate
    const animatableElements = document.querySelectorAll('.scroll-animate');
    animatableElements.forEach(el => scrollObserver.observe(el));
});