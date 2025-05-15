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
    } else if (currentFilter === 'genre') {
        renderGenres();
    } else if (currentFilter === 'artist') {
        renderArtists();
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

function renderGenres(filter = '') {
    const genres = [...new Set(songsData.map(song => song.genre))];
    const filteredGenres = genres.filter(genre => genre.toLowerCase().includes(filter.toLowerCase()));
    
    const genreHeader = document.createElement('h3');
    genreHeader.textContent = 'Genrer';
    musicList.appendChild(genreHeader);
    
    filteredGenres.forEach(genre => {
        const li = document.createElement('li');
        li.classList.add('genre-item');
        li.textContent = genre;
        li.addEventListener('click', () => {
            renderSelectedItems('genre', genre);
        });
        musicList.appendChild(li);
    });
}

function renderArtists(filter = '') {
    const artists = [...new Set(songsData.map(song => song.artist))];
    const filteredArtists = artists.filter(artist => artist.toLowerCase().includes(filter.toLowerCase()));
    
    const artistHeader = document.createElement('h3');
    artistHeader.textContent = 'Artister';
    musicList.appendChild(artistHeader);
    
    filteredArtists.forEach(artist => {
        const li = document.createElement('li');
        li.classList.add('artist-item');
        li.textContent = artist;
        li.addEventListener('click', () => {
            renderSelectedItems('artist', artist);
        });
        musicList.appendChild(li);
    });
}

function renderSelectedItems(type, value) {
    selectedItems.innerHTML = '';
    let header = document.createElement('h3');

    if (type === 'genre') {
        header.textContent = `Genre: ${value}`;
        const songsByGenre = songsData.filter(song => song.genre === value);
        songsByGenre.forEach(song => {
            const li = document.createElement('li');
            li.classList.add('song-item');
            li.dataset.id = song.id;
            li.innerHTML = `<strong>${song.title}</strong> - ${song.artist}`;
            li.addEventListener('click', () => addToCurrentPlaylist(song));
            selectedItems.appendChild(li);
        });
    } else if (type === 'artist') {
        header.textContent = `Artist: ${value}`;
        const songsByArtist = songsData.filter(song => song.artist === value);
        songsByArtist.forEach(song => {
            const li = document.createElement('li');
            li.classList.add('song-item');
            li.dataset.id = song.id;
            li.innerHTML = `<strong>${song.title}</strong> - <span class="song-genre">${song.genre}</span>`;
            li.addEventListener('click', () => addToCurrentPlaylist(song));
            selectedItems.appendChild(li);
        });
    }

    selectedItems.prepend(header);
}

function addToCurrentPlaylist(song) {
    const existingItem = Array.from(currentPlaylist.children).find(
        item => item.dataset.id === song.id.toString()
    );

    if (!existingItem) {
        const li = document.createElement('li');
        li.classList.add('song-item');
        li.dataset.id = song.id;
        li.innerHTML = `<strong>${song.title}</strong> - ${song.artist} 
            <span class="song-genre">${song.genre}</span>
            <button class="remove-song">Ta bort</button>`;

        const removeBtn = li.querySelector('.remove-song');
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            li.remove();
        });

        currentPlaylist.appendChild(li);
    }
}

function createPlaylist() {
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

    playlists.push(newPlaylist);
    savePlaylistsToStorage();
    renderPlaylists();

    playlistNameInput.value = '';
    currentPlaylist.innerHTML = '';
}

function renderPlaylists() {
    playlistsList.innerHTML = '';
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

function viewPlaylist(playlistId) {
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

function deletePlaylist(playlistId) {
    if (confirm('Är du säker på att du vill ta bort denna spellista?')) {
        playlists = playlists.filter(p => p.id !== playlistId);
        savePlaylistsToStorage();
        renderPlaylists();
    }
}

function savePlaylistsToStorage() {
    localStorage.setItem('sortify-playlists', JSON.stringify(playlists));
}

function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    musicList.innerHTML = '';

    if (currentFilter === 'all') {
        renderAllSongs(searchTerm);
    } else if (currentFilter === 'genre') {
        renderGenres(searchTerm);
    } else if (currentFilter === 'artist') {
        renderArtists(searchTerm);
    }
}

function setupEventListeners() {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderMusicList();
        });
    });

    searchInput.addEventListener('input', handleSearch);
    createPlaylistBtn.addEventListener('click', createPlaylist);

    clearPlaylistBtn.addEventListener('click', () => {
        currentPlaylist.innerHTML = '';
    });
}
    init();
});


