// ==================== VARIABLES DEL CARRUSEL ====================
let carouselSlideIndex = 1;
let autoSlideTimer = null;

// ==================== FUNCIONES DEL CARRUSEL ====================
function showSlides(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');

    if (n > slides.length) {
        carouselSlideIndex = 1;
    }
    if (n < 1) {
        carouselSlideIndex = slides.length;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (slides[carouselSlideIndex - 1]) {
        slides[carouselSlideIndex - 1].classList.add('active');
    }
    if (dots[carouselSlideIndex - 1]) {
        dots[carouselSlideIndex - 1].classList.add('active');
    }
}

function nextSlide() {
    carouselSlideIndex++;
    showSlides(carouselSlideIndex);
    resetAutoSlide();
}

function prevSlide() {
    carouselSlideIndex--;
    showSlides(carouselSlideIndex);
    resetAutoSlide();
}

function currentSlide(n) {
    carouselSlideIndex = n;
    showSlides(carouselSlideIndex);
    resetAutoSlide();
}

function autoSlide() {
    carouselSlideIndex++;
    showSlides(carouselSlideIndex);
}

function resetAutoSlide() {
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
    }
    autoSlideTimer = setInterval(autoSlide, 5000);
}

// Iniciar carrusel al cargar
document.addEventListener('DOMContentLoaded', () => {
    showSlides(carouselSlideIndex);
    resetAutoSlide();
});
