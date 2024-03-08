---
sidebar_position: 14
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploy
[![npm version](https://badge.fury.io/js/@chuva.io%2Fless-cli.svg)](https://badge.fury.io/js/@chuva.io%2Fless-cli)

## Deploy Applications and Microservices

In order to deploy your application or service, execute `less-cli deploy` with your application name.

<Tabs groupId="package-manager" queryString="package-manager">

  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli deploy my-less-project
    ```
  </TabItem>

  <TabItem value="npm" label="npm">
    ```bash
    npm i -g @chuva.io/less-cli
    less-cli deploy my-less-project
  ```
  </TabItem>

  <TabItem value="yarn" label="yarn">
    ```bash
    yarn global add @chuva.io/less-cli
    less-cli deploy my-less-project
    ```
  </TabItem>

</Tabs>

### Deployment Result
Deploying the following structure would give you the output below.
```
─ less
  └─ apis
     └─ demo
     └─ webhooks
  └─ sockets
     └─ realtime_chat
  └─ topics
     └─ user_created
  └─ functions
     └─ sum
  
```

```bash
[less-cli] Building... ⚙️
[less-cli] Build complete ✅
[less-cli] Deploying... 🚀
[less-cli] Deployment complete ✅
[less-cli] Resources
[less-cli]   - API URLs
[less-cli]     - chat: https://[PROJECT_NAME]-chat.api.eu-0.a83b464c9.less.chuva.cv
[less-cli]     - webhooks: https://[PROJECT_NAME]-webhooks.api.eu-0.a83b464c9.less.chuva.cv
[less-cli]     - topics: https://[PROJECT_NAME]-topics.api.eu-0.a83b464c9.less.chuva.cv
[less-cli]     - functions: https://[PROJECT_NAME]-functions.api.eu-0.a83b464c9.less.chuva.cv
[less-cli]   - Web Socket URLs
[less-cli]     - realtime_chat: wss://[PROJECT_NAME]-realtime-chat.ws.eu-0.a83b464c9.less.chuva.cv
[less-cli] 🇨🇻
```

:::tip Encryption built in
With Less your traffic is secure on AWS using `https` and `wss` automatically.
:::

## Deploy Static Website
In order to deploy your static content, execute `less-cli deploy --static` with your application name.

<Tabs groupId="package-manager" queryString="package-manager">

  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli deploy --static my-less-project
    ```
  </TabItem>

  <TabItem value="npm" label="npm">
    ```bash
    npm i -g @chuva.io/less-cli
    less-cli deploy --static my-less-project
  ```
  </TabItem>

  <TabItem value="yarn" label="yarn">
    ```bash
    yarn global add @chuva.io/less-cli
    less-cli deploy --static my-less-project
    ```
  </TabItem>

</Tabs>

### Deployment Result
Deploying the following structure would give you the output below.
```
─ less
  └─ statics
      └─ demo-website
```

```bash
[less-cli] Building... ⚙️
[less-cli] Build complete ✅
[less-cli] Deploying... 🚀
[less-cli] Deployment complete ✅
[less-cli] Resources
[less-cli] 	 - Websites URLs
[less-cli]   - http://[PROJECT_NAME]-[WEBSITE_NAME]-143286079.s3-website-eu-west-1.amazonaws.com
[less-cli] 🇨🇻
```
