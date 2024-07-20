document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const sortBySelect = document.getElementById('sortBy');
    const clearSortBtn = document.getElementById('clearSortBtn');
    const addVideoBtn = document.getElementById('addVideoBtn');

    searchInput.addEventListener('input', searchVideos);
    clearSearchBtn.addEventListener('click', clearSearch);
    sortBySelect.addEventListener('change', searchVideos);
    clearSortBtn.addEventListener('click', clearSort);
    addVideoBtn.addEventListener('click', addVideo);

    showWelcomeMessage();
    fetchVideos();
});

function showWelcomeMessage() {
    Swal.fire({
        title: 'Bienvenidos',
        text: '¡Disfruta de nuestra App de Videos de Música!',
        icon: 'info',
        confirmButtonText: 'OK'
    });
}
