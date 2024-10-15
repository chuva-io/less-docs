---
sidebar_position: 16
slug: /faq
---

# FAQ

## Who Less is for and how to get started.

<details>
  <summary>Who is Less best suited for?</summary>
  
  Less automates Cloud infrastructure setup and deployment, meaning you don't need any DevOps experience. It's well-suited for both novice and experienced developers who want to streamline developing and deploying scalable, event-driven microservices, REST APIs, static websites, and more. Visit the [Less Documentation](/) to see all of the features Less has to offer.
</details>


<details>
  <summary>How can I start using Less?</summary>
  
  To start using Less, [create your account](/sign-in-sign-up) and [follow the quick start guide](/quick-start), which provides step-by-step instructions for setting up and deploying your first project. Additionally, you can [explore the documentation](/), which includes [tutorials and examples](/tutorials) to help you become familiar with its features quickly.
</details>


<details>
  <summary>How is Less useful to individuals and teams that already have DevOps and Cloud experience?</summary>
  
Less takes the burden off of DevOps teams by enabling developers to deploy their application code and infrastructure without DevOps support or experience. Although this is great in most cases, for specific use cases where more control is needed—such as custom VPC configurations, fine-tuning resource properties, or integrating with third-party services not directly supported by Less—DevOps teams can use their expertise to extend or customize the infrastructure that Less has provisioned in your AWS account.
</details>


<details>
  <summary>What types of applications does Less best support?</summary>
  
  Less is particularly well-suited for building REST APIs, WebSockets, microservices, and other event-driven applications that require rapid scaling and fault tolerance. For those of you that understand a bit more about cloud services, Less uses Lambda Functions and other serverless technologies under the hood so it's best suited for use-cases where serverless excels.
</details>


<details>
  <summary>What types of applications are not suitable for Less?</summary>
  
  Less currently does not support deploying applications to containers so if you need the benefits that container-based applications provide, such as highly provisioned or specialized hardware or long-running tasks, you might want to check back later. We'll make deploying containers easy for you soon!
</details>

## What Less is like for developers.

<details>
  <summary>Which programming languages does Less support?</summary>
  
  Less supports JavaScript and Python with support for Rust, Go, C#, Java, and Swift coming soon. Less even supports multiple languages in the same project and allows you to call functions between different languages giving you ultimate flexibility! 
</details>


<details>
  <summary>How does Less integrate with other services and tools?</summary>
  
  Less is essentially just code so you can use the tools, frameworks, packages, and dependencies you enjoy the most.
</details>


<details>
  <summary>How does version control work with Less?</summary>
  
  Less provisions your infrastructure and deploys your code based on your file structure and code so you can just version your code as you normally do. Ask Less to deploy and it handles the rest. Need to roll back changes? Just checkout an older version of your code and deploy again.
</details>


<details>
  <summary>Does Less offer an offline developer experience?</summary>
  
  The slow feedback loop when developing cloud and serverless applications and services provides a poor developer experience that tools like [LocalStack](https://www.localstack.cloud) try to improve. The team behind Less will be releasing an offline development tool very soon that works seamlessly with Less. It's the best serverless development experience we've ever had!
</details>

## How Less deals with deployments and infrastructure.

<details>
  <summary>Where does Less deploy my code?</summary>
  
  When you create a Less account we create an isolated AWS account for you under the hood. Less manages this account for you and deploys your code and infrastructure to it.
</details>


<details>
  <summary>Can I access the Less-managed AWS account directly?</summary>
  
  We will be providing direct, read-only access to your Less-managed AWS account within the next few days. Stay tuned.
</details>


<details>
  <summary>Can I deploy Less to my own AWS account?</summary>
  
  Once we come out of Beta you will be able to provide your AWS keys to Less in order for Less to deploy directly to your AWS account, giving you full control over your resources.
</details>


<details>
  <summary>How is Less different from tools like Heroku and Vercel?</summary>
  
  Tools like Heroku and Vercel do not provide the level of scale or customization that Less provides. Like Less, they provide simplicity up-front but are less suited for complex, large-scale, and custom applications and services. Less is arguably easier to use up front and grows with you to the most complex use-cases.
</details>


<details>
  <summary>How is Less different from IaC tools like Terraform, Pulumi, and SST?</summary>
  
Less abstracts the complexities associated with infrastructure as code tools like Terraform, Pulumi, and SST, providing a higher-level interface that automates many setup and configuration tasks. This abstraction eliminates the need for in-depth knowledge of cloud infrastructure, allowing teams to deploy applications more quickly and easily. For cases where you need capabilities not provided by Less, you can extend or customize it using Infrastructure as Code tools.
</details>


<details>
  <summary>How can I migrate away from Less?</summary>
  
  Less is just code and most of it is not Less-specific (unless you're using the SDK), so it's super easy to migrate away from it. Since the main benefit of using Less is that it automates the creation of your cloud infrastructure and deploying your code, you will need to add this DevOps layer yourself.
</details>

## Less support, billing, and roadmap.

<details>
  <summary>When will Less be coming out of Beta?</summary>
  
  Less is very mature and stable and has been used in production for almost 2 years by our team at Chuva as well as our clients and partners. We have never had a production issue. We are finalizing our terms and conditions, pricing model, and team and organization management and will consider that our production v1.0! We'll be done by the end of 2024!
</details>


<details>
  <summary>Can the team behind Less help me with onboarding?</summary>
  
  Yes, Chuva, the team behind Less started as software development agency and has transitioned focus to the development of Less. We would be more than happy to support you with Less! Feel free to [schedule to meet with our software development and cloud experts here](https://calendly.com/chuva-nilson/less-onboarding-and-support).
</details>


<details>
  <summary>What is the pricing model for Less?</summary>
  
  Less will operate on a subscription model, charging based on the number of users and the managed resources. We will also offer a generous free tier.
</details>


<details>
  <summary>How does Less charge for AWS usage?</summary>
  
  AWS usage is charged based on the actual resources consumed such as compute time, storage, and data transfer, in addition to the subscription fee. This approach ensures that users only pay for what they use, making it cost-effective for teams with variable workloads.
</details>


<details>
  <summary>How can I reach out for more information and support or suggestions?</summary>
  
  You can reach out to our team for more information or support or to provide suggestions through any of the following methods:
  - Email our team at [business@chuva.io](mailto:business@chuva.io?subject=Less%20Onboarding%20and%20Support)
  - [Join us on Slack](https://join.slack.com/t/less-ifc/shared_invite/zt-262dn4f8n-8kmibqnqj1T_x0jl_AR4ow)
  - [Schedule a video conference](https://calendly.com/chuva-nilson/less-onboarding-and-support)
</details>
