---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start

**Deploy a Serverless Node.js REST API to AWS in 3 Minutes Using Less.**

In this tutorial, we'll guide you through creating and deploying a "Hello, World" REST API, demonstrating the ease of use of Less. With automatic cloud resource provisioning, infinite auto-scaling, security best practices, fault-tolerance, and more by default, it's never been easier to get code to production!

## Create your Less project
Let's create our first Less project by creating a `/less` folder.

:::tip Add Less to your existing projects
All you need is a `/less` folder to start using Less. Drop Less into an existing project and start leveraging Less features. Make your life easier!
:::

```bash
mkdir -p getting_started_with_less/less
```

```bash
cd getting_started_with_less
```

## Create your REST API route
The Less CLI provides a suite of commands to streamline resource creation. Let's explore our options.

<Tabs groupId="package-manager" queryString="package-manager">

  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli create -h
    ```
  </TabItem>

  <TabItem value="npm" label="npm">
    ```bash
    npm i -g @chuva.io/less-cli
    ```
    ```bash
    less-cli create -h
    ```
  </TabItem>

  <TabItem value="yarn" label="yarn">
    ```bash
    yarn global add @chuva.io/less-cli
    ```
    ```bash
    less-cli create -h
    ```
  </TabItem>

</Tabs>

```
Usage: less-cli create [options] [command]

Streamline your development by creating your Less files/resources and
boilerplate code automatically.

Options:
  -h, --help                display help for command

Commands:
  route [options]           Creates your HTTP routes.
  socket [options]          Creates your Web Sockets and socket channels or
                            adds channels to existing sockets.
  topic [options]           Creates Topics and Subscribers.
  subscribers [options]     Creates Subscribers to Topics.
  cron [options]            Creates your CRON Jobs.
  shared-module [options]   Creates your Shared Code Modules.
  cloud-function [options]  Creates your Cloud Functions.
  help [command]            display help for command
```

We can see that Less allows us to create all of our cloud resources using the CLI. Let's focus on creating our HTTP route using the `less-cli create route` command. Let's see how it works.

<Tabs groupId="package-manager" queryString="package-manager">
  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli create route -h
    ```
  </TabItem>
  <TabItem value="npm" label="npm">
    ```bash
    less-cli create route -h
    ```
  </TabItem>
  <TabItem value="yarn" label="yarn">
    ```bash
    less-cli create route -h
    ```
  </TabItem>
</Tabs>

```
Usage: less-cli create route [options]

Creates your HTTP routes.

Required options: For options marked as required, if you do not specify an option you will be asked to specify it in interactive mode instead.

Read the REST API Documentation: https://less.chuva.io/rest-apis

Options:
  -n, --name <name>          Required: The name of the API to create the route for. (E.g. "store_api")
  -p, --path <path>          Required: The HTTP route path to create. (E.g. "/orders/{order_id}")
  -l, --language <language>  Required: The programming language to use for the code. (choices: "js", "py")
  -v, --verb <verb>          Required: The HTTP verb to use for the route. (choices: "get", "post", "put", "patch", "delete")
  -h, --help                 display help for command
```

:::note
- Less supports multiple REST APIs in the same project so we need to specify which API the route should be created for by using the `name` option. 
- Since Less supports more than one programming language, you should also specify the `language`.
- Finally we should specify the `verb` and the `path` of the route.
:::

```
npx @chuva.io/less-cli create route --name demo --language js --verb get --path "/hello"
# File created: less/apis/demo/hello/get.js
```

We can see that this simply created a `less/apis/demo/hello/get.js` file with the code for our route.
```javascript title="less/apis/demo/hello/get.js" showLineNumbers
exports.process = async (request, response) => {
  response.body = 'Hello, world.';
  return response;
};
```

This is all you need to deploy your first Less project.

## Create your Less account
Let's create our account and deploy.

#### Sign up
Less works with the CLI as the primary interface. Creating an account is no different.

Use the Less CLI to create your Less account. You'll be prompted to provide your `name`, `email`, and `password` followed by your email verification code.
<Tabs groupId="package-manager" queryString="package-manager">
  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli register
    ```
  </TabItem>
  <TabItem value="npm" label="npm">
    ```bash
    less-cli register
    ```
  </TabItem>
  <TabItem value="yarn" label="yarn">
    ```bash
    less-cli register
    ```
  </TabItem>
</Tabs>
```bash
Create your Less account
npx @chuva.io/less-cli register
? Enter your name: Amilcar Cabral
? Enter your email: amilcar.cabral@chuva.io
? Enter your password: *************
? Enter the verification code sent to your email: 0000
```

#### Sign in
Use the CLI to sign in.

After creating and verifying your account you should sign in in order to deploy your first project.
```bash
npx @chuva.io/less-cli login
# ? Enter your email: youremail@gmail.com
# ? Enter your password: *********
# [less-cli] Login successful! Your LESS_TOKEN has been exported to your environment.
```

Now that you have logged in, let's create our route and deploy.

## Deploy
In order to deploy your Less project simply `cd` into a directory with a `/less` folder and run the Less CLI `deploy` command.

<Tabs groupId="package-manager" queryString="package-manager">
  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli deploy getting-started-with-less
    ```
  </TabItem>
  <TabItem value="npm" label="npm">
    ```bash
    less-cli deploy getting-started-with-less
    ```
  </TabItem>
  <TabItem value="yarn" label="yarn">
    ```bash
    less-cli deploy getting-started-with-less
    ```
  </TabItem>
</Tabs>

```bash
[less-cli] Building... ⚙️
[less-cli] Build completed ✅
[less-cli] Deploying... 🚀
[less-cli] Deploy completed ✅
[less-cli] 🇨🇻
[less-cli] Resources
[less-cli]   - API URLs
[less-cli]     - demo: https://getting-started-with-less-my-demo-api.api.eu-0.f86h...2725.less.chuva.cv
```

In your deployment output you will find your https-secure API URL. Use `curl` or your favorite client to see it working.

```bash
curl https://YOUR_LESS_API.less.chuva.cv/hello
# Hello, world.%
```

Does it get any easier than that?

---

:::tip Learn more about building REST APIs in Less
Check out our [REST API documentation](/rest-apis) to learn how to add more features to your API or let the CLI guide you (`less-cli create route -h`).
:::

:::tip Learn how to add other Less features to your existing projects
Adding other Less features is just as easy. Learn how to add [Web Sockets](/web-sockets), [Topics/Subscribers (Pub/Sub)](/topics_subscribers), [CRON Jobs](/cron-jobs), [Key-Value Stores](/key-value-store), [File Storage](/file-storage), and more to your projects using Less.
:::
