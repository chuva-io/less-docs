// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Less',
  tagline: 'Less is more',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://less.chuva.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'chuva-io', // Usually your GitHub org/user name.
  projectName: 'less-site', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/chuva-io/less-site/blob/main',
        },
        blog: {
          blogTitle: 'Less Blog',
          blogDescription: 'Blog discussing Less including updates, roadmaps, news, and more.',
          postsPerPage: 'ALL',
          blogSidebarTitle: 'All articles',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-3SWMVRYKKQ',
        anonymizeIP: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      metadata: [
        {name: 'keywords', content: 'fault tolerant, event-driven, microservices, javascript, typescript, rust, go, python, serverless, aws, google cloud, gcp, azure, terraform, infrastructure as code, devops, cloud, distributed systems'},
      ],
      navbar: {
        title: 'Less Documentation (beta)',
        logo: {
          alt: 'Chuva logo',
          src: 'img/chuva-logo-h-light.svg',
          srcDark: 'img/chuva-logo-h-dark.svg',
        },
        items: [
          {
            to: 'https://dashboard.less.chuva.io',
            label: 'Dashboard',
            position: 'right',
          },
          {
            to: 'https://discord.gg/XcYDcjbDRS',
            label: 'Discord',
            position: 'right',
          },
          {
            to: 'https://www.youtube.com/@chuva-io',
            label: 'YouTube',
            position: 'right',
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'right',
          },
          {
            to: '/faq',
            label: 'FAQ',
            position: 'right',
          },
        ]
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Quick Start',
                to: '/quick-start',
              },
              {
                label: 'Tutorials',
                to: '/tutorials/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/XcYDcjbDRS',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/chuva-io',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/@chuva-io',
              },
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/io.chuva',
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/chuva.io/',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/chuva/',
              }
            ],
          },
          {
            title: 'Contact Us',
            items: [
              {
                label: 'less@chuva.io',
                to: 'mailto:less@chuva.io?subject=Get%20in%20Touch%20with%20the%20Less%20Team',
              },
              {
                label: '+238 353 35 17',
                to: 'tel:+2383533517',
              }
            ],
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Chuva.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['python', 'bash'],
      },
    }),
};

export default config;
