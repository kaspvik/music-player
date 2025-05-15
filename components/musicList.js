export function renderMusicList() {
    const musicList = document.getElementById('music-list');
    musicList.innerHTML = '';
    
    const { currentFilter } = window.sortifyApp;
    
    if (currentFilter === 'all') {
        renderAllSongs();
    } else if (currentFilter === 'genre') {
        renderGenres();
    } else if (currentFilter === 'artist') {
        renderArtists();
    }
}

export function renderAllSongs(filter = '') {
    const musicList = document.getElementById('music-list');
    
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

export function renderGenres(filter = '') {
    const musicList = document.getElementById('music-list');
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

export function renderArtists(filter = '') {
    const musicList = document.getElementById('music-list');
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

export function renderSelectedItems(type, value) {
    const selectedItems = document.getElementById('selected-items');
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

export function addToCurrentPlaylist(song) {
    const currentPlaylist = document.getElementById('current-playlist');
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