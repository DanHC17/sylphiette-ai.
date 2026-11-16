# Sylphiette AI — Starter 0.1

Prototipo gratuito, local e instalable como PWA en Android. Incluye:
- Interfaz de chat adaptable a móvil.
- Historial local (localStorage).
- Memoria manual: agregar, consultar y borrar recuerdos.
- Respuestas de demostración.
- Archivos PWA y caché básica sin conexión.

## Importante: qué NO hace todavía
Esta versión NO utiliza un modelo generativo. Las respuestas son demostrativas y no representan una IA real. No introduzcas contraseñas, datos financieros, información médica ni secretos. Los datos se guardan en el almacenamiento del navegador de este dispositivo y pueden perderse si borras los datos del sitio o cambias de navegador.

## Cómo probar en Android (sin computadora)

### Opción recomendada: GitHub Pages gratis
1. Descarga y descomprime `sylphiette-ai-starter.zip`.
2. En el navegador de Android, abre https://github.com y crea una cuenta si no tienes.
3. Crea un repositorio nuevo llamado `sylphiette-ai`.
4. Sube los archivos y carpetas que están dentro de esta carpeta (no solamente el ZIP).
5. En el repositorio, abre **Settings → Pages**.
6. En **Build and deployment**, elige **Deploy from a branch**.
7. Selecciona la rama `main` y la carpeta `/ (root)`, y guarda.
8. Espera a que GitHub Pages publique el sitio. La dirección será parecida a `https://TU-USUARIO.github.io/sylphiette-ai/`.
9. Abre esa dirección en Chrome Android.
10. En el menú de Chrome, elige **Instalar aplicación** o **Añadir a pantalla de inicio** (el texto puede variar).

GitHub Pages sirve archivos estáticos por HTTPS. No aloja un backend ni protege secretos de API.

### Probar localmente
Puedes abrir `index.html` con un editor/visor HTML Android, pero algunas funciones PWA requieren HTTPS o localhost. Para instalarla como aplicación, utiliza un hosting HTTPS como GitHub Pages.

## Uso
- Escribe en la caja inferior y pulsa enviar.
- Pulsa el corazón de la parte superior para abrir Recuerdos.
- Agrega recuerdos manualmente.
- Puedes eliminar un recuerdo individual.
- El botón inferior borra historial y recuerdos locales.

## Estructura
- `index.html`: interfaz.
- `styles.css`: diseño.
- `app.js`: chat de demostración y almacenamiento.
- `manifest.webmanifest`: configuración instalable.
- `sw.js`: caché offline.
- `assets/icon.svg`: icono.

## Próxima etapa: IA real
Para conectar un modelo de IA de forma segura, se necesita un backend HTTPS. La aplicación enviará el mensaje al backend; el backend leerá el prompt de Sylphiette y consultará el proveedor elegido. La clave API debe guardarse como variable secreta del servidor, nunca en `app.js`, `index.html` ni en el repositorio público.

Un proveedor puede ofrecer un nivel gratuito sujeto a límites, disponibilidad y cambios de sus condiciones. No se promete coste cero permanente.
