import { savePlaylists } from '/components/storage.js';

export function createPlaylist() {
    const playlistNameInput = document.getElementById('playlist-name');
    const currentPlaylist = document.getElementById('current-playlist');
    
    const playlistName = playlistNameInput.value.trim();
    if (!playlistName) {
        alert('Vänligen ange ett namn på spellistan');
        return;
    }

    if (currentPlaylist.children.length === 0) {
        alert('Spellistan är tom. Lägg till låtar först.');
        return;
    }

    const playlistSongs = Array.from(currentPlaylist.children).map(li => {
        const songId = parseInt(li.dataset.id);
        return songsData.find(song => song.id === songId);
    });

    const newPlaylist = {
        id: Date.now(),
        name: playlistName,
        songs: playlistSongs
    };

    window.sortifyApp.playlists.push(newPlaylist);
    savePlaylists();
    renderPlaylists();

    playlistNameInput.value = '';
    clearCurrentPlaylist();
}

export function renderPlaylists() {
    const playlistsList = document.getElementById('playlists');
    playlistsList.innerHTML = '';
    
    const { playlists } = window.sortifyApp;
    
    if (playlists.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'Inga sparade spellistor än';
        playlistsList.appendChild(emptyMessage);
        return;
    }

    playlists.forEach(playlist => {
        const li = document.createElement('li');
        li.innerHTML = `<div class="playlist-info">
                            <strong>${playlist.name}</strong> 
                            <span>(${playlist.songs.length} låtar)</span>
                        </div>
                        <div class="playlist-actions">
                            <button class="view-playlist" data-id="${playlist.id}">Visa</button>
                            <button class="delete-playlist" data-id="${playlist.id}">Ta bort</button>
                        </div>`;

        const viewBtn = li.querySelector('.view-playlist');
        viewBtn.addEventListener('click', () => viewPlaylist(playlist.id));

        const deleteBtn = li.querySelector('.delete-playlist');
        deleteBtn.addEventListener('click', () => deletePlaylist(playlist.id));

        playlistsList.appendChild(li);
    });
}

export function viewPlaylist(playlistId) {
    const selectedItems = document.getElementById('selected-items');
    const { playlists } = window.sortifyApp;
    
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) return;

    selectedItems.innerHTML = '';
    const header = document.createElement('h3');
    header.textContent = `Spellista: ${playlist.name}`;
    selectedItems.appendChild(header);

    playlist.songs.forEach(song => {
        const li = document.createElement('li');
        li.classList.add('song-item');
        li.dataset.id = song.id;
        li.innerHTML = `<strong>${song.title}</strong> - ${song.artist}
                        <span class="song-genre">${song.genre}</span>`;
        selectedItems.appendChild(li);
    });
}

export function deletePlaylist(playlistId) {
    if (confirm('Är du säker på att du vill ta bort denna spellista?')) {
        window.sortifyApp.playlists = window.sortifyApp.playlists.filter(p => p.id !== playlistId);
        savePlaylists();
        renderPlaylists();
    }
}

export function clearCurrentPlaylist() {
    const currentPlaylist = document.getElementById('current-playlist');
    currentPlaylist.innerHTML = '';
}