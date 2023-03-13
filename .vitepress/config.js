import { createWriteStream } from 'node:fs'
import { resolve, join } from "node:path";
import { SitemapStream } from 'sitemap';
import { genSideBar } from "../utils/genSidebar.mjs";

const srcDir = 'docs';
const links = [];
function genDefSidebar(title, path) {
  return [
    {
      text: title,
      collapsed: false,
      items: [
        { text: 'overview', link: join(path, 'index') }
      ]
    },
    {
      text: '全部笔记',
      collapsed: true,
      items: genSideBar(resolve(process.cwd(), srcDir), `${path}/**/*.md`)
    }
  ]
}

export default {
  srcDir,
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
          { text: 'Archive', link: '/notes/' },
          { text: 'Yuque', link: '/yuque/' },
          {
            // text: 'Categories',
            items: [
              { text: 'HTML', link: '/notes/html/' },
              { text: 'CSS', link: '/notes/css/' },
              { text: 'JavaScript', link: '/notes/javascript/' },
              { text: 'TypeScript', link: '/notes/typescript/' },
              { text: 'Vue', link: '/notes/vue/' },
              { text: 'React', link: '/notes/react/' },
              { text: 'Others', link: '/notes/others/' }
            ]
          }
        ]
      },
      { text: 'Cheatsheets', link: '/cheatsheets/' },
      { text: 'Playgrounds', link: '/playgrounds' },
      { text: 'About', link: '/about' },
    ],
    sidebar: {
      "/cheatsheets/": genDefSidebar('Cheatsheets', 'cheatsheets'),
      "/notes/html/": genDefSidebar('HTML', 'notes/html'),
      "/notes/css/": genDefSidebar('CSS', 'notes/css'),
      "/notes/javascript/": genDefSidebar('JavaScript', 'notes/javascript'),
      "/notes/typescript/": genDefSidebar('TypeScript', 'notes/typescript'),
      "/notes/vue/": genDefSidebar('VUE', 'notes/vue'),
      "/notes/react/": genDefSidebar('React', 'notes/react'),
      "/notes/others/": genDefSidebar('Others', 'notes/others'),
      "/notes/vitepress/": genDefSidebar('Vitepress', 'notes/vitepress'),
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
