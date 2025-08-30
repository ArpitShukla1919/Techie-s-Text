import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: ['@locator/babel-jsx/dist' /* or just '@locator/babel-jsx' depending on version */],
      },
    }),
  ],
});
