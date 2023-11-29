---
sidebar_position: 8
tags: ['distributed system', 'fault-tolerant', 'event-driven', 'microservice', 'pub/sub', 'topic', 'event', 'queue', 'async', 'publisher', 'subscriber', 'processor']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Fanout (Pub/Sub)

Less makes it easy to set up Pub/Sub, giving you at-least-once delivery guarantees.

Messages that fail to be processed will be retained in order to be delivered again later, while also allowing new messages to continue to be processed.

## Create Topics

In order to create publishers and subscribers you need to create a `topics` folder in `less`. Each folder inside of `topics` will be your topic/publisher.

```bash
mkdir -p less/topics
```

Let's create an example `user_created` topic:
```bash
mkdir less/topics/user_created
```

### Create Topic Subscribers
A topic can have several subscribers. Just add them to your topic's folder.

Let's create some example subscribers to the `user_created` event:
```bash
mkdir less/topics/user_created/send_welcome_email
mkdir less/topics/user_created/send_to_analytics
```

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/topics/user_created/send_welcome_email/index.js
    ```
    
    ```js title="less/topics/user_created/send_welcome_email/index.js" showLineNumbers
    exports.process = async () => { };
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```bash
    touch less/topics/user_created/send_welcome_email/__init__.py
    ```

    ```py title="less/topics/user_created/send_welcome_email/__init__.py" showLineNumbers
    def process(message):
      pass
    ```
  </TabItem>
  
</Tabs>

## Send Messages to Topics

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    Import `topics` from `@chuva.io/less` to send messages to all subscribers.

    ```js showLineNumbers
    const { topics } = require('@chuva.io/less');

    await topics.user_created.publish(message);
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    Import `topics` from `less` to send messages to all subscribers.
    
    ```py showLineNumbers
    from less import topics

    topics.user_created.publish(message);
    ```
  </TabItem>
  
</Tabs>



















## Cross-Application Fanout
Less also allows one application to susbscribe to topics from another. This makes it easier than ever to build **distributed**, **fault-tolerant**, **event-driven** **microservices**.

### Subscribe to External Topics
Create an `external_topics` folder inside of `less` to set up your external app connections.

```bash
mkdir -p less/external_topics
```

Next, add the projects you want to connect to to the `external_topics` folder. The folder name should match the name of the application you want to connect to. For example, here we're connecting to the `user_management_service` application.

```bash
mkdir less/external_topics/user_management_service
```

:::info In contrast to topics in the `less/topics` folder, we are not creating topics here. In this case we are simply connecting to a topic from the specified application.
:::

Finally, add the specific topic you want to connect to to the application folder. Here, for example, we connect to the `user_created` topic from the `user_management_service`.

```bash
mkdir less/external_topics/user_management_service/user_created
```

Now you can create your topic subscribers. The steps are the same as regular topics.

```bash
mkdir less/external_topics/user_management_service/user_created/create_friend_suggestions
```

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/external_topics/user_management_service/user_created/create_friend_suggestions/index.js
    ```
    
    ```js title="less/external_topics/user_management_service/user_created/create_friend_suggestions/index.js" showLineNumbers
    exports.process = async () => { };
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```bash
    touch less/external_topics/user_management_service/user_created/create_friend_suggestions/__init__.py
    ```

    ```py title="less/external_topics/user_management_service/user_created/create_friend_suggestions/__init__.py" showLineNumbers
    def process(message):
      pass
    ```
  </TabItem>
  
</Tabs>

## Publish to your Topics via HTTP

Less allows you to publish to your topics through an HTTP request. This capability stems from Less automatically generating a specific API for your topics. When you deploy your project, Less creates an API for your topics, generating an API endpoint with a route that supports the POST method.

```
  POST /topics/{topic_id}
```

#### Example:
##### Deploying a project with topics
```
[less] Building... ⚙️
[less] Build complete ✅
[less] Deploying... 🚀
[less] Deployment complete ✅
[less] Resources
[less]   - API URLs
[less]     - Chat: https://a2m1n3.execute-api.eu-west-1.amazonaws.com
[less]     - Topics: https://n1s3n2.execute-api.eu-west-1.amazonaws.com
[less] 🇨🇻
```
Following the project deployment, a Topic API is generated. Utilizing this API endpoint, you can seamlessly publish to your topics. 

```
curl --request POST \
  --url https://n1s3n2.execute-api.eu-west-1.amazonaws.com/topics/send_message \
  --header 'Content-Type: application/json' \
  --data '{
    "email": "example@email.com",
    "message": "This is the content of the new topic."
  }'
```