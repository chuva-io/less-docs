---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start

**TLDR; Create a `GET /hello` route and deploy.**

## 1. Create the `demo` REST API
```bash
mkdir -p less/apis/demo
```

## 2. Create the `/hello` route
```bash
mkdir /less/apis/demo/hello
```

## 3. Create the `GET` request
<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
  ```bash
  touch less/apis/demo/hello/get.js
  ```
  
  ```js title="less/apis/demo/hello/get.js" showLineNumbers
  module.exports.process = async (request, response) => {
      const message = { hello: 'world' };
      response.statusCode = 200;
      response.body = JSON.stringify(message);
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
      message = {'hello': 'world'}
      response.statusCode = 200
      response.body = json.dumps(message)
      return response
  ```
  </TabItem>
  
</Tabs>

## 4. Deploy
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
