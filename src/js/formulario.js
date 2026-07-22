// ==================== FUNCIONES DE FORMULARIO ====================

// Validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validar teléfono
function validarTelefono(telefono) {
    if (!telefono) return true; // Es opcional
    const regex = /^[0-9\s\+\-\(\)]{9,}$/;
    return regex.test(telefono);
}

// Mostrar notificación con diferentes tipos
function mostrarNotificacion(mensaje, tipo = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${tipo}`;
    toast.innerHTML = mensaje;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, tipo === 'error' ? 5000 : 3000);
}

function mostrarConfirmacion(mensaje = '✓ ¡Tu solicitud ha sido enviada!') {
    mostrarNotificacion(mensaje, 'success');
}

function obtenerNombreCasa(valor) {
    const casas = {
        'grande': 'Casa Grande (6 personas - 120€/noche)',
        'pequena': 'Casa Pequeña (4 personas - 80€/noche)',
        'ambas': 'Consulta sobre ambas casas'
    };
    return casas[valor] || valor;
}

// Agregar feedback visual a campos
function configurarValidacionCampos() {
    const campos = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');

    campos.forEach(campo => {
        campo.addEventListener('blur', () => {
            if (campo.value.trim()) {
                campo.classList.add('filled');
            } else {
                campo.classList.remove('filled');
            }
        });

        campo.addEventListener('focus', () => {
            campo.classList.add('focused');
        });

        campo.addEventListener('blur', () => {
            campo.classList.remove('focused');
        });
    });
}

// Inicializar formulario
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-contacto');

    if (formulario) {
        configurarValidacionCampos();

        formulario.addEventListener('submit', (e) => {
            e.preventDefault();

            // Obtener valores
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const casa = document.getElementById('casa').value;
            const fechaEntrada = document.getElementById('fecha-entrada').value;
            const fechaSalida = document.getElementById('fecha-salida').value;
            const mensaje = document.getElementById('mensaje').value.trim();

            // Validar campos requeridos
            if (!nombre) {
                mostrarNotificacion('❌ Por favor ingresa tu nombre', 'error');
                return;
            }

            if (!email) {
                mostrarNotificacion('❌ Por favor ingresa tu email', 'error');
                return;
            }

            if (!validarEmail(email)) {
                mostrarNotificacion('❌ Por favor ingresa un email válido', 'error');
                return;
            }

            if (!mensaje) {
                mostrarNotificacion('❌ Por favor ingresa tu mensaje', 'error');
                return;
            }

            if (telefono && !validarTelefono(telefono)) {
                mostrarNotificacion('❌ Por favor ingresa un teléfono válido', 'error');
                return;
            }

            // Validar que las fechas sean lógicas
            if (fechaEntrada && fechaSalida) {
                const entrada = new Date(fechaEntrada);
                const salida = new Date(fechaSalida);
                if (entrada >= salida) {
                    mostrarNotificacion('❌ La fecha de salida debe ser posterior a la de entrada', 'error');
                    return;
                }
            }

            // Construir correo
            const asunto = `Solicitud de Reserva - ${nombre}`;
            const cuerpo = `
SOLICITUD DE RESERVA - Casa Rural El Encinal

INFORMACIÓN DEL SOLICITANTE:
Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono || 'No proporcionado'}

DETALLES DE LA RESERVA:
Casa de interés: Casa Grande
Fecha de entrada: ${fechaEntrada || 'No especificada'}
Fecha de salida: ${fechaSalida || 'No especificada'}

MENSAJE:
${mensaje}

---
Solicitud enviada desde: www.casaruralencinal.com
Fecha y hora de envío: ${new Date().toLocaleString('es-ES')}
            `.trim();

            const mailtoLink = `mailto:info@casaruralencinal.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

            // Abrir cliente de correo
            window.location.href = mailtoLink;

            // Mostrar confirmación
            mostrarConfirmacion('✓ ¡Tu solicitud ha sido enviada correctamente!');

            // Limpiar formulario después de un breve delay
            setTimeout(() => {
                formulario.reset();
                document.querySelectorAll('input, textarea').forEach(campo => {
                    campo.classList.remove('filled', 'focused');
                });
            }, 500);
        });
    }
});

// Estilos para el toast (inyectados dinámicamente)
const style = document.createElement('style');
style.textContent = `
.toast-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #1a5f3f, #2d8659);
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    font-weight: 600;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.toast-notification.show {
    opacity: 1;
}

@media (max-width: 480px) {
    .toast-notification {
        top: 10px;
        right: 10px;
        left: 10px;
        border-radius: 6px;
        font-size: 14px;
        padding: 12px 16px;
    }
}
`;
document.head.appendChild(style);
