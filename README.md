# Casa Rural El Encinal - Sitio Web

Sitio web moderno y responsivo para la Casa Rural El Encinal, ubicada en Moreda, El Bierzo, León.

## 📋 Estructura del Proyecto

```
Casa-Rural-El-Encinal/
├── index.html                 # Página principal (HTML5)
├── README.md                  # Este archivo
├── src/
│   ├── css/
│   │   └── styles.css        # Estilos principales (CSS3)
│   └── js/
│       └── main.js           # Script principal (JavaScript)
└── assets/
    └── images/               # Carpeta para imágenes
```

## 🎯 Características del Sitio

### 1. **Sección de Inicio (Hero)**
- Presentación visual atractiva
- Llamada a la acción principal
- Diseño responsivo

### 2. **Información de Casas**
- Descripción detallada de ambas casas:
  - **Casa Grande**: 6 personas, 120€/noche
  - **Casa Pequeña**: 4 personas, 80€/noche
- Listado de características
- Botones de reserva directa

### 3. **Galería de Fotos**
- Grid responsivo de imágenes
- Modal ampliable para ver fotos en detalle
- Placeholders para imágenes (reemplazar con fotos reales)

### 4. **Actividades y Patrimonio**
- 6 categorías de actividades principales
- Información detallada sobre El Bierzo
- Descripción de la Reserva de los Ancares
- Patrimonio cultural, natural y gastronómico

### 5. **Formulario de Contacto**
- Campo para seleccionar la casa
- Fechas de entrada y salida
- Validación de datos
- Integración con email

### 6. **Footer**
- Enlaces rápidos
- Información de contacto
- Enlaces a redes sociales

## 🎨 Paleta de Colores

- **Color Primario**: #8B4513 (Marrón rústico)
- **Color Secundario**: #D2691E (Naranja tierra)
- **Color Acento**: #228B22 (Verde natural)
- **Fondo Claro**: #F5F1E8 (Beige cálido)
- **Texto Oscuro**: #2C1810 (Marrón oscuro)

## 📱 Responsive Design

El sitio es completamente responsivo:
- **Desktop**: Diseño completo con múltiples columnas
- **Tablet**: Adaptación de grillas y espaciados
- **Móvil**: Optimizado para pantallas pequeñas

Breakpoints:
- Máximo ancho: 1200px
- Tabletas: hasta 768px
- Móviles: hasta 480px

## 🚀 Cómo Usar

### 1. Abrir el sitio
```bash
# Opción 1: Abrir directamente en el navegador
open index.html

# Opción 2: Usar un servidor local (recomendado)
python3 -m http.server 8000
# Luego acceder a http://localhost:8000
```

### 2. Personalización

#### Cambiar información de contacto
Editar en `index.html`:
```html
<a href="tel:+34600000000">+34 600 000 000</a>
<a href="mailto:info@casaruralencinal.com">info@casaruralencinal.com</a>
```

#### Añadir imágenes reales
1. Guardar imágenes en `assets/images/`
2. En `index.html`, reemplazar los placeholders:
```html
<!-- Cambiar en la galería -->
<img src="assets/images/tu-imagen.jpg" alt="Descripción">
```

#### Cambiar colores
Editar variables CSS en `src/css/styles.css`:
```css
:root {
    --primary-color: #8B4513;
    --secondary-color: #D2691E;
    --accent-color: #228B22;
    /* ... más variables */
}
```

#### Modificar precios o capacidades
Buscar en `index.html` y actualizar:
```html
<span class="precio">120€</span>  <!-- Cambiar precio -->
<span class="capacidad">Hasta 6 personas</span>  <!-- Cambiar capacidad -->
```

## 🔧 Funcionalidades JavaScript

### Galería Modal
- Click en una imagen abre modal ampliado
- Click fuera cierra modal
- Navegación suave

### Formulario de Contacto
- Validación de campos requeridos
- Integración con cliente de email predeterminado
- Mensaje de confirmación visual
- Validación de fechas (entrada < salida)

### Scroll Automático
- Botones "Reservar" desplazan automáticamente al formulario
- Enlaces de navegación suave

### Scroll Spy
- La navegación resalta la sección actual
- Actualización dinámica al scroll

## 📧 Sistema de Contacto

El formulario integra directamente con el cliente de email del usuario:
- Los datos se envían como mailto con todos los detalles
- No requiere backend ni servidor

### Para un sistema real (opcional):

Si quieres procesar emails desde el servidor:
1. Usar un servicio como FormSubmit.co, Netlify Forms, o EmailJS
2. Cambiar el `type="submit"` a JavaScript personalizado
3. Conectar con API de envío de emails

Ejemplo con Netlify:
```html
<form name="contact" method="POST" netlify>
    <!-- campos del formulario -->
</form>
```

## 🎯 Pasos Siguientes

1. **Reemplazar imágenes placeholder** con fotos reales de las casas
2. **Actualizar información de contacto** real
3. **Añadir redes sociales** (Instagram, Facebook, TripAdvisor)
4. **Integrar sistema de reservas** (Booking.com, Airbnb, sistema propio)
5. **Implementar analytics** (Google Analytics)
6. **Optimizar SEO**
7. **Considerar un dominio personalizado** y hosting

## 🌐 Deployment Recomendado

### Opciones gratuitas/baratas:
- **Netlify**: Hosting gratuito, deploy desde Git
- **Vercel**: Especializado en aplicaciones web
- **GitHub Pages**: Gratuito para sitios estáticos
- **Hostinger**: Hosting compartido económico

### Pasos para Netlify:
1. Subir a repositorio Git
2. Conectar repo a Netlify
3. Configurar deploy automático
4. Añadir dominio personalizado

## 📞 Información de la Casa

**Casa Rural El Encinal**
- Ubicación: Moreda, Bierzo, León
- Región: Reserva de los Ancares
- Contacto: [Completar con datos reales]

**Casa Grande**: 6 personas | 120€/noche
**Casa Pequeña**: 4 personas | 80€/noche

## 📄 Licencia

Sitio web creado para Casa Rural El Encinal. Todos los derechos reservados.

---

**Última actualización**: Julio 2024
**Versión**: 1.0
