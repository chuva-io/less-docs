---
sidebar_position: 11
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
    npx @chuva.io/less-cli deploy my-application
    ```
  </TabItem>

  <TabItem value="npm" label="npm">
    ```bash
    npm i -g @chuva.io/less-cli
    less-cli deploy my-application
  ```
  </TabItem>

  <TabItem value="yarn" label="yarn">
    ```bash
    yarn global add @chuva.io/less-cli
    less-cli deploy my-application
    ```
  </TabItem>

</Tabs>

### Deployment Result
Deploying the following structure would give you the output below.
```
─ less
  └─ apis
     └─ chat
     └─ webhooks
  └─ sockets
     └─ realtime_chat
```

```bash
[less] Building... ⚙️
[less] Build complete ✅
[less] Deploying... 🚀
[less] Deployment complete ✅
[less] Resources
[less]   - API URLs
[less]     - chat: https://a2m1n3.execute-api.eu-west-1.amazonaws.com
[less]     - webhooks: https://n2s9n5.execute-api.eu-west-1.amazonaws.com
[less]   - Web Socket URLs
[less]     - realtime_chat: wss://10l06n.execute-api.eu-west-1.amazonaws.com
[less] 🇨🇻
```

:::tip Encryption built in
With Less your traffic is secure on AWS using `https` and `wss` automatically.
:::

## Deploy Static Websites

In order to deploy your static content, execute `less-cli deploy --static` with your application name.

<Tabs groupId="package-manager" queryString="package-manager">

  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli deploy --static my-application
    ```
  </TabItem>

  <TabItem value="npm" label="npm">
    ```bash
    npm i -g @chuva.io/less-cli
    less-cli deploy --static my-application
  ```
  </TabItem>

  <TabItem value="yarn" label="yarn">
    ```bash
    yarn global add @chuva.io/less-cli
    less-cli deploy --static my-application
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
[less] Building... ⚙️
[less] Build complete ✅
[less] Deploying... 🚀
[less] Deployment complete ✅
[less] Resources
[less] 	 - Websites URLs
[less] 	   - http://my-application-demo-website.s3-website-eu-west-1.amazonaws.com
[less] 🇨🇻
```
