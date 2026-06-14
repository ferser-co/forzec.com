import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://forzec.com',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Permitir tunnels (cloudflared / ngrok / localtunnel) que apuntan al
      // dev server. Solo aplica en `astro dev`; el build estático no lo usa.
      allowedHosts: ['.trycloudflare.com', '.ngrok-free.app', '.loca.lt'],
    },
  },
});
