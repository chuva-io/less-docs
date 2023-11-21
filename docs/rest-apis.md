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
Each folder at the root of `less/apis/` will be deployed as a separate API.
:::

## API Routes

The API's route paths mirror the relative path for your project files.

Let's create a `/hello` route in the Demo API.
```bash
mkdir less/apis/demo/hello
```

### HTTP Verbs
In order to process requests, create your handler functions inside of the route's folder. The handler name is the HTTP verb plus the file type.

Let's create a `GET` request for the `/hello` route.

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
  ```bash
  touch less/apis/demo/hello/get.js
  ```
  
  ```js title="less/apis/demo/hello/get.js" showLineNumbers
  module.exports.process = async (request, response) => { };
  ```
  </TabItem>

  <TabItem value="py" label="Python">
  ```bash
  touch less/apis/demo/hello/get.py
  ```

  ```py title="less/apis/demo/hello/get.py" showLineNumbers
  def process(request, response):
      pass
  ```
  </TabItem>
  
</Tabs>

### API Dynamic Paths

In cases where you would like to have a dynamic path just wrap your folder name in `{}`.

Let's add a `/hello/{name}` route to the Demo API.

```bash
mkdir less/apis/demo/hello/{name}
```

We now have a Chat API with 2 routes:
- `GET /hello`
- `GET /hello/{name}`

#### Access Dynamic Path Values
You can access the value of the dynamic path through the `request` object.

Here's how we can access the value of `name`:
<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
  ```js {2} title="less/apis/demo/hello/{name}/get.js" showLineNumbers
  module.exports.process = async (request, response) => {
      const { name } = request.params; 
  };
  ```
  </TabItem>

  <TabItem value="py" label="Python">
  ```py {2} title="less/apis/demo/hello/{name}/get.py" showLineNumbers
  def process(request, response):
      name = request['params']['name']
  ```
  </TabItem>
  
</Tabs>

## HTTP Request
In this section we'll see how to access data in our HTTP requests.

### Query Parameters
You can access the value of query parameters through the `request` object.

Here's how we can access the value of `name` passed as a query param (e.g. `/hello?name=world`):
<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
  ```js {2} title="less/apis/demo/hello/get.js" showLineNumbers
  module.exports.process = async (request, response) => {
      const { name } = request.query; // 'world'
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

## HTTP Response
Configure your HTTP response using the `response` object. Make sure to return it when you're done.

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
  ```js {2-5} title="less/apis/demo/hello/get.js" showLineNumbers
  module.exports.process = async (request, response) => {
      const message = { hello: 'world' };
      response.statusCode = 200;
      response.body = JSON.stringify(message); // The response body should always be a string.
      return response;
  };
  ```
  </TabItem>

  <TabItem value="py" label="Python">
  ```py {1,4-7} title="less/apis/demo/hello/get.py" showLineNumbers
  import json

  def process(request, response):
      message = { 'hello': 'world' }
      response['statusCode'] = 200
      response['body'] = json.dumps(message) # The response body should always be a string.
      return response
  ```
  </TabItem>
  
</Tabs>

## Deploy

