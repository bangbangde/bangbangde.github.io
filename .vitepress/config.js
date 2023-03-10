export default {
  srcDir: 'docs',
  title: 'Bangbangde',
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
        text: 'Guides',
        items: [
          { 
            text: 'Basic',
            items: [
              { text: 'JavaScript', link: '/javascript/' },
              { text: 'Css', link: '/css/' },
              { text: 'Html', link: '/css/' }
            ]
          },
          { 
            text: 'Frameworks',
            items: [
              { text: 'Vue', link: '/vue/' },
              { text: 'React', link: '/react/' }
            ]
          }
        ]
      },
      { text: 'Cheatsheets', link: '/cheatsheets' },
      { text: 'Playgrounds', link: '/playgrounds' },
      { text: 'About', link: '/about' },
    ],
    sidebar: {
      "/vitepress/": [
        {
          text: 'VitePress',
          collapsed: true,
          items: [
            { text: 'demo', link: '/vitepress/demo' },
            { text: 'emoji', link: '/vitepress/emoji' },
          ]
        },
        {
          text: 'Section Title B',
          collapsed: true,
          items: [
            { text: 'Item C', link: '/item-c' },
            { text: 'Item D', link: '/item-d' },
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/bangbangde/bangbangde.github.io' },
    ],
    footer: {
      // message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Frank Z'
    }
  }
}
