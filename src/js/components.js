// ==================== COMPONENTES COMPARTIDOS ====================
// Header y Footer se inyectan dinámicamente para evitar repetición en cada HTML

(function () {
    const headerHTML = `
    <header class="header">
        <nav class="navbar">
            <div class="nav-container">
                <a href="index.html" class="logo-link">
                    <div class="logo">
                        <img src="assets/logo.svg" alt="Casa Rural El Encinal" class="logo-img">
                        <div class="logo-text">
                            <h1>Casa Rural El Encinal</h1>
                            <p class="tagline">El Bierzo - León</p>
                        </div>
                    </div>
                </a>
                <ul class="nav-menu">
                    <li><a href="index.html" class="nav-link">Inicio</a></li>
                    <li><a href="alojamiento.html" class="nav-link">Alojamiento</a></li>
                    <li><a href="galeria.html" class="nav-link">Galería</a></li>
                    <li><a href="actividades.html" class="nav-link">Actividades</a></li>
                    <li><a href="moreda.html" class="nav-link">El Pueblo</a></li>
                    <li><a href="contacto.html" class="nav-link">Contacto</a></li>
                    <li><a href="tel:625433640" class="nav-link btn-contacto">📞 625433640</a></li>
                </ul>
                <div class="hamburger-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    </header>`;

    const footerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>Casa Rural El Encinal</h4>
                    <p>Tu refugio de naturaleza en El Bierzo</p>
                </div>
                <div class="footer-section">
                    <h4>Páginas</h4>
                    <ul>
                        <li><a href="index.html">Inicio</a></li>
                        <li><a href="alojamiento.html">Alojamiento</a></li>
                        <li><a href="galeria.html">Galería</a></li>
                        <li><a href="actividades.html">Actividades</a></li>
                        <li><a href="moreda.html">El Pueblo</a></li>
                        <li><a href="contacto.html">Contacto</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Sitios de Interés</h4>
                    <ul>
                        <li><a href="https://www.ancares.org" target="_blank" rel="noopener">Reserva Ancares</a></li>
                        <li><a href="https://www.turismodelbierzo.es" target="_blank" rel="noopener">Turismo Bierzo</a></li>
                        <li><a href="https://www.vinosdelbierzo.es" target="_blank" rel="noopener">Vinos DO Bierzo</a></li>
                        <li><a href="https://castillodelostemplarios.com/" target="_blank" rel="noopener">Castillo Templarios</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="privacidad.html">Política de Privacidad</a></li>
                        <li><a href="cookies.html">Política de Cookies</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; <span id="footer-year"></span> Casa Rural El Encinal. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>`;

    document.addEventListener('DOMContentLoaded', function () {
        // Inyectar header
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.outerHTML = headerHTML;
        }

        // Inyectar footer
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.outerHTML = footerHTML;
        }

        // Año dinámico
        const yearSpan = document.getElementById('footer-year');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();

        // Hamburger Menu Toggle (se inicializa aquí porque el header se inyecta aquí)
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburgerMenu && navMenu) {
            hamburgerMenu.addEventListener('click', () => {
                hamburgerMenu.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburgerMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        // Active nav link
        let currentPage = window.location.pathname;
        currentPage = currentPage.substring(currentPage.lastIndexOf('/') + 1) || 'index.html';
        document.querySelectorAll('.nav-link:not(.btn-contacto)').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === 'index.html' && (href === 'index.html' || href === ''))) {
                link.classList.add('active');
            }
        });
    });
})();
