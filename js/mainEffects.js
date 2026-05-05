document.addEventListener("DOMContentLoaded", () => {
    // 1. Controlador de Video
    const video = document.getElementById('main-trailer');
    const playBtn = document.getElementById('v-play');
    const muteBtn = document.getElementById('v-mute');
    const bar = document.querySelector('.progress-bar-fill');

    if(video) {
        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playBtn.textContent = 'PAUSE';
            } else {
                video.pause();
                playBtn.textContent = 'PLAY';
            }
        });

        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            muteBtn.textContent = video.muted ? 'UNMUTE' : 'MUTE';
        });

        video.addEventListener('timeupdate', () => {
            const pct = (video.currentTime / video.duration) * 100;
            bar.style.width = `${pct}%`;
        });
    }

    // 2. Observer para animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('div, section').forEach(el => observer.observe(el));
});