import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/docs-test-homepage/', // for github pages
  cleanUrls: true,
  vite: {
    resolve: {
      preserveSymlinks: true
    }
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'SDK Docs',
        items: [
          { text: 'JS SDK', link: '/js-sdk' },
          { text: 'Go SDK', link: '/go-sdk' },
        ],
      },
      { text: 'About', link: '/about' },
    ],
  },
})
