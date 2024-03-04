---
sidebar_position: 11
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Cloud Functions

Less allows you to easily create and deploy serverless functions with infinite scale.

## Creating Cloud Functions
Simply create a folder named `functions` in the `less` directory and add your functions to it:
```bash
mkdir -p less/functions
```

Here's an example of a `sum` function that adds 2 numbers:
```bash
mkdir less/functions/sum
```

<Tabs>
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/functions/sum/index.js
    ```
    
    ```js title="less/functions/sum/index.js" showLineNumbers
    exports.process = ({ a, b }) => {
      return a + b;
    }
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```bash
    touch less/functions/sum/__init__.py
    ```

    ```py title="less/functions/sum/__init__.py" showLineNumbers
    def process(data):
      return data.get('a') + data.get('b')
    ```
  </TabItem>
  
</Tabs>

## Calling Cloud Functions
Less offers 2 ways to call cloud functions:
1. Using the `functions` module in the Less SDK.
2. Using the Less Functions REST API.

### Send Messages Using the SDK
<Tabs>
  <TabItem value="nodejs" label="Node.js">
    Import `functions` from `@chuva.io/less` to call the cloud function. The function payloads are JSON objects.
    ```js showLineNumbers
    const { functions } = require('@chuva.io/less');

    const sum_result = await functions.sum({ a: 3, b: 4 });
    console.log('Result: ', sum_result);
    // Result: 7
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    Import `functions` from `less` to call the function and process your payload in order to retrieve the response.
    
    ```py showLineNumbers
    from less import functions

    sum_result = functions.sum({ 'first_number': 3, 'second_number': 4 })

    print('Result:', sum_result)
    # Result: 7
    ```
  </TabItem>
  
</Tabs>

---

Let's create a `GET /sum` route that will return the sum of 2 numbers using our `sum` cloud function.
<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
  ```bash
  touch less/apis/demo/sum/get.js
  ```
  
  ```js {1,8} title="less/apis/demo/sum/get.js" showLineNumbers
  const { functions } = require('@chuva.io/less');

  exports.process = async (request, response) => {
    // Get the values to add from the query parameters.
    const { a, b } = request.query;

    // Call the cloud function.
    const sum_result = await functions.sum({ a, b });
    response.body = `The sum is: ${sum_result}`
    return response;
  };
  ```
  </TabItem>

  <TabItem value="py" label="Python">
  ```bash
  touch less/apis/demo/sum/get.py
  ```

  ```py title="less/apis/demo/sum/get.py" showLineNumbers
  def process(request, response):
      pass
  ```
  </TabItem>

</Tabs>

:::info Less REST API Documentation
Read the [Less REST API documentation](/rest-apis) to learn more.
:::

You can now deploy and call your `GET /sum` route to test your `sum` cloud function:

1. Deploy your changes.
<Tabs groupId="package-manager" queryString="package-manager">

  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli deploy my-less-project
    ```
  </TabItem>

  <TabItem value="npm" label="npm">
    ```bash
    less-cli deploy my-less-project
    ```
  </TabItem>

  <TabItem value="yarn" label="yarn">
    ```bash
    less-cli deploy my-less-project
    ```
  </TabItem>

</Tabs>

2. Execute your `GET /sum` request.
```bash
curl [FUNCTIONS_URL]/sum?a=1&b=2
# The sum is: 3
```

### Send Messages Using the REST API
When using the Cloud Functions feature, Less automatically creates a Functions REST API for you. You can use the API to call cloud functions from anywhere, making it easier to integrate Less with your existing systems.

1. Deploy your function.
<Tabs groupId="package-manager" queryString="package-manager">

  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli deploy my-less-project
    ```
  </TabItem>

  <TabItem value="npm" label="npm">
    ```bash
    less-cli deploy my-less-project
    ```
  </TabItem>

  <TabItem value="yarn" label="yarn">
    ```bash
    less-cli deploy my-less-project
    ```
  </TabItem>

</Tabs>

2. Retrieve your Functions API URL from your deployment output:
```
[less-cli] Deployment complete ✅
[less-cli] Resources
[less-cli]   - API URLs
[less-cli]     - Functions: https://[PROJECT_NAME]-functions.api.eu-0.a83b464c9.less.chuva.cv
[less-cli] 🇨🇻
```

3. Send a message to your `sum` function using the `POST /functions/{function_name}` route.
```bash
curl -X POST -d '{"a": 1, "b": 2}' [FUNCTIONS_BASE_URL]/functions/user_created
# 3
```

## Tips & Use-Cases

:::tip Tip 0: Allow interoperability between different programming languages
- E.g. Create a Cloud Function in Python and call it in Javascript.
- E.g. Get Python math precision in Javascript code.
:::

:::tip Tip 1: Share SDKs and libraries between different languages
- E.g. Wrap your ORMs in Cloud Functions to query your database from anywhere.
- E.g. Export [Faker.js](https://fakerjs.dev) functions and use them in Python.
- E.g. Wrap your [Shared Modules](/shared-modules) functions in Cloud Functions to make your code accessibile from anywhere.
:::

:::tip Tip 2: Call your Cloud Functions outside of Less using the [Functions REST API](http://localhost:3000/cloud-functions#send-messages-using-the-rest-api)
:::
