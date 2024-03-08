---
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Shared Modules

In Less, all of your functions (API routes, Web Socket channels & connection handlers, Topic Subscribers, CRON jobs, and Functions) are isolated serverless functions. This means that you cannot import code between functions. 

Less solves this by allowing you to create shared modules. The only change in your code is where you import from.

## Creating Shared Module
In order to share code between your Less functions, add your modules to the `shared` folder.
```bash
mkdir -p less/shared
```

Here's an example of shared Models that we can use in our functions:
```bash
mkdir less/shared/models
```

With Less you can organize your modules as you normally would.

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```bash
    ─ less
      └─ shared
        └─ models
            └─ index.js
            └─ User
              └─ index.js
              └─ create
                  └─ index.js
                  └─ schema.js
    ```
  </TabItem>
  
</Tabs>

## Importing Shared Modules

Here's how you would import the example Model above:

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```js showLineNumbers title="less/apis/demo/hello/get.js"
    const { User } = require('models');
    ```
  </TabItem>
  
</Tabs>
