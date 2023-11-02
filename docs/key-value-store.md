---
sidebar_position: 6
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