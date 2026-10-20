import { defineConfig } from 'astro/config';
export default defineConfig({
  output: 'static',
  outDir: './dist',
  trailingSlash: 'always',
  // Retain HTML-aware whitespace handling rather than Astro 7's JSX default.
  compressHTML: true,
});
