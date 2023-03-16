import { createWriteStream } from 'node:fs'
import { resolve, join } from "node:path";
import { SitemapStream } from 'sitemap';
import { genSideBar } from "../utils/genSidebar.mjs";

const srcDir = 'docs';
const links = [];
function genDefSidebar(path, title, items, { indexText = 'overview', archiveText= '全部笔记' } = {}) {
  return [
    {
      text: title,
      collapsed: false,
      items: [
        { text: indexText, link: join(path, 'index') },
        ...(items || [])
      ]
    },
    {
      text: archiveText,
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
    ],
    [
      'script',
      {},
      `var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?cb0449e83116c1bb248ed22ba367a1b4";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`
    ]
  ],
  // lastUpdated: true,
  themeConfig: {
    algolia: {
      appId: 'Q168L854DW',
      apiKey: 'f56dfc15de994d9fba815740f380badf',
      indexName: 'codebuff',
    },
    editLink: {
      pattern: 'https://github.com/bangbangde/bangbangde.github.io/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    },
    nav: [
      {
        text: 'Notes',
        items: [
          { text: 'Q&A', link: '/questions' },
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
              { text: 'React', link: '/notes/react/' }
            ]
          }
        ]
      },
      { text: 'Workbench', link: '/workbench' },
      { text: 'Cheatsheets', link: '/cheatsheets/' },
      { text: 'Playgrounds', link: '/playgrounds' },
      { text: 'About', link: '/about' },
    ],
    sidebar: {
      "/cheatsheets/": genDefSidebar('cheatsheets', 'Cheatsheets', null, { archiveText: 'All' }),
      "/notes/html/": genDefSidebar('notes/html', 'HTML'),
      "/notes/css/": genDefSidebar('notes/css', 'CSS'),
      "/notes/javascript/": genDefSidebar('notes/javascript', 'JavaScript'),
      "/notes/typescript/": genDefSidebar('notes/typescript', 'TypeScript'),
      "/notes/vue/": genDefSidebar('notes/vue', 'VUE'),
      "/notes/react/": genDefSidebar('notes/react', 'React'),
      "/notes/vitepress/": genDefSidebar('notes/vitepress', 'Vitepress'),
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
