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

Set a **value** for a **key**. Both the key and the value should be `strings`.

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```js {3} showLineNumbers
    const { kvs } = require('@chuva.io/less');

    await kvs.set('key', 'value');
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```python {3} showLineNumbers
    from less import kvs

    kvs.set('key', 'value')
    ```
  </TabItem>
  
</Tabs>

## Get Value for Key

Get a **value** for a **key**.

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```js {3} showLineNumbers
    const { kvs } = require('@chuva.io/less');

    await kvs.get('key');
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```python {3} showLineNumbers
    from less import kvs

    kvs.get('key')
    ```
  </TabItem>
  
</Tabs>


## Delete Value and Key

Delete a **key** and its **value**.

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```js {3} showLineNumbers
    const { kvs } = require('@chuva.io/less');

    await kvs.delete('key');
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```python {3} showLineNumbers
    from less import kvs

    kvs.delete('key')
    ```
  </TabItem>
  
</Tabs>

## Streaming

The Key-Value Store (KVS) supports a powerful streaming feature that allows users to receive real-time updates on specific topics. This feature enhances the interaction with the KVS by providing instant notifications when key data manipulations occur.

### Topics to retrieve streaming events

#### 1. Creation of a New Item

When a new item is created in the Key-Value Store (KVS), the streaming service publishes a message with the following payload structure

```js
{
  "key": "artists",
  "new_value": [
    {
      "first_name": "Cesária",
      "last_name": "Évora",
      "birth_date": "08/27/1941"
    }
  ]
}
// key: The identifier of the item in the KVS.
// new_value: The newly created item.
```

Let's get the message on our topic `kvs_create`

```bash
mkdir less/topics/kvs_created
```

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">

    ```bash
    touch less/topics/kvs_created/index.js
    ```

    ```js title="less/topics/kvs_created/index.js"
    exports.process = async (data) => {
      const { key, new_value } = data;

      console.log(`A new item is being created with the key '${key}' and value: \n${new_value}`);
  }
    ```
  </TabItem>

  <TabItem value="py" label="Python">

    ```bash
    touch less/topics/kvs_created/__init__.js
    ```
  
    ```python title="less/topics/kvs_created/__init__.js"
    def process(data):
      key = data.get('key')
      new_value = data.get('new_value')
    
      print(f"A new item is being created with the key '{key}' and value: \n{new_value}")

    ```
  </TabItem>
  
</Tabs>


#### 2. Update of an Item

When an existing item is updated in the Key-Value Store, the streaming service publishes a message with the following payload structure:

```js
{
  "key": "artists",
  "new_value": [
    {
      "first_name": "Cesária",
      "last_name": "Évora",
      "birth_date": "08/27/1941"
    },
    {
      "first_name": "Mayra",
      "last_name": "Andrade",
      "birth_date": "02/13/1985"
    }
  ],
  "old_value": [
    {
      "first_name": "Cesária",
      "last_name": "Évora",
      "birth_date": "08/27/1941"
    }
  ]
}
// key: The identifier of the item in the KVS.
// new_value: The updated details of the item.
// old_value: The previous details of the item before the update.
```

Let's get the message on our topic `kvs_updated`

```bash
mkdir less/topics/kvs_updated
```

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/topics/kvs_updated/index.js
    ```

    ```js title="less/topics/kvs_updated/index.js"
    exports.process = async (data) => {
      const { key, new_value, old_value } = data;

      console.log(`An item with the key '${key}' is being updated: \n\t old value:${old_value} \n\n\t new value: \n\t${new_value}`);
  }
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```bash
    touch less/topics/kvs_updated/__init__.py
    ```
  
    ```python title="less/topics/kvs_updated/__init__.py"
    def process(data):
      key = data.get('key')
      new_value = data.get('new_value')
      old_value = data.get('old_value')
    
      print(f"An item with the key '{key}' is being updated: \n\t old value:{old_value} \n\n\t new value: \n\t{new_value}")

    ```
  </TabItem>
  
</Tabs>


#### 3. Removal of an Item

When an item is removed or deleted from the Key-Value Store, the streaming service publishes a message with the following payload structure:

```js
{
  "key": "artists",
  "old_value": [
    {
      "first_name": "Cesária",
      "last_name": "Évora",
      "birth_date": "08/27/1941"
    },
    {
      "first_name": "Mayra",
      "last_name": "Andrade",
      "birth_date": "02/13/1985"
    }
  ]
}
// key: The identifier of the item in the KVS.
// old_value: The details of the item before it was removed.
```

Let's get the message on our topic `kvs_deleted`

```bash
mkdir less/topics/kvs_deleted
```

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">

    ```bash
    touch less/topics/kvs_deleted/index.js
    ```

    ```js title="less/topics/kvs_deleted/index.js"
    exports.process = async (data) => {
      const { key, old_value } = data;

      console.log(`An item with the key '${key}' is being deleted: \n\t old value:${old_value}`);
  }
    ```
  </TabItem>
  <TabItem value="py" label="Python">

    ```bash
    touch less/topics/kvs_deleted/__init__.py
    ```
  
    ```python title="less/topics/kvs_deleted/__init__.py"
    def process(data):
      key = data.get('key')
      old_value = data.get('old_value')
    
      print(f"An item with the key '{key}' is being deleted: \n\t old value: {old_value}")

    ```
  </TabItem>
  
</Tabs>
