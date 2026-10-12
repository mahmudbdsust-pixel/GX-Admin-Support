import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {defineConfig} from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'copy-404-and-nojekyll',
        closeBundle() {
          try {
            const distDir = path.resolve(__dirname, 'dist');
            const indexPath = path.resolve(distDir, 'index.html');
            const notFoundPath = path.resolve(distDir, '404.html');
            const noJekyllPath = path.resolve(distDir, '.nojekyll');
            const cnamePath = path.resolve(distDir, 'CNAME');
            
            if (fs.existsSync(indexPath)) {
              fs.copyFileSync(indexPath, notFoundPath);
            }
            fs.writeFileSync(noJekyllPath, '');
            fs.writeFileSync(cnamePath, 'gxtrade.co.uk\n');
          } catch (err) {
            console.warn('Post-build GitHub Pages file sync skipped:', err);
          }
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

