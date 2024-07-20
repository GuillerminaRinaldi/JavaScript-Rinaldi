let videos = [];

async function searchVideos() {
    try {
        const query = document.getElementById('search').value.toLowerCase();
        const sortBy = document.getElementById('sortBy').value;

        localStorage.setItem('searchQuery', query);
        localStorage.setItem('sortBy', sortBy);

        const response = await fetch('data/videos.json');
        if (!response.ok) throw new Error('No se pudo cargar el archivo JSON.');
        videos = await response.json();

        let filteredVideos = videos.filter(video => 
            video.title.toLowerCase().includes(query)
        );

        if (filteredVideos.length === 0) {
            window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
            return;
        }

        if (sortBy === 'date') {
            filteredVideos.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortBy === 'title') {
            filteredVideos.sort((a, b) => a.title.localeCompare(b.title));
        }

        displayVideos(filteredVideos);
    } catch (error) {
        console.error('Error al buscar videos:', error);
        Swal.fire({
            title: 'Error',
            text: 'No se pudo realizar la búsqueda.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
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
        Swal.fire({
            title: 'Error',
            text: 'URL o título inválido.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    const newVideo = {
        id: videoId,
        title: title,
        date: new Date().toISOString().split('T')[0],
        url: `https://www.youtube.com/embed/${videoId}`
    };

    videos.push(newVideo);
    saveSong(videoId);
    document.getElementById('newVideoUrl').value = '';
    document.getElementById('newVideoTitle').value = '';
}

function deleteSong(videoId) {
    let savedSongs = JSON.parse(localStorage.getItem('savedSongs')) || [];
    savedSongs = savedSongs.filter(song => song.id !== videoId);
    localStorage.setItem('savedSongs', JSON.stringify(savedSongs));
    loadSavedSongs();
}
