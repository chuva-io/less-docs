---
sidebar_position: 2
description: >
  Deploy a Serverless Node.js REST API to AWS in 3 Minutes Using Less with automatic cloud resource provisioning, infinite auto-scaling, security best practices, fault-tolerance, and more by default.
image: https://docs.less.chuva.io/img/quick-start-documentation.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start

**Deploy a Serverless Node.js REST API to AWS in 3 Minutes Using Less.**

In this tutorial, we'll guide you through creating and deploying a "Hello, world" REST API, demonstrating the ease of use of Less. With automatic cloud resource provisioning, infinite auto-scaling, security best practices, fault-tolerance, and more by default, it's never been easier to get code to production!

## Create your Less project

```bash
mkdir less-quick-start
cd less-quick-start
```

## Install the Less CLI

<Tabs groupId="package-manager" queryString="package-manager">

  <TabItem value="npm" label="npm">
    ```bash
    npm i -g @chuva.io/less-cli
    ```
  </TabItem>

  <TabItem value="yarn" label="yarn">
    ```bash
    yarn global add @chuva.io/less-cli
    ```
  </TabItem>

</Tabs>

## Create your REST API route
Run the following command to create a `GET /hello` route in Javascript.
```bash
less-cli create route --name demo --language js --verb get --path /hello
```

This will create the following route.
```js title="less/apis/demo/hello/get.js"
exports.process = async (request, response) => {
  response.body = 'Hello, world.';
  return response;
};
```

:::tip Learn more about creating API routes.
You can run the following command to learn more about the options provided above.
```bash
less-cli create route --help
```
:::

## Test your project locally
Less allows you to preview your project locally before deploying to AWS. Let's see how to build and run your project.

### Build
Less allows you to create a named build locally which makes it possible to run multiple versions of the same project. This allows you to run the same project with different environment variables or code versions.
```bash
less-cli build getting-started
```

### Run
Once you have built your project you can run it with the following command.
```bash
less-cli run getting-started
```

Running your project produces the following output.
```bash
[less-local] App "getting-started" is running ✅
[less-local] Resources:
[less-local]   List of APIs:
[less-local]     - demo: http://localhost:3333
[less-local] 🇨🇻
```

### Test
Now that we have our project running locally let's test it. Run the following command to test it using CURL in your terminal.
```bash
curl localhost:3333/hello
```

## Deploy to production
You can deploy your project to production with a single command.
```bash
less-cli deploy getting-started
```

🚀 Congratulations! You have deployed your Serverless REST API to AWS!

🤩 Does it get any easier than that?!

:::note You will need to be logged in to your Less account in order to deploy.
If you don't have a Less account you can create one and log in using the following commands.
```bash
less-cli register
less-cli login
```
:::



---

:::tip Learn more about building REST APIs in Less.
Check out our [REST API documentation](/rest-apis) to learn how to [process your request parameters](/rest-apis#http-requestresponse-properties), [create dynamic routes](/rest-apis#api-dynamic-paths), [create middleware functions](/rest-apis#middleware), and more.
:::

:::tip Learn how to add more Less features to your project.
Adding other Less features is just as easy. Learn how to add [Web Sockets](/web-sockets), [Topics/Subscribers (Pub/Sub)](/topics_subscribers), [CRON Jobs](/cron-jobs), [Key-Value Stores](/key-value-store), [File Storage](/file-storage), and more in our docs!
:::
