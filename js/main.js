const videos = [
    {
        id: '1',
        title: 'Bzrp Music Sessions, Vol 53 con Shakira',
        date: '2023-11-01',
        url: 'https://www.youtube.com/embed/CocEMWdc7Ck'

    },
    {
        id: '2',
        title: 'De Musica Ligera de Soda Stereo',
        date: '1990-10-15',
        url: 'https://www.youtube.com/embed/T_FkEw27XJ0'
    },
    {
        id: '3',
        title: 'Sorry de Justin Bieber',
        date: '2015-10-22',
        url: 'https://www.youtube.com/embed/fRh_vgS2dFE'
    },
    {
        id: '4',
        title: 'Sweet Child o Mine de Guns and Roses',
        date: '1988-08-17',
        url: 'https://www.youtube.com/embed/1w7OgIMMRc4'
    }
];
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    searchVideos();
    loadSavedSongs();
});

function searchVideos() {
    const query = document.getElementById('search').value.toLowerCase();
    const sortBy = document.getElementById('sortBy').value;

    localStorage.setItem('searchQuery', query);
    localStorage.setItem('sortBy', sortBy);

    let filteredVideos = videos.filter(video => 
        video.title.toLowerCase().includes(query)
    );

    if (filteredVideos.length === 0) {
        // Redirigir a YouTube si no se encuentra la canción en la lista
        window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
        return;
    }

    if (sortBy === 'date') {
        filteredVideos.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'title') {
        filteredVideos.sort((a, b) => a.title.localeCompare(b.title));
    }

    displayVideos(filteredVideos);
}

function displayVideos(videos) {
    const videosContainer = document.getElementById('videos');
    videosContainer.innerHTML = '';

    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.className = 'video';
        videoElement.innerHTML = `
            <iframe width="560" height="315" src="${video.url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p>${video.title}</p>
            <button onclick="saveSong('${video.id}')">Guardar Canción</button>
        `;
        videosContainer.appendChild(videoElement);
    });
}

function clearSearch() {
    document.getElementById('search').value = '';
    localStorage.removeItem('searchQuery');
    searchVideos();
}

function clearSort() {
    document.getElementById('sortBy').value = 'relevance';
    localStorage.removeItem('sortBy');
    searchVideos();
}

function loadState() {
    const searchQuery = localStorage.getItem('searchQuery');
    const sortBy = localStorage.getItem('sortBy');

    if (searchQuery) {
        document.getElementById('search').value = searchQuery;
    }
    if (sortBy) {
        document.getElementById('sortBy').value = sortBy;
    }
}

function saveSong(videoId) {
    let savedSongs = JSON.parse(localStorage.getItem('savedSongs')) || [];
    const song = videos.find(video => video.id === videoId);
    
    if (song && !savedSongs.some(savedSong => savedSong.id === videoId)) {
        savedSongs.push(song);
        localStorage.setItem('savedSongs', JSON.stringify(savedSongs));
        loadSavedSongs();
    }
}

function loadSavedSongs() {
    const savedSongs = JSON.parse(localStorage.getItem('savedSongs')) || [];
    const savedSongsContainer = document.getElementById('savedSongs');
    savedSongsContainer.innerHTML = '';

    savedSongs.forEach(song => {
        const songElement = document.createElement('div');
        songElement.className = 'saved-song';
        songElement.innerHTML = `
            <iframe width="560" height="315" src="${song.url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p>${song.title}</p>
            <button class="delete-button" onclick="deleteSong('${song.id}')">Eliminar</button>
        `;
        savedSongsContainer.appendChild(songElement);
    });
}

function addVideo() {
    const url = document.getElementById('newVideoUrl').value;
    const title = document.getElementById('newVideoTitle').value;
    const videoId = url.split('v=')[1];

    if (!videoId || !title) {
        alert('URL o título inválido');
        return;
    }

    const newVideo = {
        id: videoId,
        title: title,
        date: new Date().toISOString().split('T')[0],
        url: `https://www.youtube.com/embed/${videoId}`
    };

    videos.push(newVideo);
    saveSong(videoId); // Guardar el nuevo video directamente
    document.getElementById('newVideoUrl').value = ''; // Limpiar el campo de entrada
    document.getElementById('newVideoTitle').value = ''; // Limpiar el campo de entrada
}

function deleteSong(videoId) {
    let savedSongs = JSON.parse(localStorage.getItem('savedSongs')) || [];
    savedSongs = savedSongs.filter(song => song.id !== videoId);
    localStorage.setItem('savedSongs', JSON.stringify(savedSongs));
    loadSavedSongs();
}