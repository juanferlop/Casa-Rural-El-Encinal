// ==================== VARIABLES DE GALERÍA ====================
const imagenes = {
    'casa-grande': [
        'WhatsApp%20Image%202026-07-21%20at%2020.52.35.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2020.52.58.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2020.53.32.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2020.53.56.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2020.54.40.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2020.55.15.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2020.55.37.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2020.56.05.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2020.58.55.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2020.59.36.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2021.00.02.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2021.00.41.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2021.01.12.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2021.01.55.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2021.02.53.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2021.03.44.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2021.05.17.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2021.05.51.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2021.06.26.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2021.42.01.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2021.43.15.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2021.43.57.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2021.44.38.jpeg',
        'WhatsApp%20Image%202026-07-21%20at%2021.45.21.jpeg'
    ]
};

// ==================== FUNCIONES DE GALERÍA ====================
let currentImageIndex = 0;
let allImages = [];

function generarGaleria() {
    const galeriaGrid = document.getElementById('galeria-grid');

    if (!galeriaGrid) return;

    galeriaGrid.innerHTML = '';
    allImages = [];

    Object.entries(imagenes).forEach(([casa, fotos]) => {
        fotos.forEach((foto, index) => {
            const item = document.createElement('div');
            item.className = 'galeria-item';

            const imgPath = `assets/images/${casa}/${foto}`;
            allImages.push(imgPath);

            item.innerHTML = `
                <img src="${imgPath}" alt="Foto de ${casa}" class="galeria-img" loading="lazy" decoding="async">
                <div class="galeria-overlay">
                    <div class="galeria-overlay-content">
                        <p class="galeria-overlay-text"></p>
                    </div>
                </div>
            `;

            item.addEventListener('click', () => {
                currentImageIndex = allImages.indexOf(imgPath);
                abrirModal(imgPath);
            });
            galeriaGrid.appendChild(item);
        });
    });
}

function abrirModal(imgSrc) {
    const modal = document.getElementById('galeria-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');

    modal.style.display = 'block';
    modalImg.src = imgSrc;
    modalCaption.textContent = '';

    // Actualizar visibilidad de flechas
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    if (prevBtn) prevBtn.style.opacity = currentImageIndex === 0 ? '0.3' : '1';
    if (nextBtn) nextBtn.style.opacity = currentImageIndex === allImages.length - 1 ? '0.3' : '1';

    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    const modal = document.getElementById('galeria-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function irProximaImagen() {
    if (currentImageIndex < allImages.length - 1) {
        currentImageIndex++;
        abrirModal(allImages[currentImageIndex]);
    }
}

function irImagenAnterior() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        abrirModal(allImages[currentImageIndex]);
    }
}

// Cerrar modal al hacer clic fuera de la imagen
window.addEventListener('click', (event) => {
    const modal = document.getElementById('galeria-modal');
    const modalContent = document.querySelector('.modal-content');

    if (event.target === modal) {
        cerrarModal();
    }
});

// Navegación por teclado en el modal
document.addEventListener('keydown', (event) => {
    const modal = document.getElementById('galeria-modal');
    if (modal && modal.style.display === 'block') {
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            irProximaImagen();
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            irImagenAnterior();
        } else if (event.key === 'Escape') {
            event.preventDefault();
            cerrarModal();
        }
    }
});

// Swipe táctil en el modal
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
    const modal = document.getElementById('galeria-modal');
    if (modal && modal.style.display === 'block') {
        touchStartX = e.touches[0].clientX;
    }
}, { passive: true });

document.addEventListener('touchend', (e) => {
    const modal = document.getElementById('galeria-modal');
    if (modal && modal.style.display === 'block') {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) irProximaImagen();
            else irImagenAnterior();
        }
    }
}, { passive: true });

// Inicializar galería al cargar
document.addEventListener('DOMContentLoaded', () => {
    generarGaleria();
});
