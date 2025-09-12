import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'Mentor ANA',
        short_name: 'MentorANA',
        description: 'Învățare, simulări și teste — ofițeri',
        theme_color: '#121212',
        background_color: '#121212',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        // --- MODIFICARE AICI: Am adăugat .json ---
        globPatterns: ['**/*.{js,css,html,woff2,json}'],
        cleanupOutdatedCaches: true
      }
    })
  ]
})