---
sidebar_position: 1
slug: /
title: Introduction
description: Less automates the creation, management, and deployment of your Cloud infrastructure so you can forget words like Cloud, DevOps, AWS, and infrastructure exist.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# What Cloud? 🤔

---
<center>
_**Less automates the creation, management, and deployment of your Cloud infrastructure so you can forget words like Cloud, DevOps, AWS, and infrastructure exist.**_
</center>
---
  
<details>
  <summary>🫥 Some tasks you just don't want or need to do yourself.</summary>
  
  In most cases, your Cloud Infrastructure is a time-consuming, complex, error-prone task that brings no differentiation to your business. What if you didn't need to deal with it?
</details>


<details>
  <summary>🤖 Now, you can do less of them because Less takes care of them for you.</summary>
  
  Less takes an extraordinary cost and burden off of your hands by automating the provisioning, configuration, and scaling of your cloud infrastructure. In many cases you can completely forget the cloud exists!
</details>


<details>
  <summary>🧐 There are still some tasks that require your attention.</summary>
  
  While Less automates much of the cloud infrastructure setup for you, there are still some cases where you need more control—such as custom network configurations, fine-tuning resource properties, or connecting cloud services in ways unique to your use-cases.
</details>


<details>
  <summary>🚀 Less can make those easier too.</summary>
  
  Less gives you absolute control over your cloud resources when you need it, allowing DevOps teams to customize the Less infrastructure, connect it to existing systems, or free up their time to work on other projects.
</details>

---
<center>
_**Less gives you simplicity when you want it and**_

_**control when you need it.**_
</center>
---

## What is Less?

Less is an Infrastructure from Code tool that automates the creation and deployment of serverless [Static Websites](/static-websites), [REST APIs](/rest-apis), [Web Sockets](/web-sockets), [Key-Value Stores](/key-value-store), [Topics and Subscribers (Pub Sub)](/topics_subscribers), [CRON Jobs](/cron-jobs), [Cloud Functions](/cloud-functions), [File Storage](/file-storage), and more based on your file structure.


### Language Support
Just write your code and deploy using your favorite programming language. Even use more than one language in the same project. You won't even notice Less is there!
<center>
  <Icon icon="devicon:nodejs-wordmark" height="60" />
  <Icon icon="devicon:python" height="60" />
</center>
---
<center>
  <Icon icon="devicon:rust" height="60" />
  <Icon icon="devicon:go" height="60" />
  <Icon icon="logos:c-sharp" height="60" />
  <Icon icon="devicon:java" height="60" />
  <Icon icon="logos:ruby" height="60" />
  <Icon icon="logos:swift" height="60" />
_(coming soon)_
</center>

<details>
  <summary>👨🏾‍💻 See how simple Less is with some code examples.</summary>

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
  **Create a `GET /hello` route.**
  ```js title="less/apis/demo/hello/get.js" showLineNumbers
  exports.process = async (request, response) => {
    response.body = 'Hello, world.';
    response.status_code = 200;
    return response;
  };
  ```

  **Subscribe to a `user_created` event and send a welcome email.**
  ```js title="less/topics/user_created/send_welcome_email/index.js" showLineNumbers
    exports.process = async (user) => {
      console.log(`Sending a welcome email to ${user.email}`);
    };
    ```
  </TabItem>

  <TabItem value="py" label="Python">
  **Create a `GET /hello` route.**
  ```py title="less/apis/demo/hello/get.py" showLineNumbers
  def process(request, response):
    response['body'] = 'Hello, world.'
    response['statusCode'] = 200
    return response
  ```

  **Subscribe to a `user_created` event and send a welcome email.**
  ```py title="less/topics/user_created/send_welcome_email/__init__.py" showLineNumbers
    def process(user):
      print(f"Sending a welcome email to {user['email']}")
    ```
  </TabItem>
  
  </Tabs>

:::tip You can deploy the examples above with the Less CLI

```bash
less-cli deploy my-first-project-production
```
:::
</details>

### Cloud Providers
Less can deploy your code to your Less-managed, sandboxed cloud account or you can connect Less to your existing cloud provider.

<center>
  <Icon icon="logos:aws" height="60" />
</center>
---
<center>
  <Icon icon="devicon:googlecloud" height="60" />
  <Icon icon="devicon:azure" height="60" />
_(coming soon)_
</center>

### Extend Less with IaC
Take full control by connecting Less to your Infrastructure as Code tools. Extend or customize your Less infrastructure as you see fit. There are no limits.

<center>
  <div>
    <Icon icon="logos:terraform" height="60" />
  </div>
  <div>
    <Icon icon="logos:pulumi" height="60" />
  </div>
  <div>
    <Icon icon="logos:sst" height="60" />
  </div>
  _(and more)_
</center>

---
<center>
_**Do more with Less.**_
</center>
---

## Blessings of Using Less

_**Automate your meaningless cloud infrastructure.**_  
Less inspects your file structure and properly provisions and deploys your code and cloud infrastructure for you without you ever having to deal with cloud providers, containers, or DevOps.

_**Get started effortlessly.**_  
Less uses essentially the same code you are already accustomed to. If you can write code, you already know how to build and deploy infinitely scalable, serverless, distributed, fault-tolerant systems to the cloud. Just add your code to a `/less` folder to get started.

_**Limitless possibilities.**_
Take full control by connecting Less to your IaC tools like Terraform, CloudFormation, and Pulumi directly in your cloud account. There are no limits!

:::tip With Less you can write 97% less code than with Terraform
Article: [Creating Serverless REST APIs: Less vs. Terraform](/blog/2024/04/05/creating-rest-apis-less-vs-terraform)
:::

---
<center>
_**No more DevOps. No more infrastructure. No more Cloud.**_
</center>
---

_**Enhance your Existing Projects with Less.**_  
Create a new project using Less or add one feature at a time to an existing project. 

_**Built in Key-Value Store and File Storage.**_  
Automatic provisioning of a low latency key-value store and cloud file storage with each deployment.

_**Fearlessly Create Event-Driven Microservices.**_  
Less gives you fault tolerant topics and processors (pub/sub) with guaranteed message delivery and processing. Connect your services by subscribing to topics from different deployments. It doesn’t get easier than this.


:::tip Use Less to create complex, fault tolerant, event-driven microservices with no DevOps

Article: [Implementing Microservices Workflows: Choreography Coordination Pattern Using Less](/blog/2024/03/27/implementing-microservices-workflows-choreography-coordination-pattern-using-less)

![Placing Food Order using Choreography Coordination Pattern diagram from Waswani's article](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*-4Z5zq5FCaNeFmaG4jgxfg.jpeg)
:::


## Features

<table>

  <tr>
    <th rowspan="2">File storage</th>
    <td>Automatic scale.</td>
  </tr>
  <tr>
    <td>Pre-sign URLs for file upload.</td>
  </tr>

  <tr>
    <th rowspan="2">Cloud Functions</th>
    <td>Bridge between programming languages.</td>
  </tr>
  <tr>
    <td>Execute Functions via API.</td>
  </tr>

  <tr>
    <th rowspan="2">REST APIs</th>
    <td>Secure with HTTPS.</td>
  </tr>
  <tr>
    <td>Custom Domains.</td>
  </tr>

  <tr>
    <th rowspan="10">Topics (Publishers/Subscribers)</th>
    <td>At least once message delivery guarantee.</td>
  </tr>
  <tr>
    <td>4 day retention of failed messages.</td>
  </tr>
  <tr>
    <td>Auto-retry failed messages.</td>
  </tr>
  <tr>
    <td>Subscribe to Topics from different applications (event-driven microservices).</td>
  </tr>
  <tr>
    <td>Publish messages to Topics via API.</td>
  </tr>
  <tr>
    <td>~10 ms to publish and receive messages.</td>
  </tr>
  <tr>
    <td>Unlimited messages.</td>
  </tr>
  <tr>
    <td>Unlimited message throughput.</td>
  </tr>
  <tr>
    <td>256KB per message.</td>
  </tr>
  <tr>
    <td>Message encryption at-rest and in-flight.</td>
  </tr>

  <tr>
    <th rowspan="3">Web Sockets</th>
    <td>Secure with WSS.</td>
  </tr>
  <tr>
    <td>Unlimited concurrent connections.</td>
  </tr>
  <tr>
    <td>32KB per message.</td>
  </tr>

  <tr>
    <th rowspan="9">Key-Value Store</th>
    <td>Stream changes.</td>
  </tr>
  <tr>
    <td>Single-digit millisecond performance.</td>
  </tr>
  <tr>
    <td>Unlimited throughput.</td>
  </tr>
  <tr>
    <td>Unlimited storage.</td>
  </tr>
  <tr>
    <td>Automatic multi-region replication.</td>
  </tr>
  <tr>
    <td>Highly available.</td>
  </tr>
  <tr>
    <td>Encryption at rest.</td>
  </tr>
  <tr>
    <td>Up to 400KB per item.</td>
  </tr>
  <tr>
    <td>Automatic scale.</td>
  </tr>

  <tr>
    <th rowspan="4">Static Websites</th>
    <td>Secure with HTTPS.</td>
  </tr>
  <tr>
    <td>Custom Domains.</td>
  </tr>
  <tr>
    <td>Global CDN.</td>
  </tr>
  <tr>
    <td>Automatic global cache invalidation on update.</td>
  </tr>
  
</table>

## FAQ

[Visit our FAQ page](/faq) if you need more information before [getting started](/quick-start).
