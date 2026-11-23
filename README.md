# Buenos Aires — guía de visitas

Front-end estático React + Vite + Leaflet. No tiene backend ni base de datos.

## Ejecutar localmente
1. Instalar Node.js (LTS).
2. En la carpeta del proyecto: `npm install`
3. `npm run dev`
4. Abrir la URL que muestra Vite.

## Publicar en Netlify
Subir el repositorio a GitHub y conectar Netlify. Build command: `npm run build`; publish directory: `dist`.

## Personalizar
- Los datos y lugares están en `src/main.jsx`, dentro del array `places`.
- Las fotos son enlaces remotos de Unsplash y pueden reemplazarse por URLs de fotos propias.
- Los horarios y precios son marcadores orientativos para revisar, no datos validados de todos los sitios.
