import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { warRoomData } from './scripts/data-plugin.mjs';

// Strict CSP in the built page only (the dev server needs an inline preamble for fast refresh).
// No external origins at all: fonts, data and code are bundled, nothing is fetched at runtime.
const csp: Plugin = {
  name: 'war-room-csp',
  apply: 'build',
  transformIndexHtml() {
    return [
      {
        tag: 'meta',
        attrs: {
          'http-equiv': 'Content-Security-Policy',
          content:
            "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'",
        },
        injectTo: 'head-prepend',
      },
    ];
  },
};

// Relative base so the build works on Vercel, GitHub Pages (project sites) or any static host.
export default defineConfig({
  base: './',
  plugins: [react(), warRoomData(), csp],
  build: {
    target: 'es2022',
    sourcemap: false,
  },
});
