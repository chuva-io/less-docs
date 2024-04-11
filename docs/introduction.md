---
sidebar_position: 1
slug: /
---

# Introduction

## What is Less?

Less automates the creation and deployment of serverless [Static Websites](/static-websites), [REST APIs](/rest-apis), [Web Sockets](/web-sockets), [Key-Value Store](/key-value-store), [Topics/Subscribers (Pub/Sub)](/topics_subscribers), [CRON Jobs](/cron-jobs), [Shared Code](/shared-modules), [Cloud Functions](/cloud-functions), [File Storage](/file-storage), and more based on your file structure. Just write your code and deploy using your favorite programming language. You won't even notice Less is there!

Less radically reduces software development costs, complexity, and time to develop and deploy. It allows you to build anything from the simplest to the most complex software systems in a fast, accessible, reliable, and scalable way using AWS serverless components (Google Cloud and Azure support coming soon).

Learn about the [history and origin of Less](/blog/2024/04/10/building-the-future-with-less).

---
<center>
_**Do more with Less.**_
</center>
---

Check out our [Implementing Microservices Workflows: Choreography Coordination Pattern Using Less](/blog/2024/03/27/implementing-microservices-workflows-choreography-coordination-pattern-using-less) article to learn how Less allows you to create all of the Cloud resources for the system below: 

![Placing Food Order using Choreography Coordination Pattern diagram from Waswani's article](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*-4Z5zq5FCaNeFmaG4jgxfg.jpeg)

by simply creating the following folder structure in your project:

```
─ less
  └─ apis
     └─ orders
        └─ orders
  └─ topics
     └─ order_placed
        └─ payment_service_process_payment
     └─ payment_success
        └─ restaurant_service_confirm_order
     └─ restaurant_confirmed_order
        └─ order_service_update_order_status
        └─ notification_service_notify_user
        └─ delivery_partner_service_assign_delivery_partner
        └─ loyalty_service_add_loyalty_points
     └─ delivery_partner_assigned
        └─ order_service_update_order_status
        └─ notification_service_notify_user
     └─ restaurant_order_confirmation_failed
        └─ order_service_update_order_status
        └─ notification_service_notify_user
        └─ payment_service_initiate_payment_reversal
     └─ payment_reversed
        └─ notification_service_notify_user
```
---
## Benefits of Using Less

_**Automatic Cloud Infrastructure from Code.**_  
Think of Less as an IaC or Terraform generator. Less inspects your file structure and properly provisions and deploys your code and cloud infrastructure for you without you ever having to deal with cloud providers, containers, or DevOps.

_**Almost No Learning Curve.**_  
Less uses essentially the same code you are already accustomed to. If you can write JavaScript, Python, Go, or Rust you already know how to build and deploy infinitely scalable, serverless, distributed systems, fault-tolerant systems using Less.

_**Support for Multiple Programming Languages.**_  
Write your code in Javascript or Python (Go and Rust support coming soon) using  the tools, packages, and frameworks you love the most.

---
<center>
_**No more DevOps. No more infrastructure. No more Cloud.**_
</center>
---

_**Enhance your Existing Projects with Less.**_  
Create a new project using Less or use one feature at a time in an existing project. All you need is a `/less` folder to get started.

_**Built in Key-Value Store and File Storage.**_  
Automatic provisioning of a key-value store and cloud file storage with each deployment with managed databases coming soon.

_**Easily Create Event-Driven Microservices.**_  
Less gives you fault tolerant topics and processors (pub/sub) with guaranteed message delivery and processing. You can subscribe to messages across services and even publish messages using our API. It doesn’t get easier than this.

_**Use More Than One Language in the Same Project.**_  
Less lets you use the best language, framework, and tools for whatever task you’re faced with. Publish a message to a topic using Javascript and process it in Python. Mix it up as you see fit.

---
<center>
_**Less inspects your `/less` directory and provisions and deploys your Cloud resources for you.**_
</center>
---

_**Call Functions Across Different Programming Languages.**_    
Can you imagine using a Javascript package in Python or getting Python's numeric precision and threading capabilities in Javascript? Less makes this possible by allowing you to call functions between different programming languages.

_**Automated Best Practices.**_  
Less follows cloud and security best practices automatically and by default.

_**No Lock-In.**_  
You can stop using Less just as easily as you started since it's essentially the same code you're already used to writing.

---

## Press Coverage

- [Forbes | Cape Verde startups are looking for strategic partners at Web Summit](https://www.forbesafricalusofona.com/start-ups-de-cabo-verde-buscam-parceiros-estrategicos-na-web-summit/)

- [Startup.cv | Our goal is to show that Cape Verde is capable of developing a useful product for other countries in the world](https://startup.cv/news/our-goal-is-to-show-that-cape-verde-is-capable-of-developing-a-useful-product-for-other-countries-in-the-world-say-mentors-from-startup-chuva/gAPYyD0PvJ)

- [CaboWork | Web Summit 2023: Exclusive interview with Chuva, a prominent Cape Verdean startup](https://cabowork.com/pt-pt/web-summit-2023-chuva-startup-cabo-verde/)

- [Expresso das Ilhas | Cabo Verde wants to make strides in technological development at a global level](https://expressodasilhas.cv/empresas-negocios/2023/11/02/cabo-verde-quer-dar-cartas-no-desenvolvimento-tecnologico-a-nivel-mundial/88452)

- [A Nação | Web Summit Lisbon 2023: Cape Verdean company Chuva represents the country as Alpha Startup](https://www.anacao.cv/noticia/2023/11/08/web-summit-lisboa-2023-empresa-cabo-verdiana-chuva-representa-o-pais-como-alpha-startup/)

- [Notícias do Norte | Portugal: Chuva is the only Cape Verdean startup in the Alpha category of Web Summit](https://noticiasdonorte.publ.cv/7535/portugal-chuva-e-a-unica-startup-cabo-verdiana-na-categoria-alpha-da-web-summit/)

- [Cabo Verde Digital | Less: The tool that promises to revolutionize the software development cycle](https://www.digital.cv/blog/less-a-ferramenta-que-promete-revolucionar-o-ciclo-de-desenvolvimento-de-software)

---

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

---

## Pricing

### Individual plans
- $15 per 100 resources per month (first 25 free)
- $3 per static website per month (first site free)
- No API Keys
- Community Slack support
- Concurrent builds

### Organizational plans
- $25 per user per month
  - Unlimited users
  - First 3 users free
- $15 per 100 resources per month (first 25 free)
- $3 per static website per month (first site free)
- API Keys
  - Deploy Less Apps from your CI/CD server
  - Publish Messages to Topics via API
  - Execute Cloud functions via API
- User roles and permissions
- Private Slack support

### All Plans
All Less plans give you the best Less has to offer:
- Automatic infrastructure provisioning
- 30 day log retention
- Millisecond-latency function start time
- Support for Node.js and Python (Go and Rust coming soon)
- Automatic function scaling
- Less CLI
- IAM management
- Automatic management of AWS account
- Unlimited apps
- Unlimited environments
- Unlimited concurrent builds/deployments
- Unlimited Functions
- Unlimited Topics
- Unlimited Topic Processors
- Unlimited REST APIs
- Unlimited Web Sockets
- Unlimited Static Websites
- Unlimited CRON Jobs
- Unlimited Key Value Store storage
- Unlimited File storage
- Unlimited Function scaling

#### Pay for Your Usage
| Resource Used                 | Pricing                                     |
|-------------------------------|---------------------------------------------|
| KVS Stream                    | $0.03 per 100,000 streams                   |
| File Storage                  | $0.03 per GB per month                      |
| KVS Storage                   | $0.3 per GB per month                       |
| KVS Write request             | $1.5 per million requests (1KB increments)  |
| KVS Read request              | $0.3 per million requests (4KB increments)  |
| API Requests                  | $4 per million requests                     |
| Web Socket Requests           | $1.2 per million requests                   |
| Web Socket Connection Minutes | $0.3 per million connection minutes         |
| Topic Messages received       | $0.6 per million requests (64KB increments) |
| Compute Duration              | $0.00002 per GB-second                      |
| Compute Requests              | $0.3 per million requests                   |

---

## Future Roadmap
- Self-hosting
- SLA agreements
- SAML/SSO
- DDoS protection
- Web Application Firewall (WAF)
- Distributed tracing
- Secrets manager
- Google Cloud support
- Rust, Go, and Typescript support
- Dashboard and Metrics
- Monitoring
- Region selection
- Managed Postgres database
- Managed MongoDB database
- Long-running tasks
- REST API documentation generation
- Local development environment
- GitHub integration
