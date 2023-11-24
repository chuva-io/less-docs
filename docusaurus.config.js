// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Less Documentation',
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
  onBrokenMarkdownLinks: 'warn',

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
      navbar: {
        title: 'Less Documentation (beta)',
        logo: {
          alt: 'Chuva logo',
          src: 'img/chuva-logo-h-light.svg',
          srcDark: 'img/chuva-logo-h-dark.svg',
        }
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
                label: 'Slack',
                href: 'https://join.slack.com/t/less-ifc/shared_invite/zt-262dn4f8n-8kmibqnqj1T_x0jl_AR4ow',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/chuva-io',
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
                label: 'business@chuva.io',
                to: 'mailto:business@chuva.io',
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
        additionalLanguages: ['python'],
      },
    }),
};

export default config;
