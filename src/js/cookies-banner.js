// ==================== BANNER DE COOKIES ====================

function initCookiesBanner() {
    // Revisar si ya ha aceptado cookies
    if (localStorage.getItem('cookies-accepted')) {
        return;
    }

    // Crear banner
    const banner = document.createElement('div');
    banner.id = 'cookies-banner';
    banner.className = 'cookies-banner';
    banner.innerHTML = `
        <div class="cookies-content">
            <div class="cookies-text">
                <h4>🍪 Uso de Cookies</h4>
                <p>Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Al continuar navegando, aceptas nuestra <a href="cookies.html" target="_blank">Política de Cookies</a> y <a href="privacidad.html" target="_blank">Política de Privacidad</a>.</p>
            </div>
            <div class="cookies-buttons">
                <button id="cookies-accept" class="cookies-btn cookies-btn-accept">Aceptar</button>
                <button id="cookies-reject" class="cookies-btn cookies-btn-reject">Rechazar</button>
            </div>
        </div>
    `;

    // Añadir al body
    document.body.insertBefore(banner, document.body.firstChild);

    // Event listeners
    document.getElementById('cookies-accept').addEventListener('click', function () {
        localStorage.setItem('cookies-accepted', 'true');
        banner.classList.add('hidden');
        setTimeout(() => banner.remove(), 300);
    });

    document.getElementById('cookies-reject').addEventListener('click', function () {
        localStorage.setItem('cookies-accepted', 'false');
        banner.classList.add('hidden');
        setTimeout(() => banner.remove(), 300);
    });

    // Mostrar banner después de cargar la página
    setTimeout(() => {
        banner.classList.add('show');
    }, 500);
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initCookiesBanner);
