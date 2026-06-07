import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import { visit } from 'unist-util-visit'

// Wrap images that have alt text in a <figure> and render the alt text as a
// <figcaption> below the image.
function rehypeImageCaptions() {
  return (tree: any) => {
    visit(tree, 'element', (node: any, index: number | undefined, parent: any) => {
      if (node.tagName !== 'img' || index === undefined || !parent) return
      const alt = node.properties?.alt
      if (typeof alt !== 'string' || alt.trim() === '') return
      parent.children[index] = {
        type: 'element',
        tagName: 'figure',
        properties: {},
        children: [
          node,
          {
            type: 'element',
            tagName: 'figcaption',
            properties: {},
            children: [{ type: 'text', value: alt }],
          },
        ],
      }
    })
  }
}

export default defineConfig({
  site: 'https://yusukeshib.dev',
  build: {
    format: 'directory',
  },
  markdown: {
    rehypePlugins: [rehypeImageCaptions],
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
