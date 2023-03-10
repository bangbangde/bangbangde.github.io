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
        text: 'Guide',
        items: [
          { text: 'HTML', link: '/guide/html/' },
          { text: 'CSS', link: '/guide/css/' },
          { text: 'JavaScript', link: '/guide/javascript/' },
          { text: 'TypeScript', link: '/guide/typescript/' },
          { text: 'Vue', link: '/guide/vue/' },
          { text: 'React', link: '/guide/react/' },
          { text: 'Others', link: '/guide/others/' }
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
      message: 'Powered by VitePress.',
      copyright: 'Copyright © 2019-present Frank Z'
    }
  }
}
