import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/billigskadedyr-redesign/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
    index: 'index.html',    'service/muldvarpe/index.html': 'service/muldvarpe/index.html',    'service/snegle/index.html': 'service/snegle/index.html',    'service/klannere/index.html': 'service/klannere/index.html',    'service/myg/index.html': 'service/myg/index.html',    'service/moel/index.html': 'service/moel/index.html',    'service/gaasebiller/index.html': 'service/gaasebiller/index.html',    'service/myrer/index.html': 'service/myrer/index.html',    'service/hvepse/index.html': 'service/hvepse/index.html',    'service/vaeggelus/index.html': 'service/vaeggelus/index.html',    'service/soelvfisk/index.html': 'service/soelvfisk/index.html',    'service/borebiller/index.html': 'service/borebiller/index.html',    'service/kakerlakker/index.html': 'service/kakerlakker/index.html',    'service/fluer/index.html': 'service/fluer/index.html',    'service/edderkopper/index.html': 'service/edderkopper/index.html'
      },
    },
  },
})
