// Galería interactiva de Moreda con modal para ampliar imágenes
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const currentImageSpan = document.getElementById('currentImage');
    const totalImagesSpan = document.getElementById('totalImages');
    const modalContent = document.querySelector('.modal-content-image');

    let allImages = [];
    let currentIndex = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let pointerStartX = 0;
    let pointerStartY = 0;

    // Obtener todas las imágenes de la galería
    function initializeGallery() {
        const galleryImages = document.querySelectorAll('.moreda-gallery .moreda-img');

        allImages = [];

        galleryImages.forEach(img => {
            if (img.dataset.full) {
                allImages.push(img.dataset.full);
            }
        });

        totalImagesSpan.textContent = allImages.length;
    }

    // Abrir modal con imagen
    function openModal(imageUrl, index) {
        currentIndex = index;
        modalImage.src = imageUrl;
        currentImageSpan.textContent = index + 1;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Cerrar modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Mostrar imagen anterior
    function showPrevious() {
        currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
        modalImage.src = allImages[currentIndex];
        currentImageSpan.textContent = currentIndex + 1;
    }

    // Mostrar imagen siguiente
    function showNext() {
        currentIndex = (currentIndex + 1) % allImages.length;
        modalImage.src = allImages[currentIndex];
        currentImageSpan.textContent = currentIndex + 1;
    }

    // Agregar listeners a todas las imágenes
    function attachImageListeners() {
        const photos = document.querySelectorAll('.moreda-gallery .moreda-photo');

        photos.forEach((photo, index) => {
            photo.addEventListener('click', function () {
                openModal(allImages[index], index);
            });
        });
    }

    // Event listeners del modal
    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', showPrevious);
    modalNext.addEventListener('click', showNext);

    // Cerrar modal al hacer clic en el fondo
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    function handleSwipeStart(clientX, clientY) {
        pointerStartX = clientX;
        pointerStartY = clientY;
        touchStartX = clientX;
        touchStartY = clientY;
    }

    function handleSwipeEnd(clientX, clientY) {
        const diffX = touchStartX - clientX;
        const diffY = Math.abs(touchStartY - clientY);

        if (Math.abs(diffX) > 50 && diffY < 60) {
            if (diffX > 0) {
                showNext();
            } else {
                showPrevious();
            }
        }
    }

    // Swipe horizontal en móvil
    [modal, modalContent, modalImage].forEach(target => {
        if (!target) return;

        target.addEventListener('touchstart', function (e) {
            if (!modal.classList.contains('active')) return;
            handleSwipeStart(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });

        target.addEventListener('touchend', function (e) {
            if (!modal.classList.contains('active')) return;
            handleSwipeEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        }, { passive: true });

        target.addEventListener('pointerdown', function (e) {
            if (!modal.classList.contains('active') || e.pointerType !== 'touch') return;
            handleSwipeStart(e.clientX, e.clientY);
        });

        target.addEventListener('pointerup', function (e) {
            if (!modal.classList.contains('active') || e.pointerType !== 'touch') return;
            handleSwipeEnd(e.clientX, e.clientY);
        });
    });

    // Navegación con teclado
    document.addEventListener('keydown', function (e) {
        if (!modal.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                showPrevious();
                e.preventDefault();
                break;
            case 'ArrowRight':
                showNext();
                e.preventDefault();
                break;
        }
    });

    // Inicializar galería
    initializeGallery();
    attachImageListeners();
});
