---
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Shared Code

In Less, all of your functions are isolated serverless functions. This means that you cannot import code from folders outside of your function's directory.

## Creating Shared Modules

In order to share code between your Less functions you can add your modules to the `shared` folder.

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

  <TabItem value="py" label="Python">
    ```bash
    ─ less
      └─ shared
        └─ models
            └─ __init__.py
            └─ User
              └─ __init__.py
              └─ create
                  └─ __init__.py
                  └─ schema.py
    ```
  </TabItem>
  
</Tabs>

## Importing Shared Modules

Here's an example of importing the example Model above:

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```js showLineNumbers title="less/apis/demo/hello/get.js"
    const { User } = require('models');
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```py showLineNumbers title="less/apis/demo/hello/get.py"
    from models import User
    ```
  </TabItem>
  
</Tabs>
