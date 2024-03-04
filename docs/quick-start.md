---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start

**TLDR; Create a `GET /hello` route and deploy.**

## 1. Create a REST API route
### Create a `demo` REST API
```bash
mkdir -p less/apis/demo
```

### Create a `/hello` route
```bash
mkdir less/apis/demo/hello
```

### Create a `GET` request
<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
  ```bash
  touch less/apis/demo/hello/get.js
  ```
  
  ```js title="less/apis/demo/hello/get.js" showLineNumbers
  module.exports.process = async (request, response) => {
      response.body = 'Hello, world.';
      return response;
  };
  ```
  </TabItem>

  <TabItem value="py" label="Python">
  ```bash
  touch less/apis/demo/hello/get.py
  ```

  ```py title="less/apis/demo/hello/get.py" showLineNumbers
  import json

  def process(request, response):
      response['statusCode'] = 200
      response['body'] = 'Hello, world.'
      return response
  ```
  </TabItem>
  
</Tabs>

:::info Less REST API Documentation
Read the [Less REST API documentation](/rest-apis).
:::


## 2. Deploy
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

You just deployed a _globally available_ _serverless_ application with _infinite scale_ to _AWS_!

:::info Less Deployments Documentation
Read the [Less deployments documentation](/deploy) to learn more.
:::

## 3. Test

Once the deployment is complete you will be able to find your *Demo* API under *Resources* in the output:
```bash
[less-cli] Deployment complete ✅
[less-cli] Resources
[less-cli] - API URLs
[less-cli]  - Demo: https://[PROJECT_NAME]-[API_NAME].api.eu-0.a83b464c9.less.chuva.cv
[less-cli] 🇨🇻
```

You can test the `GET /hello` route using **curl**:
```bash
curl [BASE_URL]/hello
```

## 4. View Logs
In order to view logs for your GET request you can execute the following command:
<Tabs groupId="package-manager" queryString="package-manager">

  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli log --project my-less-project --path apis/demo/hello/get
    ```
  </TabItem>

  <TabItem value="npm" label="npm">
    ```bash
    npm i -g @chuva.io/less-cli
    less-cli log --project my-less-project --path apis/demo/hello/get
    ```
  </TabItem>

  <TabItem value="yarn" label="yarn">
    ```bash
    yarn global add @chuva.io/less-cli
    less-cli log --project my-less-project --path apis/demo/hello/get
    ```
  </TabItem>

</Tabs>

:::info Less Logs Documentation
Read the [Less logs documentation](/cli/function-logs) to learn more.
:::
