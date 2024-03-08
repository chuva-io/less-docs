---
sidebar_position: 4
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

:::tip
You can easily migrate your React app or any other static site by simply adding the site content to the /less/statics directory. Here's an example of building a React app for Less:
```bash
BUILD_PATH='less/statics/demo-website' react-scripts build
```
:::

## Deploy your static website

In order to deploy your static content, execute `less-cli deploy --static` with your application name.

<Tabs groupId="package-manager" queryString="package-manager">

  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli deploy --static my-less-project
    ```
  </TabItem>

  <TabItem value="npm" label="npm">
    ```bash
    npm i -g @chuva.io/less-cli
    less-cli deploy --static my-less-project
  ```
  </TabItem>

  <TabItem value="yarn" label="yarn">
    ```bash
    yarn global add @chuva.io/less-cli
    less-cli deploy --static my-less-project
    ```
  </TabItem>

</Tabs>

Once the deployment is complete you will be able to find your website URL under *Resources* in the output:
```bash
[less-cli] Deployment complete ✅
[less-cli] Resources
[less-cli] - Websites URLs
[less-cli]   - http://[PROJECT_NAME]-[WEBSITE_NAME]-143286079.s3-website-eu-west-1.amazonaws.com
[less-cli] 🇨🇻
```


## Custom Domain
Less also allows you to configure your DNS settings in order to use a custom domain with your static websites. Use the following command to get new NS records for your custom domain:
```bash
npx @chuva.io/less-cli domains --project-name PROJECT_NAME --static-name STATIC_NAME --custom-domain CUSTOM_DOMAIN
```

For example, if we want to use a custom domain `demo-website.com` for the `demo-website` website in our `my-less-project` application, we can use the following command:
```bash
npx @chuva.io/less-cli domains --project-name my-less-project --static-name demo-website --custom-domain demo-website.com
```

Resulting in the following example output:
```bash
[less-cli] Connecting to the Less Server...
[less-cli] NS Records
┌─────────┬──────┬────────────────────────────────────┬───────────────────────────┐
│ (index) │ type │                name                │           value           │
├─────────┼──────┼────────────────────────────────────┼───────────────────────────┤
│    0    │ 'NS' │ 'demo-website.com'                 │ 'ns-000.exampledns.org'   │
│    1    │ 'NS' │ 'demo-website.com'                 │ 'ns-000.exampledns.net'   │
│    2    │ 'NS' │ 'demo-website.com'                 │ 'ns-000.exampledns.co.uk' │
│    3    │ 'NS' │ 'demo-website.com'                 │ 'ns-000.exampledns.com'   │
└─────────┴──────┴────────────────────────────────────┴───────────────────────────┘
```
Add the NS records to your DNS provider and wait for the DNS to propagate.

:::info
Most DNS updates take effect within an hour, but could take up to 48 hours to update globally.
:::

:::info Less Static Websites Documentation
Read the [Less static websites documentation](/static-websites) to learn more.
:::
