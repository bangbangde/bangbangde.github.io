import { createWriteStream } from 'node:fs'
import { resolve } from "node:path";
import { SitemapStream } from 'sitemap';

const links = [];

export default {
  srcDir: 'docs',
  title: 'CodeBuff',
  description: 'My Coding Assistant',
  lastUpdated: true,
  head: [
    [
      'link',
      { rel: 'icon', href: '/favicon.ico' }
    ]
  ],
  // lastUpdated: true,
  themeConfig: {
    algolia: {
      appId: '...',
      apiKey: '...',
      indexName: '...'
    },
    editLink: {
      pattern: 'https://github.com/bangbangde/bangbangde.github.io/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    },
    nav: [
      {
        text: 'Notes',
        items: [
          { text: 'HTML', link: '/notes/html/' },
          { text: 'CSS', link: '/notes/css/' },
          { text: 'JavaScript', link: '/notes/javascript/' },
          { text: 'TypeScript', link: '/notes/typescript/' },
          { text: 'Vue', link: '/notes/vue/' },
          { text: 'React', link: '/notes/react/' },
          { text: 'Others', link: '/notes/others/' }
        ]
      },
      { text: 'Cheatsheets', link: '/cheatsheets/' },
      { text: 'Playgrounds', link: '/playgrounds' },
      { text: 'About', link: '/about' },
    ],
    sidebar: {
      "/html/": [],
      "/css/": [],
      "/javascript/": [],
      "/typescript/": [],
      "/vitepress/": [],
      "/vue/": [],
      "/react/": [],
      "/others/": []
    },
    footer: {
      message: 'Powered by <a href="https://vitepress.dev/" target="_blank">VitePress.</a>',
      copyright: 'Copyright © 2019-present Frank Z'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/bangbangde/bangbangde.github.io' },
    ]
  },
  transformHtml: (_, id, context) => {
    const { pageData } = context;

    if (!/[\\/]404\.html$/.test(id)) {
      links.push({
        url: pageData.relativePath.replace(/\.md$/, '.html'), // pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
        lastmod: pageData.lastUpdated
      })
    }
  },
  async transformPageData(pageData) {
    // ------------
    // {
    //   title: 'workbench',
    //   titleTemplate: undefined,
    //   description: '',
    //   frontmatter: { title: 'workbench', layout: 'page' },
    //   headers: [],
    //   params: undefined,
    //   relativePath: 'workbench.md',
    //   lastUpdated: 1678436741000
    // }
    // --------------
    // console.log('------------\n', pageData, '\n--------------\n')
  },
  async buildEnd({ outDir }) {
    const sitemap = new SitemapStream({
      hostname: 'https://codebuff.tech/'
    })
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach((link) => sitemap.write(link))
    sitemap.end()
    await new Promise((r) => writeStream.on('finish', r))
  }
}
