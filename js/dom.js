document.addEventListener('DOMContentLoaded', () => {
    disableControls();

    showWelcomeMessage().then(() => {
        enableControls();
        loadState();
        searchVideos();
        loadSavedSongs();
    });

    document.getElementById('searchBtn').addEventListener('click', searchVideos);
    document.getElementById('clearSearchBtn').addEventListener('click', clearSearch);
    document.getElementById('clearSortBtn').addEventListener('click', clearSort);
    document.getElementById('addVideoBtn').addEventListener('click', addVideo);
});

function showWelcomeMessage() {
    return Swal.fire({
        title: 'Bienvenidos',
        text: '¡Disfruta de nuestra App de Videos de Música!',
        icon: 'info',
        confirmButtonText: 'OK'
    });
}

function disableControls() {
    document.getElementById('search').disabled = true;
    document.getElementById('searchBtn').disabled = true;
    document.getElementById('clearSearchBtn').disabled = true;
    document.getElementById('sortBy').disabled = true;
    document.getElementById('clearSortBtn').disabled = true;
    document.getElementById('newVideoUrl').disabled = true;
    document.getElementById('newVideoTitle').disabled = true;
    document.getElementById('addVideoBtn').disabled = true;
}

function enableControls() {
    document.getElementById('search').disabled = false;
    document.getElementById('searchBtn').disabled = false;
    document.getElementById('clearSearchBtn').disabled = false;
    document.getElementById('sortBy').disabled = false;
    document.getElementById('clearSortBtn').disabled = false;
    document.getElementById('newVideoUrl').disabled = false;
    document.getElementById('newVideoTitle').disabled = false;
    document.getElementById('addVideoBtn').disabled = false;
}
