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

function renderGenres(filter = '') {
    const genres = [...new Set(songsData.map(song => song.genre))];
    const filteredGenres = genres.filter(genre => genre.toLowerCase().includes(filter.toLowerCase()));
    filteredGenres.forEach(genre => {
        const li = document.createElement('li');
        li.classList.add('genre-item');
        li.textContent = genre;
        li.addEventListener('click', () => {
            currentCategory = genre;
            renderSelectedItems('genre', genre);
        });
        musicList.appendChild(li);
    });
}

function renderArtists(filter = '') {
    const artists = [...new Set(songsData.map(song => song.artist))];
    const filteredArtists = artists.filter(artist => artist.toLowerCase().includes(filter.toLowerCase()));
    filteredArtists.forEach(artist => {
        const li = document.createElement('li');
        li.classList.add('artist-item');
        li.textContent = artist;
        li.addEventListener('click', () => {
            currentCategory = artist;
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


    init();
});

