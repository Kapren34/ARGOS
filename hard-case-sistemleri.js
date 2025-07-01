// Modal işlevselliği
function openDetailModal(modalId) {
    const modal = document.getElementById(`modal-${modalId}`);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeDetailModal(modalId) {
    const modal = document.getElementById(`modal-${modalId}`);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function changeModalImage(thumbnail, modalId, index) {
    const modal = document.getElementById(`modal-${modalId}`);
    if (!modal) return;

    const mainImage = modal.querySelector('.modal-main-image');
    const thumbnails = modal.querySelectorAll('.modal-thumbnail');

    if (mainImage && thumbnails) {
        mainImage.src = thumbnail.src;
        mainImage.alt = thumbnail.alt;

        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnail.classList.add('active');
    }
}

function openFullscreen(img) {
    const overlay = document.getElementById('fullscreen-overlay');
    const fullscreenImage = document.getElementById('fullscreen-image');
    
    if (overlay && fullscreenImage) {
        fullscreenImage.src = img.src;
        fullscreenImage.alt = img.alt;
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeFullscreen() {
    const overlay = document.getElementById('fullscreen-overlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Modal dışına tıklandığında kapatma
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('detail-modal')) {
        const modalId = e.target.id.replace('modal-', '');
        closeDetailModal(modalId);
    }
    if (e.target.classList.contains('fullscreen-overlay')) {
        closeFullscreen();
    }
});

// ESC tuşu ile modalları kapatma
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.detail-modal[style*="display: flex"]');
        if (openModal) {
            const modalId = openModal.id.replace('modal-', '');
            closeDetailModal(modalId);
        }
        const fullscreenOverlay = document.getElementById('fullscreen-overlay');
        if (fullscreenOverlay && fullscreenOverlay.style.display === 'flex') {
            closeFullscreen();
        }
    }
}); 