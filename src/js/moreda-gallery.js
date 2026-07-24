// Galería interactiva de Moreda con modal para ampliar imágenes
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const currentImageSpan = document.getElementById('currentImage');
    const totalImagesSpan = document.getElementById('totalImages');

    let allImages = [];
    let currentIndex = 0;

    // Obtener todas las imágenes de la galería
    function initializeGallery() {
        const featured = document.querySelector('.moreda-featured-img');
        const gridImages = document.querySelectorAll('.moreda-grid .moreda-img');

        allImages = [];

        if (featured) {
            allImages.push(featured.dataset.full);
        }

        gridImages.forEach(img => {
            allImages.push(img.dataset.full);
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
        const featured = document.querySelector('.moreda-featured');
        const photos = document.querySelectorAll('.moreda-photo');

        if (featured) {
            featured.addEventListener('click', function () {
                openModal(allImages[0], 0);
            });
        }

        photos.forEach((photo, index) => {
            photo.addEventListener('click', function () {
                openModal(allImages[index + 1], index + 1);
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
