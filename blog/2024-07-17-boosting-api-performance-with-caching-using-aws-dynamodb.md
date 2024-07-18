---
title: Boosting API Performance with Caching using AWS DynamoDB
description: Learn how you can quickly and easily leverage the Less Key-Value Store (KVS) to implement different caching strategies.
image: https://docs.less.chuva.io/img/2024-07-17-boosting-api-performance-with-caching-using-aws-dynamodb.png
authors: ricardo_rosario
tags: [rest apis, cache, dynamodb, ttl, key-value store]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this article, we'll explore how you can quickly and easily leverage the Less Key-Value Store feature (backed by AWS DynamoDB) to set up caching for a REST API. We will explore different strategies for cache invalidation and updates including time-based invalidation using TTL, manual invalidation, and write-through cache.

<!-- truncate -->

We will be writing fully-functioning Node.js code and deploying our serverless application to AWS in this demo.

## Introduction

In the world of web development, optimizing performance is paramount for delivering exceptional user experiences. Caching is a powerful technique that reduces the need for repetitive and resource-intensive database operations.

Let's look at an e-commerce application as an example: The e-commerce products have _categories_ that are fetched by users and used for filtering the different items on the website. The categories are frequently accessed but they rarely change. Instead of querying the database each time a user needs the categories, we can store the latest category information in the cache, allowing subsequent requests for the same data to be retrieved with single-digit millisecond latency, improving response times and reducing database load.

## Creating the API route

Let's start by creating and entering our project folder.
```bash
mkdir -p caching-demo
cd caching-demo
```

Now let's create our ecommerce API along with the `GET /categories` route.
```bash
mkdir -p less/apis/ecommerce/categories
touch less/apis/ecommerce/categories/get.js
```

```javascript title="less/apis/ecommerce/categories/get.js" showLineNumbers
exports.process = async (request, response) => {
  // Route code here.
};
```

Let's fetch the data from the database. In this case we will pretend to use a database but instead just serve static data.
```javascript {2-9,12-14} title="less/apis/ecommerce/categories/get.js" showLineNumbers
// Create a function to load data from the database.
const load_data_from_database = async () => {
  const data = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Books" }
  ];
  return data;
};

exports.process = async (request, response) => {
  const data = await load_data_from_database();
  const response_data = JSON.stringify(data);
  response.body = response_data; // Set the response body.
  return response;
};
```

Finally, let's add a sleep function to simulate database latency.
```javascript {2-4,13} title="less/apis/ecommerce/categories/get.js" showLineNumbers
// Sleep function to simulate latency. 
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Create a function to load data from the database.
const load_data_from_database = async () => {
  const data = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Books" }
  ];
  await sleep(5000); // Sleep for five seconds before returning.
  return data;
};

exports.process = async (request, response) => {
  const data = await load_data_from_database();
  const response_data = JSON.stringify(data);
  response.body = response_data; // Set the response body.
  return response;
};
```

Let's deploy and see our results so far.

<Tabs groupId="package-manager" queryString="package-manager">
  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli deploy caching-demo

    # Output:
    #
    # [less-cli] Building... ⚙️
    # [less-cli] Build completed ✅
    # [less-cli] Deploying... 🚀
    # [less-cli] Deploy completed ✅
    # [less-cli] 🇨🇻
    # [less-cli] Resources
    # [less-cli]   - API URLs
    # [less-cli]     - Ecommerce: https://YOUR-LESS-API-URL.less.chuva.cv
    ```
  </TabItem>
  <TabItem value="npm" label="npm">
    ```bash
    less-cli deploy caching-demo

    # Output:
    #
    # [less-cli] Building... ⚙️
    # [less-cli] Build completed ✅
    # [less-cli] Deploying... 🚀
    # [less-cli] Deploy completed ✅
    # [less-cli] 🇨🇻
    # [less-cli] Resources
    # [less-cli]   - API URLs
    # [less-cli]     - Ecommerce: https://YOUR-LESS-API-URL.less.chuva.cv
    ```
  </TabItem>
  <TabItem value="yarn" label="yarn">
    ```bash
    less-cli deploy caching-demo

    # Output:

    # [less-cli] Building... ⚙️
    # [less-cli] Build completed ✅
    # [less-cli] Deploying... 🚀
    # [less-cli] Deploy completed ✅
    # [less-cli] 🇨🇻
    # [less-cli] Resources
    # [less-cli]   - API URLs
    # [less-cli]     - Ecommerce: https://YOUR-LESS-API-URL.less.chuva.cv
    ```
  </TabItem>
</Tabs>

:::tip Don't have a Less account?
Follow the steps on our [Sign In / Sign Up](/sign-in-sign-up) page to create a Less account and deploy your first project.
:::

Once the deployment is complete we can get the API URL from the output. Test the route using a client of your choice. Here's an example using _curl_:
```bash
curl https://YOUR-LESS-API-URL.less.chuva.cv/categories

# Output:
#
# [{"id":1,"name":"Electronics"},{"id":2,"name":"Clothing"},{"id":3,"name":"Books"}]
```

## Caching the response data
Backed by AWS DynamoDB, the [Less Key-Value Store (KVS)](/key-value-store) is available from anywhere in your Less code, seamlessly integrating into your development workflow. By leveraging KVS, we can implement caching with ease.

Let's update our _GET_ request to cache the response. First we'll check if the data is already in the cache. If it is we'll use it for our response. If not we'll load it from the database and add it to the cache for next time.

```jsx {1-2,22-35} title="less/apis/ecommerce/categories/get.js" showLineNumbers
const { kvs } = require('@chuva.io/less-cli');
const CACHE_KEY = 'CATEGORIES_CACHE';

// Sleep function to simulate latency. 
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Create a function to load data from the database.
const load_data_from_database = async () => {
  const data = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Books" }
  ];
  await sleep(5000); // Sleep for five seconds before returning.
  return data;
};

// Handler function for the category resource
exports.process = async (request, response) => {
  let response_data;
    
  // Check if the data is cached in KVS.
  const cached_data = await kvs.get(CACHE_KEY);
  if (cached_data) {
    response_data = cached_data;
  }
  else {
    const data = await load_data_from_database();
    response_data = JSON.stringify(data);
    
    // Store fetched data in the cache for future use.
    await kvs.set(CACHE_KEY, response_data);
  }

  response.body = response_data;
  return response;
}
```

## Setting up a time-to-live (TTL) for the cached data

Another feature of KVS is the ability to set a Time-to-Live (TTL) for items in the store, allowing data to be automatically deleted. This makes it easy for us to implement a cache invalidation mechanism, allowing us to keep our cache fresh.

Let's update the code to set a TTL. I'll set it to 10 seconds so that it's easier for us to test.

```jsx {34-35} title="less/apis/ecommerce/categories/get.js" showLineNumbers
const { kvs } = require('@chuva.io/less-cli');
const CACHE_KEY = 'CATEGORIES_CACHE';

// Sleep function to simulate latency. 
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Create a function to load data from the database.
const load_data_from_database = async () => {
  const data = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Books" }
  ];
  await sleep(5000); // Sleep for five seconds before returning.
  return data;
};

// Handler function for the category resource
exports.process = async (request, response) => {
  let response_data;
    
  // Check if the data is cached in KVS.
  const cached_data = await kvs.get(CACHE_KEY);
  if (cached_data) {
    response_data = cached_data;
  }
  else {
    const data = await load_data_from_database();
    response_data = JSON.stringify(data);
    
    // Store fetched data in the cache for future use.
    const TTL_SECONDS = 10
    await kvs.set(CACHE_KEY, response_data, TTL_SECONDS);
  }

  response.body = response_data;
  return response;
}
```

Deploy your code and test your route a few more times to see the cache and TTL in action.
<Tabs groupId="package-manager" queryString="package-manager">
  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli deploy caching-demo
    ```
  </TabItem>
  <TabItem value="npm" label="npm">
    ```bash
    less-cli deploy caching-demo
    ```
  </TabItem>
  <TabItem value="yarn" label="yarn">
    ```bash
    less-cli deploy caching-demo
    ```
  </TabItem>
</Tabs>

```bash
curl https://YOUR-LESS-API-URL.less.chuva.cv/categories
```

You can see that the first request was slower than the repeated requests (due to our `sleep` before database writes). Further, you should have noticed that once the TTL period expired there was another slow request, since the cache was cleared once it expired.

## Manually invalidating the cache
Suppose a new category is created in our e-commerce application. As a result of this change we should invalidate the cache manually, ensuring that the next time the data is requested, it will be fetched from the database.

Let's create a `POST /categories` route and delete the cache key from the key-value store.

```jsx title="less/apis/ecommerce/categories/post.js" showLineNumbers
// Import the kvs module from the framework
const { kvs } = require('@chuva.io/less');
const CACHE_KEY = 'CATEGORIES_CACHE';

exports.process = async (request, response) => {
  await kvs.delete(CACHE_KEY); // Delete the cache from KVS.
};
```

Let's deploy and test again.
<Tabs groupId="package-manager" queryString="package-manager">
  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli deploy caching-demo
    ```
  </TabItem>
  <TabItem value="npm" label="npm">
    ```bash
    less-cli deploy caching-demo
    ```
  </TabItem>
  <TabItem value="yarn" label="yarn">
    ```bash
    less-cli deploy caching-demo
    ```
  </TabItem>
</Tabs>

This time we'll call the _POST_ request first to invalidate the cache.
```bash
curl https://YOUR-LESS-API-URL.less.chuva.cv/categories -X POST
```

Each time we call our _POST_ request and manually invalidate the cache we'll notice that the next _GET_ request will be a bit slower once again.

## Enhancing our cache by implementing a write-through cache
Instead of simply invalidating the cache and making the next user wait for a database query, we can update the cache with the new data at the time of the database update. This ensures that the cache is always in sync with the database.

Let's update our _POST_ request to update the cache with the new data.

```jsx {5-7} title="less/apis/ecommerce/categories/post.js" showLineNumbers
// Import the kvs module from the framework
const { kvs } = require('@chuva.io/less');
const CACHE_KEY = 'CATEGORIES_CACHE';

exports.process = async (request, response) => {
  const new_cache_value = JSON.stringify({foo: 'bar'});
  const TTL_SECONDS = 10
  await kvs.set(CACHE_KEY, new_cache_value, TTL_SECONDS);  
};
```

## Conclusion

We started our caching implementation by caching requests at the time of the _GET_ request as needed. In this case the user only experienced latency in cases when the cache was empty. One reason this could occur is that the underlying data changed, in which case we would invalidate the cache giving the user an opportunity to fetch fresh data during the next request.

In order to reduce this latency and always provide the user with cached data, we implemented write-through cache at the time of the data change in the _POST_ request. However, this just moved the latency to the time of the write instead of the read.

In a future tutorial, we'll look at how we can use an event-driven approach to process the data update event asyncronously, removing this latency. Stay tuned.

---

By leveraging the power of KVS caching, developers can significantly enhance the performance and scalability of their Less projects. Whether it's reducing database load or improving response times, caching with KVS offers a simple solution to common performance challenges. As you embark on your caching journey, remember to balance the benefits of caching with the need for data freshness and always strive for optimal performance in your web applications.

As you dive deeper into caching strategies with KVS, don't hesitate to experiment and tailor solutions to fit your specific use cases. The flexibility of KVS combined with the robustness of Less provides a solid foundation for building high-performance web applications. Keep exploring, keep optimizing, and unlock the full potential of Less in your projects
