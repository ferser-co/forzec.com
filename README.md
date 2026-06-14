# FORZEC

Landing de una sola página de **FORZEC** — crema técnica premium multisuperficie
de ASEOLAB S.A.S. Construida con Astro y Tailwind CSS, sin backend ni formularios:
los llamados a la acción van directo a WhatsApp y a la tienda. Optimizada para
SEO y rendimiento.

## Stack

- [Astro](https://astro.build) 5 (salida estática)
- [Tailwind CSS](https://tailwindcss.com) 4
- Iconos [Lucide](https://lucide.dev)
- `@astrojs/sitemap` para el sitemap

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview   # sirve el build
```

## Estructura

```
src/
  pages/index.astro   # home
  layouts/Layout.astro
  components/          # navegación, hero y secciones
  styles/global.css   # Tailwind + estilos propios
  data/site.ts        # textos, enlaces y contacto
public/
  videos/             # demostraciones en video
  images/             # productos y posters
```

Todo el contenido editable (textos, número de WhatsApp, productos) vive en
[`src/data/site.ts`](src/data/site.ts).

## Despliegue

`npm run build` genera un sitio estático en `dist/`, desplegable en cualquier
hosting estático.
