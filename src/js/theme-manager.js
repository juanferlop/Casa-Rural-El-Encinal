/**
 * Sistema de Temas Centralizado - CARGA SÍNCRONA
 * Ejecuta inmediatamente, antes de que se renderice el DOM
 */

(function initTheme() {
    // Temas inline - TOTALMENTE disponibles sin fetch
    const themesData = {
        "gris-cobre": {
            "name": "Gris + Cobre Moderno",
            "primary": "#1F1F1F",
            "secondary": "#B8860B",
            "accent": "#D4A574",
            "tertiary": "#6B8C6F",
            "light-bg": "#FAFAF8",
            "white": "#FFFFFF",
            "border": "#E8E3DB",
            "gradient-main": "linear-gradient(135deg, #2A2A2A 0%, #1F1F1F 50%, #3A3A3A 100%)",
            "gradient-hover": "linear-gradient(135deg, #353535 0%, #2A2A2A 50%, #454545 100%)",
            "shine": "inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.3)"
        },
        "azul-purpura": {
            "name": "Azul-Púrpura Elegante",
            "primary": "#1a1f3a",
            "secondary": "#6B4C9A",
            "accent": "#9B7EC4",
            "light-bg": "#FAFAF8",
            "white": "#FFFFFF",
            "border": "#E8E3DB",
            "gradient-main": "linear-gradient(135deg, #3d2d5c 0%, #2a1e45 50%, #4a3a6b 100%)",
            "gradient-hover": "linear-gradient(135deg, #4d3d6c 0%, #3a2e55 50%, #5a4a7b 100%)",
            "shine": "inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.3)"
        },
        "blanco-negro": {
            "name": "Blanco-Negro Minimalista",
            "primary": "#1a1a1a",
            "secondary": "#4a4a4a",
            "accent": "#6b6b6b",
            "light-bg": "#FAFAF8",
            "white": "#FFFFFF",
            "border": "#D0D0D0",
            "gradient-main": "linear-gradient(135deg, #2a2a2a 0%, #0f0f0f 50%, #3a3a3a 100%)",
            "gradient-hover": "linear-gradient(135deg, #3a3a3a 0%, #1f1f1f 50%, #4a4a4a 100%)",
            "shine": "inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -2px 0 rgba(0, 0, 0, 0.4)"
        },
        "naranja-coral": {
            "name": "Naranja-Coral Moderno",
            "primary": "#2a1810",
            "secondary": "#D97706",
            "accent": "#EA8C55",
            "light-bg": "#FAFAF8",
            "white": "#FFFFFF",
            "border": "#E8E3DB",
            "gradient-main": "linear-gradient(135deg, #c45a1a 0%, #a43a0a 50%, #d47535 100%)",
            "gradient-hover": "linear-gradient(135deg, #d56a2a 0%, #b54a1a 50%, #e48545 100%)",
            "shine": "inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.3)"
        }
    };

    try {
        const savedTheme = localStorage.getItem('selectedTheme') || 'gris-cobre';
        const theme = themesData[savedTheme];

        if (!theme) {
            throw new Error(`Tema "${savedTheme}" no encontrado. Usando gris-cobre por defecto.`);
        }

        // Aplicar al :root INMEDIATAMENTE
        const root = document.documentElement;
        root.style.setProperty('--primary-color', theme.primary);
        root.style.setProperty('--secondary-color', theme.secondary);
        root.style.setProperty('--accent-color', theme.accent);
        root.style.setProperty('--tertiary-color', theme.tertiary || '#6B8C6F');
        root.style.setProperty('--light-bg', theme['light-bg']);
        root.style.setProperty('--white', theme.white);
        root.style.setProperty('--border-color', theme.border);
        root.style.setProperty('--gradient-metallic', theme['gradient-main']);
        root.style.setProperty('--gradient-metallic-hover', theme['gradient-hover']);
        root.style.setProperty('--shine-effect', theme.shine);

        console.log(`✓ Tema cargado: ${theme.name}`);
    } catch (error) {
        console.error('❌ Error en theme-manager:', error);
    }

    // API global para cambiar temas
    window.themeManager = {
        switchTheme: function (themeName) {
            const theme = themesData[themeName];
            if (!theme) {
                console.error(`Tema "${themeName}" no existe`);
                return;
            }

            const root = document.documentElement;
            root.style.setProperty('--primary-color', theme.primary);
            root.style.setProperty('--secondary-color', theme.secondary);
            root.style.setProperty('--accent-color', theme.accent);
            root.style.setProperty('--light-bg', theme['light-bg']);
            root.style.setProperty('--white', theme.white);
            root.style.setProperty('--border-color', theme.border);
            root.style.setProperty('--gradient-metallic', theme['gradient-main']);
            root.style.setProperty('--gradient-metallic-hover', theme['gradient-hover']);
            root.style.setProperty('--shine-effect', theme.shine);

            localStorage.setItem('selectedTheme', themeName);
            console.log(`✓ Tema aplicado: ${theme.name}`);
        },

        getThemes: function () {
            return Object.keys(themesData);
        },

        getThemeInfo: function (name) {
            return themesData[name] || null;
        },

        getCurrent: function () {
            return localStorage.getItem('selectedTheme') || 'gris-cobre';
        }
    };

})();

