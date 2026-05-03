function initMusicPlayer() {
    const playerAnchor = document.querySelector('.music-player-panel');
    if (!playerAnchor) return;

    const MUSIC_PATH = 'assets/music/';
    const songs = JSON.parse(playerAnchor.getAttribute('data-songs') || "[]");

    const audio = document.getElementById('main-audio');
    const playlistContainer = document.getElementById('playlist');
    const playBtn = document.getElementById('play-btn');
    const progressBar = document.getElementById('progress-bar');

    // UI Elements
    const uiTitle = document.getElementById('player-title');
    const uiArtist = document.getElementById('player-artist');
    const uiAlbum = document.getElementById('player-album');
    const uiCover = document.getElementById('player-cover');
    const uiCurrentTime = document.getElementById('current-time');
    const uiDuration = document.getElementById('duration-time');

    if (!audio || !playBtn) return;

    let currentIndex = 0;
    let isPlaying = false;

    // Utilidad para formatear segundos a 00:00
    const formatTime = (s) => {
        if (isNaN(s)) return "00:00";
        return new Date(s * 1000).toISOString().substr(14, 5);
    };

    function loadSong(index) {
        const song = songs[index];
        audio.src = MUSIC_PATH + song.file;

        uiTitle.textContent = song.title;
        uiArtist.textContent = song.artist;

        if (uiAlbum) {
            uiAlbum.textContent = song.album || "Single";
        }

        if (uiCover && song.cover) uiCover.src = song.cover;

        document.querySelectorAll('.playlist-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        // Si ya estaba sonando, reproducir la nueva automáticamente
        if (isPlaying) {
            audio.play().catch(e => console.warn("Error al reproducir:", e));
        }
    }

    function updatePlayButtonUI() {
        const icon = document.getElementById('play-icon');
        const visuals = document.querySelectorAll('.cd-svg-container, .album-cover-wrapper');

        if (isPlaying) {
            icon.innerHTML = '<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>';
            visuals.forEach(v => v.classList.add('is-playing'));
        } else {
            icon.innerHTML = '<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>';
            visuals.forEach(v => v.classList.remove('is-playing'));
        }
    }

    // Dibujar Playlist
    playlistContainer.innerHTML = ''; // Limpiar por si acaso
    songs.forEach((song, idx) => {
        const item = document.createElement('div');
        item.className = `playlist-item ${idx === 0 ? 'active' : ''}`;
        item.innerHTML = `<span class="song-number">${idx + 1}</span> <span>${song.title}</span>`;
        item.onclick = () => {
            currentIndex = idx;
            loadSong(currentIndex);
            if (!isPlaying) {
                isPlaying = true;
                updatePlayButtonUI();
            }
            audio.play();
        };
        playlistContainer.appendChild(item);
    });

    // --- EVENTOS DE CONTROL ---
    playBtn.onclick = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(e => console.warn("Autoplay bloqueado"));
        }
        isPlaying = !isPlaying;
        updatePlayButtonUI();
    };

    document.getElementById('next-btn').onclick = () => {
        currentIndex = (currentIndex + 1) % songs.length;
        loadSong(currentIndex);
    };

    document.getElementById('prev-btn').onclick = () => {
        currentIndex = (currentIndex - 1 + songs.length) % songs.length;
        loadSong(currentIndex);
    };

    // Actualización de progreso
    audio.ontimeupdate = () => {
        if (audio.duration) {
            progressBar.value = (audio.currentTime / audio.duration) * 100;
            uiCurrentTime.textContent = formatTime(audio.currentTime);
        }
    };

    audio.onloadedmetadata = () => {
        uiDuration.textContent = formatTime(audio.duration);
    };

    progressBar.oninput = () => {
        const time = (progressBar.value / 100) * audio.duration;
        audio.currentTime = time;
    };

    // Auto-next al terminar
    audio.onended = () => document.getElementById('next-btn').click();

    // Inicialización
    loadSong(0);
}

// LANZAMIENTO
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initMusicPlayer, 100);
});