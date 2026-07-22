// ==================== FUNCIONES DE GALERÍA ====================
function generarGaleria() {
    const grid = document.getElementById('galeria-grid');
    if (!grid) return;

    grid.innerHTML = '';

    // Casa Grande
    imagenes['casa-grande'].forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'galeria-item';
        item.onclick = function () {
            abrirModal(`assets/images/casa-grande/${img}`);
        };
        item.innerHTML = `
            <img src="assets/images/casa-grande/${img}" alt="Casa Grande ${index + 1}" class="galeria-img">
            <div class="galeria-overlay">Casa Grande</div>
        `;
        grid.appendChild(item);
    });

    // Casa Pequeña
    imagenes['casa-pequena'].forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'galeria-item';
        item.onclick = function () {
            abrirModal(`assets/images/casa-pequena/${img}`);
        };
        item.innerHTML = `
            <img src="assets/images/casa-pequena/${img}" alt="Casa Pequeña ${index + 1}" class="galeria-img">
            <div class="galeria-overlay">Casa Pequeña</div>
        `;
        grid.appendChild(item);
    });
}

function abrirModal(imgSrc) {
    const modal = document.getElementById('galeria-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');

    if (modal && modalImg) {
        modalImg.src = imgSrc;
        const fileName = imgSrc.split('/').pop();
        modalCaption.textContent = decodeURIComponent(fileName.replace('.jpeg', '').replace('WhatsApp%20Image%202026-07-21%20at%20', ''));
        modal.style.display = 'block';
    }
}

function cerrarModal() {
    const modal = document.getElementById('galeria-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Cerrar modal al hacer clic fuera
window.onclick = function (event) {
    const modal = document.getElementById('galeria-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// ==================== FUNCIONES DE CONTACTO ====================
function scrollToContacto() {
    document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' });
}

function obtenerNombreCasa(valor) {
    const nombres = {
        'grande': 'Casa Grande (6 personas - 120€/noche)',
        'pequena': 'Casa Pequeña (4 personas - 80€/noche)',
        'ambas': 'Consulta sobre ambas casas'
    };
    return nombres[valor] || valor;
}

function mostrarConfirmacion() {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: linear-gradient(135deg, #1a5f3f, #2d8659);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        font-weight: bold;
        z-index: 2000;
        animation: slideIn 0.5s ease;
    `;
    toast.textContent = '✓ ¡Tu solicitud ha sido enviada!';
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', function () {
    // El carrusel se inicializa en carousel.js
    // Generar galería
    generarGaleria();

    // Manejar formulario
    const formulario = document.getElementById('formulario-contacto');
    if (formulario) {
        formulario.addEventListener('submit', function (e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const casa = document.getElementById('casa').value;
            const fechaEntrada = document.getElementById('fecha-entrada').value;
            const fechaSalida = document.getElementById('fecha-salida').value;
            const mensaje = document.getElementById('mensaje').value.trim();

            if (!nombre || !email || !casa) {
                alert('Por favor, completa los campos requeridos');
                return;
            }

            const nombreCasa = obtenerNombreCasa(casa);
            const asunto = `Solicitud de Reserva - ${nombreCasa}`;
            const cuerpo = `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono || 'No proporcionado'}\nCasa: ${nombreCasa}\nFecha entrada: ${fechaEntrada || 'No especificada'}\nFecha salida: ${fechaSalida || 'No especificada'}\n\nMensaje:\n${mensaje || 'Sin mensaje adicional'}`;

            window.location.href = `mailto:info@casaruralencinal.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

            mostrarConfirmacion();
            formulario.reset();
        });
    }

    // Scroll spy para el nav
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.borderBottomColor = 'transparent';
            if (link.getAttribute('href').slice(1) === current) {
                link.style.borderBottomColor = 'var(--accent-color)';
            }
        });
    });

    // Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 0.6s ease forwards';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.casa-card, .actividad-card, .galeria-item').forEach(el => {
        observer.observe(el);
    });
});

// ==================== ESTILOS DINÁMICOS ADICIONALES ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }
    
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, var(--accent-color), #f4c430);
        color: var(--dark-text);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: var(--shadow-lg);
    }
    
    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-to-top:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-hover);
    }
    
    .nav-link.active {
        color: var(--accent-color);
        border-bottom: 3px solid var(--accent-color);
        padding-bottom: 2px;
    }
    
    .lazy-loaded {
        animation: fadeIn 0.5s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// ==================== FUNCIONALIDADES GLOBALES ====================

// Navbar Active State - Marca el link activo según la página actual
const updateActiveLink = () => {
    // Obtener el nombre del archivo actual
    let currentPage = window.location.pathname;

    // Extraer solo el nombre del archivo (ej: index.html, alojamiento.html)
    if (currentPage.includes('/')) {
        currentPage = currentPage.substring(currentPage.lastIndexOf('/') + 1);
    }

    // Si está vacío o es /, es index.html
    if (!currentPage || currentPage === '' || currentPage === '/') {
        currentPage = 'index.html';
    }

    // Marcar el link activo (EXCLUIR .btn-contacto)
    const navLinks = document.querySelectorAll('.nav-link:not(.btn-contacto)');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');

        // Comparar el href del link con la página actual
        if (href === currentPage || (currentPage === 'index.html' && (href === 'index.html' || href === ''))) {
            link.classList.add('active');
        }
    });
};

// Ejecutar cuando carga la página
document.addEventListener('DOMContentLoaded', updateActiveLink);
// También ejecutar al cambiar de página
window.addEventListener('popstate', updateActiveLink);

// Hamburger Menu Toggle
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-menu');

if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú cuando se hace clic en un link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Scroll-to-Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.setAttribute('aria-label', 'Volver al inicio');
scrollToTopBtn.setAttribute('title', 'Volver al inicio');
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Header Shadow on Scroll
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scroll-down');
        } else {
            header.classList.remove('scroll-down');
        }
    });
}

// Lazy Loading de Imágenes
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('lazy-loaded');
                    observer.unobserve(img);
                }
            });
        });
        images.forEach(img => imageObserver.observe(img));
    }
};
lazyLoadImages();

// Smooth Scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
