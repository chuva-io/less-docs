---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# REST APIs

In order to create your REST APIs just add an `apis/` folder to your `less/` folder. 

```bash
mkdir less/apis
```

Let's create a `demo` API. We will use it to configure our routes.

```bash
mkdir less/apis/demo
```

:::tip Create multiple REST APIs
Each folder at the root of `less/apis/` will be deployed as a separate API and will have a separate base URL.
:::

## Creating API Routes

The API's route paths mirror the relative path for your project files.

Let's create a `/hello` route in the Demo API.
```bash
mkdir less/apis/demo/hello
```

### HTTP Verbs
In order to process requests, create your handler functions inside of the route's folder. The handler name is the HTTP verb plus the file type.

#### GET /hello
Let's create a `GET /hello` route that returns *"Hello, world."* in the response body with a 200 code.
<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
  ```bash
  touch less/apis/demo/hello/get.js
  ```
  
  ```js title="less/apis/demo/hello/get.js" showLineNumbers
  exports.process = async (request, response) => {
    response.body = 'Hello, world.';
    return response;
  };
  ```
  </TabItem>

  <TabItem value="py" label="Python">
  ```bash
  touch less/apis/demo/hello/get.py
  ```

  ```py title="less/apis/demo/hello/get.py" showLineNumbers
  def process(request, response):
    response['body'] = 'Hello, world.'
    return response
  ```
  </TabItem>
  
</Tabs>

#### POST /hello
Let's create a `POST /hello` route. We will accept a `name` in the body and return *"Hello, \{name\}."* in the response body with a 201 code.
<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
  ```bash
  touch less/apis/demo/hello/post.js
  ```
  
  ```js title="less/apis/demo/hello/post.js" showLineNumbers
  exports.process = async (request, response) => {
    const request_data = JSON.parse(request.body);
    const name = request_data.name;
    response.body = 'Hello, ' + name + '.';
    response.statusCode = 201;
    return response;
  };
  ```
  </TabItem>

  <TabItem value="py" label="Python">
  ```bash
  touch less/apis/demo/hello/post.py
  ```

  ```py title="less/apis/demo/hello/post.py" showLineNumbers
  import json

  def process(request, response):
    body = json.loads(request['body'])
    name = body['name']
    response['body'] = f"Hello, {name}."
    response['statusCode'] = 201
    return response
  ```
  </TabItem>

</Tabs>

:::tip
`PUT`, `PATCH`, and `DELETE` requests work the same way. Just add a file with the folder name to the route directory.
:::

### API Dynamic Paths

In cases where you would like to have a dynamic path just wrap your folder name in `{}`.

#### GET /hello/\{name\}
Let's create a `GET /hello/{name}` and say *"Hello"* to the `name` provided in the route path:
```bash
mkdir less/apis/demo/hello/{name}
```

<Tabs groupId="programming-language" queryString="programming-language">

  <TabItem value="nodejs" label="Node.js">
  ```bash
  touch less/apis/demo/hello/{name}/get.js
  ```

  Here's how we can access the value of `name` from the route path:

  ```js {2} title="less/apis/demo/hello/{name}/get.js" showLineNumbers
  exports.process = async (request, response) => {
    const { name } = request.params; 
    response.body = 'Hello, ' + name + '.';
    return response;
  };
  ```
  </TabItem>

  <TabItem value="py" label="Python">
  ```bash
  touch less/apis/demo/hello/{name}/get.py
  ```

  Here's how we can access the value of `name` from the route path:
  ```py {2} title="less/apis/demo/hello/{name}/get.py" showLineNumbers
  def process(request, response):
    name = request['params']['name']
    response['body'] = f"Hello, {name}."
    return response
  ```
  </TabItem>
  
</Tabs>

:::note
We now have a Demo API with 3 routes:
- `GET /hello`
- `POST /hello`
- `GET /hello/{name}`
:::

## HTTP Request/Response Properties

### Status Code
You can optionally set the response HTTP status code through the `statusCode` property. The default value is `200`.

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
  ```js {2} title="less/apis/demo/hello/post.js" showLineNumbers
  exports.process = async (request, response) => {
    response.statusCode = 204;
    return response;
  };
  ```
  </TabItem>

  <TabItem value="py" label="Python">
  ```py {2} title="less/apis/demo/hello/post.py" showLineNumbers
  def process(request, response):
    response['statusCode'] = 204
    return response    
  ```
  </TabItem>
  
</Tabs>

### Headers
You can access request and response headers through the `headers` object.

Here's how we can access the *Accept* header in a request and set the *Content-Type* in a response:
<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
  ```js {2,5} title="less/apis/demo/hello/get.js" showLineNumbers
  exports.process = async (request, response) => {
    const accept_header = request.headers.Accept;
    if (accept_header === 'application/json') {
      response.body = { hello: 'world' };
      response.headers['Content-Type'] = accept_header;
    }
    else {
      response.body = 'Hello, world.';
    }
    return response;
  };
  ```
  </TabItem>

  <TabItem value="py" label="Python">
  ```py {2} title="less/apis/demo/hello/get.py" showLineNumbers
  def process(request, response):
      accept_header = request['headers']['Accept']
      response['body'] = accept_header
      return response
  ```
  </TabItem>
  
</Tabs>


In this section we'll see how to access data in our HTTP requests.

### Body
You can access the `request` and `response` body data through the `body` string.

Here's how we can access the value of `name` passed as a query param (e.g. `GET /hello?name=Djassi`):

:::note Request and response bodies should always be in `string` format.
Convert your data as needed.
:::

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
  ```js {2,4} title="less/apis/demo/hello/post.js" showLineNumbers
  exports.process = async (request, response) => {
    const request_data = JSON.parse(request.body);
    const name = request_data.name;
    response.body = 'Hello, ' + name + '.';
    return response;
  };
  ```
  </TabItem>

  <TabItem value="py" label="Python">
  ```py {4-5} title="less/apis/demo/hello/post.py" showLineNumbers
  import json

  def process(request, response):
    body = json.loads(request['body'])
    name = body['name']
  ```
  </TabItem>
  
</Tabs>

### Query Parameters
You can access query parameters through the `query` object in the `request`.

Here's how we can access the value of `name` passed as a query param (e.g. `GET /hello?name=Djassi`):
<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
  ```js {3} title="less/apis/demo/hello/get.js" showLineNumbers
  // GET /hello?name=Djassi
  exports.process = async (request, response) => {
    const name = request.query.name;
    if (name) {
      response.body = 'Hello, ' + name + '.';
    }
    else {
      response.body = 'Hello, world.';
    }
    return response;
  };
  ```
  </TabItem>

  <TabItem value="py" label="Python">
  ```py {2} title="less/apis/demo/hello/get.py" showLineNumbers
  def process(request, response):
      name = request['query']['name'] # 'world'
  ```
  </TabItem>
  
</Tabs>

## Middleware
Middleware is a widely utilized concept in web development, serving as an intermediary layer between the client and the server to manage various tasks. These tasks can include authenticating requests, parsing data, logging, and more. LESS offers a way to work with middleware similar to how middleware is handled in a Node.js Express application. In your API route, in addition to passing the main process function, you can also pass an array of middleware functions to your route. This approach allows each middleware to process the request sequentially before it reaches the main handler.

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">

  ```jsx {29} title="less/apis/demo/hello/get.js" showLineNumbers
  // Middleware function structure
  const middlewareFunction = async (request, response, next) => {
    // Add your middleware logic here

    // Call next() to proceed to the next middleware in the stack,
    // or to the route handler if this is the last middleware
    next();
  };

  module.exports = {
    middlewares: [middlewareFunction],
    process: async (request, response) => {
      // Add your route handling logic here

      // For example, setting a response and sending the response,
      // by default status code is 200
      response.body = JSON.stringify({ message: "Success" });

      return response;
    }
  }
  ```
  </TabItem>

  <TabItem value="py" label="Python">

  ```py {37} title="less/apis/demo/hello/get.py" showLineNumbers
  import json
  
  # Middleware function structure  
  def middlewareFunction(request, response, next):
    # Add your middleware logic here

    # Call next() to proceed to the next middleware in the stack,
    # or to the route handler if this is the last middleware
    next()

  middlewares = [middlewareFunction]

  def process(request, response):
    # Add your route handling logic here

    # For example, setting a response and sending the response,
    # by default status code is 200
    response['body'] = json.dumps({ 'message': 'Success' })

    return response
  ```
  </TabItem>
  
</Tabs>

## Deploy your REST API
<Tabs groupId="package-manager" queryString="package-manager">

  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli deploy my-less-project
    ```
  </TabItem>

  <TabItem value="npm" label="npm">
    ```bash
    npm i -g @chuva.io/less-cli
    less-cli deploy my-less-project
    ```
  </TabItem>

  <TabItem value="yarn" label="yarn">
    ```bash
    yarn global add @chuva.io/less-cli
    less-cli deploy my-less-project
    ```
  </TabItem>

</Tabs>

## Test your REST API
Once the deployment is complete you will be able to find your *Demo* API under *Resources* in the output:
```bash
[less-cli] Deployment complete ✅
[less-cli] Resources
[less-cli] - API URLs
[less-cli]  - Demo: https://my-less-project-demo.api.eu-0.a83b464c9.less.chuva.cv
[less-cli] 🇨🇻
```

- `GET /hello`
- `POST /hello`
- `GET /hello/{name}`
You can test your routes using **curl**:
```bash
curl [BASE_URL]/hello
curl -X POST [BASE_URL]/hello -d '{"name": "Djassi"}'
```