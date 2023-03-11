export default {
  srcDir: 'docs',
  title: 'CodeBuff',
  description: 'My Coding Assistant',
  head: [
    [
      'link',
      { rel: 'icon', href: '/favicon.ico' }
    ]
  ],
  themeConfig: {
    // 顶部右侧横向导航菜单
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
    socialLinks: [
      { icon: 'github', link: 'https://github.com/bangbangde/bangbangde.github.io' },
    ],
    footer: {
      message: 'Powered by <a href="https://vitepress.dev/" target="_blank">VitePress.</a>',
      copyright: 'Copyright © 2019-present Frank Z'
    }
  }
}
