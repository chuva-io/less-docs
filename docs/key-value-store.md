---
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Key-Value Store

All Less deployments come with a built in key-value store.

## Import the Key-Value Store

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    Import `kvs` from `@chuva.io/less`.
    ```js showLineNumbers
    const { kvs } = require('@chuva.io/less');
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    Import `kvs` from `less`.
    ```python showLineNumbers
    from less import kvs
    ```
  </TabItem>
  
</Tabs>

## Set Value for Key

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    The key should be a `string`. The value can be any primitive (number, object, etc.).

    ```js {3} showLineNumbers
    const { kvs } = require('@chuva.io/less');

    await kvs.set('MY_KEY', 'This is my value.');
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```python {3} showLineNumbers
    from less import kvs

    kvs.set('MY_KEY', 'This is my value.')
    ```
  </TabItem>
  
</Tabs>

## Get Value for Key

Get a **value** for a **key**.

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```js {3} showLineNumbers
    const { kvs } = require('@chuva.io/less');

    const my_value = await kvs.get('MY_KEY');
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```python {3} showLineNumbers
    from less import kvs

    my_value = kvs.get('MY_KEY')
    ```
  </TabItem>
  
</Tabs>


## Delete Value and Key

Delete a **key** and its **value**.

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```js {3} showLineNumbers
    const { kvs } = require('@chuva.io/less');

    await kvs.delete('MY_KEY');
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```python {3} showLineNumbers
    from less import kvs

    kvs.delete('MY_KEY')
    ```
  </TabItem>
  
</Tabs>

## Subscribe to KVS changes
The Key-Value Store (KVS) allows you to subscribe to a stream of real-time updates by leveraging Less's [Topics/Subscribers (Pub/Sub)](/topics_subscribers) feature.

:::info Less Topics Documentation
Read the [Less Topics/Subscribers (Pub/Sub) documentation](/topics_subscribers) to learn more.
:::

### Subscribe to `create` events
Create the `kvs_created` Topic.

```bash
mkdir -p less/topics/kvs_created/log
```

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/topics/kvs_created/log/index.js
    ```

    ```js title="less/topics/kvs_created/log/index.js"
    exports.process = async ({ key, new_value }) => {
      console.log(`New item created with key: '${key}' and value: '${new_value}'.`);
    }
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```bash
    touch less/topics/kvs_created/log/__init__.py
    ```
  
    ```python title="less/topics/kvs_created/log/__init__.py"
    def process(data):
      key = data['key']
      new_value = data['new_value']
    
      print(f"A new item is being created with the key '{key}' and value {new_value}")
    ```
  </TabItem>
</Tabs>

Here is an example `kvs_created` event payload:
```js
{
  "key": "artists",
  "new_value": [
    {
      "first_name": "Cesária",
      "last_name": "Évora",
      "dob": "08/27/1941"
    }
  ]
}
```

### Subscribe to `update` events
Create the `kvs_updated` Topic.

```bash
mkdir -p less/topics/kvs_updated/log
```

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/topics/kvs_updated/log/index.js
    ```

    ```js title="less/topics/kvs_updated/log/index.js"
    exports.process = async ({ key, old_value, new_value }) => {
      console.log(`Item with with key: '${key}' updated.`);
      console.log(`Old value: ${old_value}.`);
      console.log(`New value: ${new_value}.`);
    }
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```bash
    touch less/topics/kvs_updated/log/__init__.py
    ```
  
    ```python title="less/topics/kvs_updated/log/__init__.py"
    def process(data):
      key = data['key']
      new_value = data['new_value']
    
      print(f"The value for the key '{key}' was updated.\nNew value: {new_value}\nOld value: {old_value}")
    ```
  </TabItem>
</Tabs>

Here is an example `kvs_updated` event payload:
```js
{
  "key": "artists",
  "new_value": [
    {
      "first_name": "Cesária",
      "last_name": "Évora",
      "dob": "08/27/1941"
    },
    {
      "first_name": "Mayra",
      "last_name": "Andrade",
      "dob": "02/13/1985"
    }
  ],
  "old_value": [
    {
      "first_name": "Cesária",
      "last_name": "Évora",
      "dob": "08/27/1941"
    }
  ]
}
```

### Subscribe `delete` events
Create the `kvs_deleted` Topic.

```bash
mkdir -p less/topics/kvs_deleted/log
```

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/topics/kvs_deleted/log/index.js
    ```

    ```js title="less/topics/kvs_deleted/log/index.js"
    exports.process = async ({ key, old_value }) => {
      console.log(`Item with with key: '${key}' deleted.`);
      console.log(`Old value: ${old_value}.`);
    }
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```bash
    touch less/topics/kvs_deleted/log/__init__.py
    ```
  
    ```python title="less/topics/kvs_deleted/log/__init__.py"
    def process(data):
      key = data['key']
      new_value = data['new_value']
    
      print(f"The key '{key}' was deleted.")
    ```
  </TabItem>
</Tabs>

Here is an example `kvs_deleted` event payload:
```js
{
  "key": "artists",
  "old_value": [
    {
      "first_name": "Cesária",
      "last_name": "Évora",
      "dob": "08/27/1941"
    }
  ]
}
```

:::info Less Topics/Subscribers (Pub/Sub) Documentation
Read the [Less Topics/Subscribers (Pub/Sub) documentation](/topics_subscribers) to learn more.
:::
