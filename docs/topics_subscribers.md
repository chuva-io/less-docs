---
sidebar_position: 8
tags: ['distributed system', 'fault-tolerant', 'event-driven', 'microservice', 'pub/sub', 'topic', 'event', 'queue', 'async', 'publisher', 'subscriber', 'processor']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Topics / Subscribers (Pub / Sub)

Less makes it easy to set up topics and subscribers (pub/sub) giving you powerful features by default:
- Publish messages with at-least-once delivery guarantees.
- Failed messages are retained by Less in order to be processed again later.
- Failed messages to not block the processing of subsequent messages.
- Easily implement the Fanout arquitectural pattern.
- Publish and subscribe to topics from different Less applications securely.
- Easily build event-driven microservices.
- Generated Topics REST API allowing you to publish messages from anywhere.
- Easily integrate with your existing systems.
- Easily scale and distribute your workloads.

## Create Topics

In order to create topics (publishers) and subscribers you need to create a `topics` folder in `less`. Each folder inside of `topics` is your topic.

```bash
mkdir -p less/topics
```

Let's create a `user_created` topic:
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
    exports.process = async (user) => {
      console.log(`Sending a welcome email to ${user.email}`);
    };
    ```

    ```js title="less/topics/user_created/send_to_analytics/index.js" showLineNumbers
    exports.process = async (user) => {
      console.log(`Sending user "${user.name}" to analytics`);
    };
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```bash
    touch less/topics/user_created/send_welcome_email/__init__.py
    ```

    ```py title="less/topics/user_created/send_welcome_email/__init__.py" showLineNumbers
    def process(user):
      print(f"Sending a welcome email to {user['email']}")
    ```

    ```py title="less/topics/user_created/send_to_analytics/__init__.py" showLineNumbers
    def process(user):
      print(f"Sending user \"{user['name']}\" to analytics")
    ```
  </TabItem>
  
</Tabs>

## Send Messages to Topics
Less offers 2 ways to send messages to topics:
1. Using the `topics` module in the Less SDK.
2. Using the Less Topics REST API.

### Send Messages Using the SDK
Use the Less `topics` module to send messages to all of a topic's subscribers.

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```js showLineNumbers
    const { topics } = require('@chuva.io/less');

    await topics.user_created.publish(message);
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    Import `topics` from `less` to send messages to all subscribers.
    
    ```py showLineNumbers
    from less import topics

    topics.user_created.publish(message)
    ```
  </TabItem>
</Tabs>

---

Let's create a `POST /users` route that will send the user payload to the `user_created` topic.
<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
  ```bash
  touch less/apis/demo/users/post.js
  ```
  
  ```js {1,11-13} title="less/apis/demo/users/post.js" showLineNumbers
  const { topics } = require('@chuva.io/less');

  exports.process = async (request, response) => {
    // Get the user payload from the body.
    const user = JSON.parse(request.body);
    
    // Pretend to create a new user.
    const new_user = { id: 'my-fake-id', ...user };

    // Publish the new user to the `user_created` topic.
    await topics.user_created.publish(new_user);
  };
  ```
  </TabItem>

  <TabItem value="py" label="Python">
  ```bash
  touch less/apis/demo/users/post.py
  ```

  ```py title="less/apis/demo/users/post.py" showLineNumbers
  import json

  def process(request, response):
    body = json.loads(request['body'])
    user = body['user']
    user['id'] = 'my-fake-id'
    topics.user_created.publish(user)
  ```
  </TabItem>

</Tabs>

:::info Less REST API Documentation
Read the [Less REST API documentation](/rest-apis) to learn more.
:::

You can now deploy and call your `POST /users` route and confirm that your subscribers are receiving the messages:

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

2. Execute your `POST /users` request.
```bash
curl -X POST -d '{"name": "Mayra Andrade", "email": "mayra.andrade@chuva.io"}' [BASE_URL]/users
```

3. Check your subscriber logs and confirm your messages were received.
<Tabs groupId="package-manager" queryString="package-manager">

  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli log --project my-less-project --path topics/user_created/send_welcome_email
    npx @chuva.io/less-cli log --project my-less-project --path topics/user_created/send_to_analytics
    ```
  </TabItem>

  <TabItem value="npm" label="npm">
    ```bash
    npm i -g @chuva.io/less-cli
    less-cli log --project my-less-project --path topics/user_created/send_welcome_email
    less-cli log --project my-less-project --path topics/user_created/send_to_analytics
    ```
  </TabItem>

  <TabItem value="yarn" label="yarn">
    ```bash
    yarn global add @chuva.io/less-cli
    less-cli log --project my-less-project --path topics/user_created/send_welcome_email
    less-cli log --project my-less-project --path topics/user_created/send_to_analytics
    ```
  </TabItem>

</Tabs>

:::info Less Logs Documentation
Read the [Less logs documentation](/cli/function-logs) to learn more.
:::

### Send Messages Using the REST API
When using the Topics feature, Less automatically creates a Topics REST API for you. You can use the API to publish messages to your Topics from anywhere, making it easy to integrate Less with your existing systems.

1. Deploy your topics.
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

2. Retrieve your Topics API URL from your deployment output:
```
[less-cli] Deployment complete ✅
[less-cli] Resources
[less-cli]   - API URLs
[less-cli]     - Topics: https://[PROJECT_NAME]-topics.api.eu-0.a83b464c9.less.chuva.cv
[less-cli] 🇨🇻
```

3. Send a message to your `user_created` topic using the `POST /topics/{topic_name}` route.
```bash
curl -X POST -d '{"name": "Mayra Andrade", "email": "mayra.andrade@chuva.io"}' [TOPICS_BASE_URL]/topics/user_created
```

4. Check your subscriber logs and confirm your messages were received.
<Tabs groupId="package-manager" queryString="package-manager">

  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli log --project my-less-project --path topics/user_created/send_welcome_email
    npx @chuva.io/less-cli log --project my-less-project --path topics/user_created/send_to_analytics
    ```
  </TabItem>

  <TabItem value="npm" label="npm">
    ```bash
    npm i -g @chuva.io/less-cli
    less-cli log --project my-less-project --path topics/user_created/send_welcome_email
    less-cli log --project my-less-project --path topics/user_created/send_to_analytics
    ```
  </TabItem>

  <TabItem value="yarn" label="yarn">
    ```bash
    yarn global add @chuva.io/less-cli
    less-cli log --project my-less-project --path topics/user_created/send_welcome_email
    less-cli log --project my-less-project --path topics/user_created/send_to_analytics
    ```
  </TabItem>

</Tabs>

```
  POST /topics/{topic_id}
```

## Handling Failing Messages
Less automatically retains failed messages and tries to process them again later.

In order to see this in action we can force a crash in one of our subscribers:
<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/topics/user_created/send_welcome_email/index.js
    ```
    
    ```js title="less/topics/user_created/send_welcome_email/index.js" showLineNumbers
    exports.process = async (user) => {
      throw new Error('This subscriber will fail to process messages.');
      console.log(`Sending a welcome email to ${user.email}`);
    };
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```bash
    touch less/topics/user_created/send_welcome_email/__init__.py
    ```

    ```py title="less/topics/user_created/send_welcome_email/__init__.py" showLineNumbers
    def process(user):
      raise SyntaxError('This subscriber will fail to process messages.')
      print(f"Sending a welcome email to {user['email']}")
    ```
  </TabItem>
  
</Tabs>

Deploy the change and publish another message to your topic. You will notice that while the `user_create/send_welcome_email` subscriber is failing, the `user_create/send_to_analytics` subscriber is working just fine.

Once we fix the crash and deploy we will notice that the previously failing message will be processed successfully.

## Cross-Application Topics
Less also makes it easy to subscribe to topics from different Less applications. This makes it easier than ever to build **distributed**, **fault-tolerant**, **event-driven** **microservices**.

### Subscribe to External Topics

1. Create an `external_topics` folder inside of `less` to set up your external app connections.
```bash
mkdir -p less/external_topics
```

2. Add the projects you want to connect to to the `external_topics` folder.
```bash
mkdir less/external_topics/my_less_project
```

3. Add the topic want to subscribe to to the respective project folder.
```bash
mkdir less/external_topics/my_less_project/user_created
```

4. Create your subscriber
<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/external_topics/my_less_project/user_created/index.js
    ```
    
    ```js title="less/external_topics/my_less_project/user_created/notify_friends/index.js" showLineNumbers
    exports.process = async (user) => {
      console.log('Telling all your friends that you have joined...');
    };
    ```
  </TabItem>  
</Tabs>

5. Configure your project connection.
Add the folder name to the `less.config` file as an environment variable. The value of this variable should match the name of the application you want to connect to.
```yaml
env_vars:
  - MY_LESS_PROJECT
```

Export the name of the application (deployment) you want to connect to. This allows you to point your application to different deployments (development, stage, production, etc.).
```bash
export MY_LESS_PROJECT=my_less_project
```

:::info Less Environment Variables Documentation
Read the [Less environment variables documentation](/environment-variables) to learn more.
:::


:::info In contrast to topics in the `less/topics` folder, we are not creating topics here. In this case we are simply connecting to a topic from the specified application.
:::

You can now deploy your new application. Publish messages to the first application and verify they are received in your new external subscriber.
