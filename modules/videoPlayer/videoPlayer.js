document.addEventListener("DOMContentLoaded", () => {
    const containerRef = document.querySelector('.video-container-ref');
    const template = document.getElementById('video-player-panel');

    if (containerRef && template) {
        const clone = template.content.cloneNode(true);
        containerRef.appendChild(clone);

        const wrapper = containerRef.querySelector('.video-wrapper');
        const video = containerRef.querySelector('#main-trailer');
        const playBtn = containerRef.querySelector('#v-play');
        const muteBtn = containerRef.querySelector('#v-mute');
        const progressBar = containerRef.querySelector('#v-progress');
        const volumeSlider = containerRef.querySelector('#v-volume');
        const timeDisplay = containerRef.querySelector('#v-time');
        const fullscreenBtn = containerRef.querySelector('#v-fullscreen');

        function togglePlay() {
            if (video.paused) {
                video.play();
                playBtn.innerText = "PAUSE";
                playBtn.setAttribute("aria-pressed", "true");
            } else {
                video.pause();
                playBtn.innerText = "PLAY";
                playBtn.setAttribute("aria-pressed", "false");
            }
        }
        playBtn.addEventListener('click', (evento) => {
            evento.stopPropagation();
            togglePlay();
        });
        video.addEventListener('click', togglePlay);

        video.addEventListener('timeupdate', () => {
            if (!progressBar.matches(':focus')) {
                const percentage = (video.currentTime / video.duration) * 100;
                progressBar.value = isNaN(percentage) ? 0 : percentage;
                progressBar.setAttribute("aria-valuenow", Math.round(progressBar.value));
            }
            updateTimeText();
        });

        progressBar.addEventListener('input', () => {
            const time = (progressBar.value / 100) * video.duration;
            video.currentTime = time;
        });

        function updateTimeText() {
            const current = formatTime(video.currentTime);
            const total = formatTime(video.duration || 0);
            timeDisplay.innerText = `${current} / ${total}`;
        }

        function formatTime(seconds) {
            const min = Math.floor(seconds / 60).toString().padStart(2, '0');
            const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
            return `${min}:${sec}`;
        }

        video.addEventListener('loadedmetadata', updateTimeText);

        volumeSlider.addEventListener('input', () => {
            video.volume = volumeSlider.value;
            if (video.volume === 0) {
                muteBtn.innerText = "UNMUTE";
                muteBtn.setAttribute("aria-pressed", "true");
            } else {
                muteBtn.innerText = "MUTE";
                muteBtn.setAttribute("aria-pressed", "false");
                video.muted = false;
            }
        });

        muteBtn.addEventListener('click', () => {
            if (video.muted || video.volume === 0) {
                video.muted = false;
                if(video.volume === 0) video.volume = 0.5;
                volumeSlider.value = video.volume;
                muteBtn.innerText = "MUTE";
                muteBtn.setAttribute("aria-pressed", "false");
            } else {
                video.muted = true;
                volumeSlider.value = 0;
                muteBtn.innerText = "UNMUTE";
                muteBtn.setAttribute("aria-pressed", "true");
            }
        });

        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                if (wrapper.requestFullscreen) {
                    wrapper.requestFullscreen();
                } else if (wrapper.webkitRequestFullscreen) {
                    wrapper.webkitRequestFullscreen();
                }
            } else {
                document.exitFullscreen();
            }
        });
    }
});