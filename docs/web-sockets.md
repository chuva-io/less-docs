---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Web Sockets
In order to create your Web Sockets, add a `sockets` folder to your `less` folder.

```bash
mkdir -p less/sockets
```

Less allows you to create several Web Sockets in the same project. In order to create a new socket, add it to the `sockets` folder.

For example, to create a `demo` socket add a folder named `demo` to `less/sockets`:
```bash
mkdir less/sockets/demo
```

## Handle Client Connections
When a client connects or disconnects from your socket, the respective `connect` or `disconnect` function will be called, providing the client's `connection_id`.

In order to handle the connect & disconnect events, add your `connect` and `disconnect` handlers to your socket.

### Client Connected
```bash
mkdir less/sockets/demo/connect
```

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/sockets/demo/connect/index.js
    ```
    
    ```js title="less/sockets/demo/connect/index.js" showLineNumbers
    exports.process = async ({ connection_id }) => {
      console.log('Client connected: ' + connection_id);
      // Save the client's connection_id so you can send messages to them later.
    };
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```bash
    touch less/sockets/demo/connect/__init__.py
    ```

    ```py title="less/sockets/demo/connect/__init__.py" showLineNumbers
    def process(data):
      connection_id = data.get('connection_id')
      # Your code here
    ```
  </TabItem>
  
</Tabs>

#### Deploy and test your Web Socket `connect` handler
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

##### Connect to your socket
Here's an example of connecting using [wscat](https://github.com/websockets/wscat):
```bash
wscat -c wss://[PROJECT-NAME]-[SOCKET-NAME].ws.eu-0.4dd0b49.less.chuva.cv
```

##### View connection logs
<Tabs groupId="package-manager" queryString="package-manager">

  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli log --project my-less-project --path sockets/demo/connect
    ```
  </TabItem>

  <TabItem value="npm" label="npm">
    ```bash
    npm i -g @chuva.io/less-cli
    less-cli log --project my-less-project --path sockets/demo/connect
    ```
  </TabItem>

  <TabItem value="yarn" label="yarn">
    ```bash
    yarn global add @chuva.io/less-cli
    less-cli log --project my-less-project --path sockets/demo/connect
    ```
  </TabItem>

</Tabs>

:::info Less Logs Documentation
Read the [Less logs documentation](/cli/function-logs) to learn more.
:::

---

:::note Don't forget to save your `connection_id`.
Save your `connection_id` so you can use it later.
:::

Here's an example of how you can save your `connection_id` using Less's built in [Key-Value Store](/key-value-store):
<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```js {2,8} title="less/sockets/demo/connect/index.js" showLineNumbers
    // Import the Key-Value Store from Less.
    const { kvs } = require('@chuva.io/less');

    exports.process = async ({ connection_id }) => {
      console.log('Client connected: ' + connection_id);
      
      // Save your socket connection_id
      await kvs.set('DEMO_SOCKET_CONNECTION_ID', connection_id);
    };
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```py title="less/sockets/demo/connect/__init__.py" showLineNumbers
    def process(data):
      connection_id = data.get('connection_id')
      # Your code here
    ```
  </TabItem>
  
</Tabs>

### Client Disconnected

```bash
mkdir less/sockets/demo/disconnect
```

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/sockets/demo/disconnect/index.js
    ```
    
    ```js title="less/sockets/demo/disconnect/index.js" showLineNumbers
    exports.process = async ({ connection_id }) => {
      console.log('Client disconnected: ' + connection_id);
      // Delete the connection_id from your database.
    };
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```bash
    touch less/sockets/demo/disconnect/__init__.py
    ```

    ```py title="less/sockets/demo/disconnect/__init__.py" showLineNumbers
    def process(data):
      connection_id = data.get('connection_id')
    ```
  </TabItem>
  
</Tabs>

## Send Messages
We can use the `connection_id` obtained in the socket `connect` handler in order to send messages to connected clients.

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    Import `sockets` from `@chuva.io/less` to send messages to your socket's clients.

    ```js showLineNumbers
    const { sockets } = require('@chuva.io/less');
    ```

    This allows you to send messages to an array of client connection IDs for the designated socket.
    
    Here's an example of publishing a message to clients connected to a `demo` socket:
    ```jsx showLineNumbers
    await sockets.demo.publish(
      message,
      [connection_id_1, connection_id_2]
    );
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    Import `sockets` from `less` to send messages to your socket's clients.
    
    ```py showLineNumbers
    from less import sockets
    ```

    Now you can send messages to an array of client connection IDs for the designated socket.

    Let's send a message to our `demo` socket:

    ```py {3-6} showLineNumbers
    from less import sockets

    sockets.demo.publish(
      message,
      [connection_id_1, connection_id_2]
    );
    ```
  </TabItem>
  
</Tabs>

Let's create a `POST /hello` route that will send messages to a connected client. We will retrieve the client connection_id that we saved in the socket `connect` handler from the [Key-Value Store](/key-value-store).
<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
  ```bash
  touch less/apis/demo/hello/post.js
  ```
  
  ```js title="less/apis/demo/hello/post.js" showLineNumbers
  const { sockets, kvs } = require('@chuva.io/less');

  exports.process = async (request, response) => {
    // Get the connection_id from kvs.
    const CONNECTION_ID = await kvs.get('DEMO_SOCKET_CONNECTION_ID');

    // Publish a message to the specified connections to the `demo` socket.
    await sockets.demo.publish(
      'Hello from POST /hello',
      [CONNECTION_ID]
    );

    response.statusCode = 204;
    return response;
  };
  ```
  </TabItem>

  <TabItem value="py" label="Python">
  ```bash
  touch less/apis/demo/hello/post.py
  ```

  ```py title="less/apis/demo/hello/post.py" showLineNumbers
  def process(request, response):
      pass
  ```
  </TabItem>

</Tabs>

:::info Less REST API Documentation
Read the [Less REST API documentation](/rest-apis) to learn more.
:::

You can now deploy and call your `POST /hello` route and confirm that your client is receiving the message:

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

2. Connect to your socket.
```bash
wscat -c wss://[PROJECT-NAME]-[SOCKET-NAME].ws.eu-0.4dd0b49.less.chuva.cv
```

3. In a separate terminal window `POST` to `/routes`.
```bash
curl -X POST [BASE_URL]/hello
```

4. Go back to your previous terminal window and confirm the message was received.

## Create Channels
Channels allow **clients** to send messages to your socket. In order to create a channel for your socket, simply create a channel processor in your socket's folder.

Create a `my_channel` channel in your `demo` socket:
```bash
mkdir less/sockets/demo/my_channel
```

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/sockets/demo/my_channel/index.js
    ```
    
    ```js title="less/sockets/demo/my_channel/index.js" showLineNumbers
    exports.process = async ({ data, connection_id }) => {
      console.log(`Received message from: ${connection_id}`);
      console.log(`Message: ${data}`);
    };
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```bash
    touch less/sockets/demo/my_channel/__init__.py
    ```

    ```py title="less/sockets/demo/my_channel/__init__.py" showLineNumbers
    def process(input_data):
      data = input_data.get('data')
      connection_id = input_data.get('connection_id')
    ```
  </TabItem>
  
</Tabs>

You can now deploy your changes:
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

The client can send messages to the server by sending a JSON payload with the `channel` name and the `data` to be sent.

Here's an example of sending messages from a client to the server using _wscat_:
```bash
wscat -c wss://[PROJECT-NAME]-[SOCKET-NAME].ws.eu-0.4dd0b49.less.chuva.cv
Connected (press CTRL+C to quit)
> { "channel": "my_channel", "data": "Hello from a socket client." }
```

Check your socket channel logs:
<Tabs groupId="package-manager" queryString="package-manager">

  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli log --project my-less-project --path sockets/demo/my_channel
    ```
  </TabItem>

  <TabItem value="npm" label="npm">
    ```bash
    npm i -g @chuva.io/less-cli
    less-cli log --project my-less-project --path sockets/demo/my_channel
    ```
  </TabItem>

  <TabItem value="yarn" label="yarn">
    ```bash
    yarn global add @chuva.io/less-cli
    less-cli log --project my-less-project --path sockets/demo/my_channel
    ```
  </TabItem>

</Tabs>

:::info Less Logs Documentation
Read the [Less logs documentation](/cli/function-logs) to learn more.
:::

---

Send a message back to the client to test:
<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```js {1,8-9} title="less/sockets/demo/my_channel/index.js" showLineNumbers
    const { sockets } = require('@chuva.io/less');

    exports.process = async ({ data, connection_id }) => {
      console.log(`Received message from: ${connection_id}`);
      console.log(`Message: ${data}`);

      // Publish a message to the specified connections to the `demo` socket.
      const message = `You said: "${JSON.stringify(data)}"`;
      await sockets.demo.publish(message, [connection_id]);
    };
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```py title="less/sockets/demo/my_channel/__init__.py" showLineNumbers
    def process(input_data):
      data = input_data.get('data')
      connection_id = input_data.get('connection_id')
    ```
  </TabItem>
  
</Tabs>

Deploy and test again:
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

```bash
wscat -c wss://[PROJECT-NAME]-[SOCKET-NAME].ws.eu-0.4dd0b49.less.chuva.cv
Connected (press CTRL+C to quit)
> { "channel": "my_channel", "data": "Hello from a socket client." }
< "You said: \"Hello from a socket client.\""
```
