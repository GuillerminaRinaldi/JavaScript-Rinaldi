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


function searchVideos() {
    const query = document.getElementById('search').value.toLowerCase();
    const sortBy = document.getElementById('sortBy').value;

    let filteredVideos = videos.filter(video => 
        video.title.toLowerCase().includes(query)
    );

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
        `;
        videosContainer.appendChild(videoElement);
    });
}