const videos = [
    {
        id: '1',
        title: 'Song OneBzrp Music Sessions, Vol 53 con Shakira',
        date: '2023-01-01',
        url: 'https://www.youtube.com/watch?v=CocEMWdc7Ck'
    },
    {
        id: '2',
        title: 'De Musica Ligera de Soda Stereo',
        date: '2022-05-15',
        url: 'https://www.youtube.com/watch?v=T_FkEw27XJ0'
    },
    {
        id: '3',
        title: 'Sorry de Justin Bieber',
        date: '2021-11-20',
        url: 'https://www.youtube.com/watch?v=fRh_vgS2dFE'
    }
    {
        id: '4',
        title: 'Sweet Child'o Mine de Gun's and Roses',
        date: '2021-11-20',
        url: 'https://www.youtube.com/watch?v=1w7OgIMMRc4'
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