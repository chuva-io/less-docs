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

Similarly to [REST APIs](/rest-apis), Less allows you to create several Web Sockets in the same project. In order to create a new socket, add it to the `sockets` folder.

For example, to create a `chat` socket add a folder named `chat` to `less/sockets`:
```bash
mkdir less/sockets/chat
```

## Handle Client Connections

When a client connects or disconnects from your socket, the respective `connect` or `disconnect` function will be called, providing the client's `connection_id`.

In order to handle the connect & disconnect events, add your `connect` and `disconnect` folders to your socket.

### Client Connected

```bash
mkdir less/sockets/chat/connect
```

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/sockets/chat/connect/index.js
    ```
    
    ```js title="less/sockets/chat/connect/index.js" showLineNumbers
    exports.process = async ({ connection_id }) => { };
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```bash
    touch less/sockets/chat/connect/__init__.py
    ```

    ```py title="less/sockets/chat/connect/__init__.py" showLineNumbers
    def process(data):
      connection_id = data.get('connection_id')
      # Your code here
    ```
  </TabItem>
  
</Tabs>

### Client Disconnected

```bash
mkdir less/sockets/chat/disconnect
```

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/sockets/chat/disconnect/index.js
    ```
    
    ```js title="less/sockets/chat/disconnect/index.js" showLineNumbers
    exports.process = async ({ connection_id }) => { };
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```bash
    touch less/sockets/chat/disconnect/__init__.py
    ```

    ```py title="less/sockets/chat/disconnect/__init__.py" showLineNumbers
    def process(data):
      connection_id = data.get('connection_id')
    ```
  </TabItem>
  
</Tabs>

## Create Channels

In order to create channels for your socket, add a folder for each channel to your `less/sockets/` folder. Channels allow **clients** to send messages to your socket.

Here's an example of a `public_chat_room` channel:
```bash
mkdir less/sockets/chat/public_chat_room
```

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/sockets/chat/public_chat_room/index.js
    ```
    
    ```js title="less/sockets/chat/public_chat_room/index.js" showLineNumbers
    exports.process = async ({ data, connection_id }) => { };
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```bash
    touch less/sockets/chat/public_chat_room/__init__.py
    ```

    ```py title="less/sockets/chat/public_chat_room/__init__.py" showLineNumbers
    def process(input_data):
      data = input_data.get('data')
      connection_id = input_data.get('connection_id')
    ```
  </TabItem>
  
</Tabs>

## Send Messages

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    Import `sockets` from `@chuva.io/less` to send messages to your socket's clients.

    ```js showLineNumbers
    const { sockets } = require('@chuva.io/less');
    ```

    Now you can send messages to an array of client connection IDs for the designated socket.

    Let's send a message to our `chat` socket:
    ```jsx {3-6} showLineNumbers
    const { sockets } = require('@chuva.io/less');

    await sockets.chat.publish(
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

    Let's send a message to our `chat` socket:

    ```py {3-6} showLineNumbers
    from less import sockets

    sockets.chat.publish(
      message,
      [connection_id_1, connection_id_2]
    );
    ```
  </TabItem>
  
</Tabs>

:::tip Get started quickly
Use the [Key-Value Store](/key-value-store) to save your connection ids and make it even easier to send your first message.
:::
