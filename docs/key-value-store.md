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
  
</Tabs>

## Subscribe to KVS changes
The Key-Value Store (KVS) allows you to subscribe to a stream of real-time updates by leveraging Less's [Topics](/fanout) feature.

:::info Less Topics Documentation
Read the [Less Topics documentation](/fanout) to learn more.
:::

### Subscribe to the `kvs_created` Topic

```bash
mkdir -p less/topics/kvs_created
```

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/topics/kvs_created/index.js
    ```

    ```js title="less/topics/kvs_created/index.js"
    exports.process = async ({ key, new_value }) => {
      console.log(`New item created with key: '${key}' and value: '${new_value}'.`);
    }
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

### Subscribe to the `kvs_updated` Topic

```bash
mkdir -p less/topics/kvs_updated
```

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/topics/kvs_updated/index.js
    ```

    ```js title="less/topics/kvs_updated/index.js"
    exports.process = async ({ key, old_value, new_value }) => {
      console.log(`Item with with key: '${key}' updated.`);
      console.log(`Old value: ${old_value}.`);
      console.log(`New value: ${new_value}.`);
    }
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

### Subscribe to the `kvs_deleted` Topic

```bash
mkdir -p less/topics/kvs_deleted
```

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/topics/kvs_deleted/index.js
    ```

    ```js title="less/topics/kvs_deleted/index.js"
    exports.process = async ({ key, old_value }) => {
      console.log(`Item with with key: '${key}' deleted.`);
      console.log(`Old value: ${old_value}.`);
    }
    ```
  </TabItem>
</Tabs>

Here is an example `kvs_deleted` event payload:
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

:::info Less Topics Documentation
Read the [Less Topics documentation](/fanout) to learn more.
:::
