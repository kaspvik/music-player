import { setupEventListeners } from './eventHandlers.js';
import { renderMusicList } from './musicList.js';
import { renderPlaylists } from './playlist.js';
import { loadPlaylists } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    window.sortifyApp = {
        currentFilter: 'all',
        currentCategory: null,
        playlists: loadPlaylists()
    };
    
    function init() {
        renderMusicList();
        renderPlaylists();
        setupEventListeners();
    }
    
    init();
});