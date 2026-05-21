// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://blakesthoughts.com',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  adapter: vercel(),
  integrations: [tailwind(), sitemap(), mdx(), react()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
    },
  },
  vite: {
    resolve: {
      dedupe: ['react', 'react-dom', 'three', '@react-three/fiber', '@react-three/drei']
    },
    ssr: {
      noExternal: ['@react-three/fiber', '@react-three/drei', 'three']
    },
    optimizeDeps: {
      include: ['@react-three/fiber', '@react-three/drei', 'three']
    }
  }
});