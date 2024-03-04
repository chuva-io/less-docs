---
sidebar_position: 1
slug: /
---

# Introduction

Less automates the creation and deployment of serverless [Static Websites](/static-websites), [REST APIs](/rest-apis), [Web Sockets](/web-sockets), [Key-Value Store](/key-value-store), [Pub/Sub](/fanout), [CRON Jobs](/cron-jobs), [Shared Code](/shared-code) and [Cross Language Functions](/cross-language-functions) based on your file structure. Just write your code and deploy using your favorite programming language. 

---

Less inspects your `/less` directory and **provisions your serverless AWS resources for you**.

```
─ less
  └─ statics
  └─ apis
  └─ sockets
  └─ topics
  └─ external_topics
  └─ crons
  └─ shared
  └─ functions
```

:::tip
You can even drop a `/less` folder in an existing project and deploy. You'll barely notice Less is there!
:::

In this documentation you'll find everything you need to create and deploy each of these Less resources.

## Supported Languages
Less fully supports Node.js and Python. You can even use both in the same project!
<Icon icon="logos:nodejs" height="100" />
<Icon icon="logos:python" height="100" />

### Coming Soon
Go, Rust, C#, and more coming soon...
<Icon icon="logos:gopher" height="100" />
<Icon icon="logos:rust" height="100" />
<Icon icon="logos:c-sharp" height="100" />
