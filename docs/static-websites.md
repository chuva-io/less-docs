---
sidebar_position: 3
tags: ['jamstack']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Static Websites

With Less, getting static websites to your global audience is easier than ever. Just add your site content to the `less/statics/` directory and deploy!

```
─ less
  └─ statics
    └─ demo-website
    └─ developer-documentation-website
```

Less will create a unique URL for each of your websites.

## Create your static website directory
Less can deploy several static websites in the same project. Just add your static site contents to the `/less/statics/` folder and deploy. 

```bash
mkdir -p less/statics/demo-website
```

## Create your site content
<Tabs>
  
  <TabItem value="html" label="HTML">
    ```bash
    touch less/statics/demo-website/index.html
    ```
    
    ```html title="less/statics/demo-website/index.html"
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" type="text/css" href="styles.css">
    </head>
    <body>
      <h1>Hello World!</h1>
      <script src="script.js"></script>
    </body>
    </html>
    ```
  </TabItem>

  <TabItem value="css" label="CSS">
    ```bash
    touch less/statics/demo-website/styles.css
    ```
    
    ```css title="less/statics/demo-website/styles.css"
    body {
      font-family: Arial, sans-serif;
      text-align: center;
    }
    ```
  </TabItem>

  <TabItem value="js" label="Javascript">
    ```bash
    touch less/statics/demo-website/script.js
    ```
    
    ```js title="less/statics/demo-website/script.js"
    // Log a message to the console when the page is loaded
    window.onload = function() {
      console.log("Hello World!");
    };
    ```
  </TabItem>
  
</Tabs>

## Deploy

