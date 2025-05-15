import { renderAllSongs, renderArtists, renderGenres, renderMusicList } from './musicList.js';
import { clearCurrentPlaylist, createPlaylist } from './playlist.js';

export function setupEventListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    const createPlaylistBtn = document.getElementById('create-playlist');
    const clearPlaylistBtn = document.getElementById('clear-playlist');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            window.sortifyApp.currentFilter = btn.dataset.filter;
            renderMusicList();
        });
    });

    searchInput.addEventListener('input', handleSearch);
    
    createPlaylistBtn.addEventListener('click', createPlaylist);

    clearPlaylistBtn.addEventListener('click', clearCurrentPlaylist);
}

function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const musicList = document.getElementById('music-list');
    
    const searchTerm = searchInput.value.trim().toLowerCase();
    musicList.innerHTML = '';

    const { currentFilter } = window.sortifyApp;
    
    if (currentFilter === 'all') {
        renderAllSongs(searchTerm);
    } else if (currentFilter === 'genre') {
        renderGenres(searchTerm);
    } else if (currentFilter === 'artist') {
        renderArtists(searchTerm);
    }
}