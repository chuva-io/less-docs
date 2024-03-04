---
sidebar_position: 1
tags: ['docusaurus', 'jamstack', 'static website', 'cdn', 'react']
---

# Deploy Docusaurus Documentation Site

<Icon icon="logos:docusaurus" height="100" />

Deploy your documentation in seconds!

## Create your Site

```bash
npx create-docusaurus@latest my-less-project classic
```

Visit the Docusaurus [Fast Track guide](https://docusaurus.io/docs#fast-track) for more information.

## Build the Static Content

In order to deploy the site using Less we just need to build it in the `/less/statics` folder.

Let's call our site `docs`:
```bash
cd my-less-project
npx docusaurus build --out-dir less/statics/docs
```

## Deploy

```bash
nxp @chuva.io/less-cli deploy --static my-less-project
```
