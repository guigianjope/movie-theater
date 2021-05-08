function open(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show');

    modal.addEventListener('click', function(e) {
        if(e.target.id == modalId || e.target.id == 'close') {
            modal.classList.remove('show');
        }
    })
}

const watchButton = document.getElementById('watch')
watchButton.addEventListener('click', function() {
    open('modal_movie');
})
