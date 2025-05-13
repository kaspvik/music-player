document.addEventListener('DOMContentLoaded', () => {
    const musicList = document.getElementById('music-list');
    const selectedItems = document.getElementById('selected-items');
    const currentPlaylist = document.getElementById('current-playlist');
    const playlistsList = document.getElementById('playlists');
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const createPlaylistBtn = document.getElementById('create-playlist');
    const playlistNameInput = document.getElementById('playlist-name');
    const clearPlaylistBtn = document.getElementById('clear-playlist');

    let currentFilter = 'all';
    let currentCategory = null;
    let playlists = JSON.parse(localStorage.getItem('sortify-playlists')) || [];

    function init() {
        renderMusicList();
        renderPlaylists();
        setupEventListeners();
    }

    function renderMusicList() {
    musicList.innerHTML = '';
    if (currentFilter === 'all') {
        renderAllSongs();
    }
}

function renderAllSongs(filter = '') {
    const filteredSongs = songsData.filter(song => 
        song.title.toLowerCase().includes(filter.toLowerCase()) ||
        song.artist.toLowerCase().includes(filter.toLowerCase()) ||
        song.genre.toLowerCase().includes(filter.toLowerCase())
    );

    filteredSongs.forEach(song => {
        const li = document.createElement('li');
        li.classList.add('song-item');
        li.dataset.id = song.id;
        li.innerHTML = `<strong>${song.title}</strong> - ${song.artist}
            <span class="song-genre">${song.genre}</span>`;
        li.addEventListener('click', () => addToCurrentPlaylist(song));
        musicList.appendChild(li);
    });
}

    init();
});

