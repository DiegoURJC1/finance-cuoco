document.addEventListener("DOMContentLoaded", () => {
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

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                // Stop observing after animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Only affects 'scroll-animate' class
    const animatableElements = document.querySelectorAll('.scroll-animate');
    animatableElements.forEach(el => scrollObserver.observe(el));
});