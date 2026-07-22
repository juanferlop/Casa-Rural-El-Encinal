# 🎨 Sistema Centralizado de Colores - Casa Rural El Encinal

## 📋 Descripción
Sistema profesional y moderno para gestionar todos los colores del sitio desde **un único archivo JSON**. Ya no necesitas buscar colores en el CSS.

## 📁 Estructura

```
src/config/themes.json          ← Archivo centralizado con todas las paletas
src/js/theme-manager.js         ← Script que carga y aplica los temas
src/css/styles.css              ← CSS con variables (NO editar colores aquí)
```

## 🎯 Temas Disponibles

### 1. **Gris + Cobre Moderno** (ACTUAL)
```json
"gris-cobre": {
  "primary": "#1F1F1F",
  "secondary": "#B8860B",
  "accent": "#D4A574",
  "gradient-main": "linear-gradient(135deg, #2A2A2A 0%, #1F1F1F 50%, #3A3A3A 100%)"
}
```

### 2. **Azul-Púrpura Elegante**
```json
"azul-purpura": {
  "primary": "#1a1f3a",
  "secondary": "#6B4C9A",
  "accent": "#9B7EC4"
}
```

### 3. **Blanco-Negro Minimalista**
```json
"blanco-negro": {
  "primary": "#1a1a1a",
  "secondary": "#4a4a4a",
  "accent": "#6b6b6b"
}
```

### 4. **Naranja-Coral Moderno**
```json
"naranja-coral": {
  "primary": "#2a1810",
  "secondary": "#D97706",
  "accent": "#EA8C55"
}
```

## 🚀 Cómo Cambiar de Tema

### **Opción 1: Por JavaScript en Console**
En la consola del navegador:
```javascript
// Cambiar tema actual
window.themeManager.switchTheme('azul-purpura');

// Ver temas disponibles
console.log(window.themeManager.getThemes());

// Ver info de un tema
console.log(window.themeManager.getThemeInfo('gris-cobre'));
```

### **Opción 2: Editar themes.json**
1. Abre `src/config/themes.json`
2. Cambia el campo `"current"`:
```json
{
  "themes": { ... },
  "current": "azul-purpura"  ← Cambia este valor
}
```
3. Recarga el navegador

## ✏️ Cómo Crear un Tema Personalizado

1. Abre `src/config/themes.json`
2. Añade un nuevo tema en la sección `"themes"`:

```json
{
  "themes": {
    "mi-tema-custom": {
      "name": "Mi Tema Custom",
      "description": "Descripción de mi tema",
      "primary": "#XXXXXX",
      "secondary": "#XXXXXX",
      "accent": "#XXXXXX",
      "light-bg": "#FAFAF8",
      "white": "#FFFFFF",
      "border": "#E8E3DB",
      "gradient-main": "linear-gradient(135deg, #XXX 0%, #XXX 50%, #XXX 100%)",
      "gradient-main-hover": "linear-gradient(135deg, #XXX 0%, #XXX 50%, #XXX 100%)",
      "shine": "inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.3)"
    }
  },
  "current": "mi-tema-custom"
}
```

3. Recarga la página

## 🎨 Propiedades de un Tema

| Propiedad | Uso |
|-----------|-----|
| `name` | Nombre legible del tema |
| `description` | Descripción breve |
| `primary` | Color primario (textos, fondos oscuros) |
| `secondary` | Color secundario (decoración) |
| `accent` | Color de acento (botones, enlaces) |
| `light-bg` | Fondo claro |
| `white` | Color blanco puro |
| `border` | Color de bordes |
| `gradient-main` | Gradiente para botones |
| `gradient-main-hover` | Gradiente en hover |
| `shine` | Efecto brillo/vidrio |

## 💾 Cambios Automáticos

- El tema seleccionado se guarda en `localStorage` (persistente en el navegador)
- Cada página carga `theme-manager.js` primero
- Los colores se aplican automáticamente al cargar

## 📝 Notas

- **NO EDITES** los colores directamente en `styles.css`
- Todos los cambios deben hacerse en `src/config/themes.json`
- Los nombres de las variables CSS son automáticamente sincronizados
- Cada tema incluye todos los valores necesarios (no hay herencia)

---

**¿Quieres probar otro tema? Solo dime el nombre y te lo activo.** 🎨
