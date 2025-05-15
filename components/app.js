import { setupEventListeners } from '/components/eventHandlers.js';
import { renderMusicList } from '/components/musicList.js';
import { renderPlaylists } from '/components/playlist.js';
import { loadPlaylists } from '/components/storage.js';

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