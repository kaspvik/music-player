export function loadPlaylists() {
    return JSON.parse(localStorage.getItem('sortify-playlists')) || [];
}

export function savePlaylists() {
    localStorage.setItem('sortify-playlists', JSON.stringify(window.sortifyApp.playlists));
}