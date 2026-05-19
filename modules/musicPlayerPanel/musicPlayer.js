/**
 * Generates an interactive audio playlist player dashboard.
 * Manages states for tracking bars, metadata, cd animation toggles
 * and hardware volume manipulation.
 */
function initMusicPlayer() {
    // Select target Music Player anchor
    const playerAnchor = document.querySelector('.music-player-panel');
    if (!playerAnchor) return;

    const MUSIC_PATH = 'assets/music/';
    const songs = JSON.parse(playerAnchor.getAttribute('data-songs') || "[]");

    // Fetch core HTML media elements
    const audio = document.getElementById('main-audio');
    const playlistContainer = document.getElementById('playlist');
    const playBtn = document.getElementById('play-btn');
    const progressBar = document.getElementById('progress-bar');

    // Fetch metadata text nodes
    const uiTitle = document.getElementById('player-title');
    const uiArtist = document.getElementById('player-artist');
    const uiAlbum = document.getElementById('player-album');
    const uiCover = document.getElementById('player-cover');
    const uiCurrentTime = document.getElementById('current-time');
    const uiDuration = document.getElementById('duration-time');

    // Fetch dynamic volume controls
    const volumeSlider = document.getElementById('volume-slider');
    const volumeIcon = document.getElementById('volume-icon');

    if (!audio || !playBtn) return;

    let currentIndex = 0;
    let isPlaying = false;
    let previousVolume = 1.0; // Dynamic backup copy for mute toggling

    /**
     * Converts a duration float in seconds into a clean "MM:SS" time string
     * @param {number} s - Total raw seconds
     * @returns {string} Formatted track timestamp
     */
    const formatTime = (s) => {
        if (isNaN(s)) return "00:00";
        return new Date(s * 1000).toISOString().substr(14, 5);
    };

    /**
     * Updates and loads source media paths matching the indexed database row
     * @param {number} index - Targeted song element position mapping
     */
    function loadSong(index) {
        const song = songs[index];
        audio.src = MUSIC_PATH + song.file;

        uiTitle.textContent = song.title;
        uiArtist.textContent = song.artist;

        if (uiAlbum) {
            uiAlbum.textContent = song.album || "Single";
        }

        if (uiCover && song.cover) uiCover.src = song.cover;

        // Toggle active visual highlight state on list items
        document.querySelectorAll('.playlist-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        // Trigger safe track streaming playback if master state is true
        if (isPlaying) {
            audio.play().catch(e => console.warn("Error al reproducir:", e));
        }
    }

    /**
     * Toggles play/pause visual vectors inside buttons
     * and triggers the sliding CD panel CSS animation states
     */
    function updatePlayButtonUI() {
        const icon = document.getElementById('play-icon');
        const visuals = playerAnchor.querySelectorAll('.cd-svg-container, .album-cover-wrapper');

        if (isPlaying) {
            if (icon) icon.innerHTML = '<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>';
            visuals.forEach(v => {
                v.classList.remove('is-playing');
                void v.offsetWidth; // Force synchronous layout reflow trigger
                v.classList.add('is-playing');
            });
        } else {
            if (icon) icon.innerHTML = '<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>';
            visuals.forEach(v => v.classList.remove('is-playing'));
        }
    }

    // Clear template mock list nodes and compile clean dynamic lists
    playlistContainer.innerHTML = '';
    songs.forEach((song, idx) => {
        const item = document.createElement('div');
        item.className = `playlist-item ${idx === 0 ? 'active' : ''}`;
        item.innerHTML = `<span class="song-number">${idx + 1}</span> <span>${song.title}</span>`;

        item.onclick = () => {
            currentIndex = idx;
            isPlaying = true; // Fix: Guarantee continuous rotation state
            loadSong(currentIndex);
            updatePlayButtonUI();
            audio.play().catch(e => console.warn("Playback interrupted"));
        };
        playlistContainer.appendChild(item);
    });

    // Master Play/Pause click toggle mapping
    playBtn.onclick = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(e => console.warn("Autoplay bloqueado por el navegador"));
        }
        isPlaying = !isPlaying;
        updatePlayButtonUI();
    };

    // Skip forward to the next index slot
    document.getElementById('next-btn').onclick = () => {
        currentIndex = (currentIndex + 1) % songs.length;
        loadSong(currentIndex);
    };

    // Return backwards to the previous index slot
    document.getElementById('prev-btn').onclick = () => {
        currentIndex = (currentIndex - 1 + songs.length) % songs.length;
        loadSong(currentIndex);
    };

    // Tracking bar runtime polling feedback loops
    audio.ontimeupdate = () => {
        if (audio.duration) {
            progressBar.value = (audio.currentTime / audio.duration) * 100;
            uiCurrentTime.textContent = formatTime(audio.currentTime);
        }
    };

    // Wait for file stream boundaries to calculate track duration metrics
    audio.onloadedmetadata = () => {
        uiDuration.textContent = formatTime(audio.duration);
    };

    // Manipulate current audio cursor timestamp based on user drag input
    progressBar.oninput = () => {
        if (audio.duration) {
            const time = (progressBar.value / 100) * audio.duration;
            audio.currentTime = time;
        }
    };

    // Handle audio track routing when hardware limits hit volume sliders
    if (volumeSlider) {
        volumeSlider.oninput = () => {
            audio.volume = volumeSlider.value;
            // Adaptive icon swapping based on slider context values
            if (audio.volume === 0) {
                volumeIcon.textContent = '🔈';
            } else if (audio.volume < 0.5) {
                volumeIcon.textContent = '🔉';
            } else {
                volumeIcon.textContent = '🔊';
            }
        };
    }

    // Toggle mute switch states instantly when clicking volume symbols
    if (volumeIcon && volumeSlider) {
        volumeIcon.onclick = () => {
            if (audio.volume > 0) {
                previousVolume = audio.volume;
                audio.volume = 0;
                volumeSlider.value = 0;
                volumeIcon.textContent = '🔈';
            } else {
                audio.volume = previousVolume;
                volumeSlider.value = previousVolume;
                volumeIcon.textContent = previousVolume < 0.5 ? '🔉' : '🔊';
            }
        };
    }

    // Cascade track cycling automatically when songs terminate natively
    audio.onended = () => document.getElementById('next-btn').click();

    // Initial default seed setup execution
    loadSong(0);
}

// Ensure execution hooks attach cleanly after templates build the DOM tree nodes
document.addEventListener("DOMContentLoaded", () => {
    initMusicPlayer();
});