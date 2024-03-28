---
title: >
  Implementing Microservices Workflows: Choreography Coordination Pattern Using Less
description: >
  In this article I will use Less to demonstrate how to build and deploy a Food Delivery system to AWS using the Choreography Coordination Microservices Pattern. Join me to learn how Less makes complex, fault tolerant, event-driven microservices easily accessible to Engineers of all experience levels with no DevOps.

  Implementation is in Javascript with Python, Go, and Rust examples coming soon.
authors: nilson_nascimento
tags: [systems architecture]
image: https://media.licdn.com/dms/image/D4D03AQE_3kQml2oK4Q/profile-displayphoto-shrink_800_800/0/1680823082808?e=1717027200&v=beta&t=K5qUBKYc03uifuEVT7beYZ3VyCZ_Yq8Mi9nhXIcOOUE
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this article I will use Less to demonstrate how to build and deploy a Food Delivery system to AWS using the Choreography Coordination Microservices Pattern. Join me to learn how Less makes complex, fault tolerant, event-driven microservices easily accessible to Engineers of all experience levels with no DevOps.

Implementation is in Javascript with Python, Go, and Rust examples coming soon.

<!-- truncate -->

I really enjoyed reading Naresh Waswani's article, _[Microservices Workflows: Choreography Coordination Pattern](https://medium.com/simpplr-technology/microservices-workflows-choreography-coordination-pattern-8576b6241a19)_, where he explains very well the benefits, drawbacks, and architectural patterns of these highly responsive, scalable, and fault tolerant systems using a Food Order & Delivery system as an example.

Although the benefits are apparent, building such a system in practice is difficult to pull off. Things like "over-engineered" and "pre-mature optimization" come to mind immediately, not to mention the DevOps costs and extreme complexity that sets a high bar for Junior Engineers.

> Just imagine for a second — someone wants to understand how the overall workflow is implemented and what are the possible alternate paths and error conditions within the workflow. It would be simply crazy :)  
> \- Naresh Waswani

I would love to express how beautiful I find both Waswani's system and article to be! I've researched these systems in thorough detail for almost a decade and appreciate how he has put this work together. I also agree with his fear about things getting quickly out of hand - at least depending on the tools used to implement the system.

The _Microservices Workflows: Choreography Coordination Pattern_ article is unopinionated about any implementation details. In this article I will demonstrate how such a system can be implemented and deployed to AWS using Less. I truly do not believe that there is a faster or easier way to reap the benefits of such a system. Less also gets the drawbacks summarized in Waswani's article under control, does not require DevOps, and is easily accessible to Junior Engineers.

---

Let's follow the steps of the original article in order to create our Food Order System.

Here's what we will be building:
![Placing Food Order using Choreography Coordination Pattern diagram from Waswani's article](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*-4Z5zq5FCaNeFmaG4jgxfg.jpeg)

## Create your Less project
Let's start by creating a project folder.
```bash
mkdir food_delivery_system
```

Then we'll create our `less` folder.
```bash
cd food_delivery_system
mkdir less
```

## 1. Create an order in the Order microservice.
In order to get started we will create a `POST /orders` route which will create an `order` with an `id`.

Let's create our `orders` API with our `POST /orders` route.

```bash
mkdir -p less/apis/orders/orders
touch less/apis/orders/orders/post.js
```

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">  
  ```js title="less/apis/orders/orders/post.js" showLineNumbers
  exports.process = async (request, response) => {
    console.log('[ORDER SERVICE] Creating order');
    response.statusCode = 201;
    return response;
  };
  ```
  </TabItem>
  <TabItem value="python" label="Python">
  :::note
  Python examples will be added soon.
  :::
  </TabItem>
  <TabItem value="go" label="Go">
  :::note
  Go examples will be added soon.
  :::
  </TabItem>
  <TabItem value="rust" label="Rust">
  :::note
  Rust examples will be added soon.
  :::
  </TabItem>
</Tabs>

For simplicity, we'll just pretend to create an order by generating a UUID for the order's ID.

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    <Tabs groupId="package-manager" queryString="package-manager">
      <TabItem value="npm" label="npm">
        ```bash
        npm i uuid
        ```
      </TabItem>
      <TabItem value="yarn" label="yarn">
        ```bash
        yarn add uuid
        ```
      </TabItem>
    </Tabs>
    ```js {1,6,8-11,13,15} title="less/apis/orders/orders/post.js" showLineNumbers
    const { v4: uuid } = require('uuid');

    exports.process = async (request, response) => {
      console.log('[ORDER SERVICE] Creating order');
      
      const request_data = JSON.parse(request.body);
      
      const order = {
        id: uuid(),
        ...request_data
      };
      
      console.log(`[ORDER SERVICE] Created order: ${order.id}`);
      
      response.body = JSON.stringify(order);
      response.statusCode = 201;
      return response;
    };
    ```
  </TabItem>
  <TabItem value="python" label="Python">
  :::note
  Python examples will be added soon.
  :::
  </TabItem>
  <TabItem value="go" label="Go">
  :::note
  Go examples will be added soon.
  :::
  </TabItem>
  <TabItem value="rust" label="Rust">
  :::note
  Rust examples will be added soon.
  :::
  </TabItem>
</Tabs>

Finally we will emit an `order_placed` event allowing the payment service to continue processing the workflow.

Let's create an `order_placed` topic.
```bash
mkdir -p less/topics/order_placed
```

Finally, let's publish the `order` payload to the `order_placed` topic.
<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```js {2,15} title="less/apis/orders/orders/post.js" showLineNumbers
    const { v4: uuid } = require('uuid');
    const { topics } = require('@chuva.io/less');

    exports.process = async (request, response) => {
      console.log('[ORDER SERVICE] Creating order');
      
      const request_data = JSON.parse(request.body);
      
      const order = {
        id: uuid(),
        ...request_data
      };
      
      console.log(`[ORDER SERVICE] Created order: ${order.id}`);
      await topics.order_placed.publish(order);
      
      response.body = JSON.stringify(order);
      response.statusCode = 201;
      return response;
    };
    ```
  </TabItem>
  <TabItem value="python" label="Python">
  :::note
  Python examples will be added soon.
  :::
  </TabItem>
  <TabItem value="go" label="Go">
  :::note
  Go examples will be added soon.
  :::
  </TabItem>
  <TabItem value="rust" label="Rust">
  :::note
  Rust examples will be added soon.
  :::
  </TabItem>
</Tabs>

> If a tree falls and no one hears it, does it make a sound? 🙉

## 2. Process the `order_placed` event in the Payment microservice.

Now that we are able to create orders and we have published our event, let's process it in the payment service.

:::note A few notes
I will not actually be separating the deployments, in other words, creating microservices here. I think Less makes it easy enough to organize and discover the available topics by just looking at the root of the `/less/topics` folder and using prefixes for what can later become a separate microservices (E.g. `/topics/orders_*` or `/topics/payments_*`). With Less, refactoring Payments into a microservice, for example, would be very simple.

Check out the [Cross-Application Topics documentation](/topics_subscribers#cross-application-topics) to learn how subscribe to topics from different microservices.

Since Less is serverless, in terms of performance there is no tradeoff with this decision.
:::

Let's create our topic subscriber.
```bash
mkdir less/topics/order_placed/payment_service_process_payment
```

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/topics/order_placed/payment_service_process_payment/index.js
    ```

    ```js title="less/topics/order_placed/payment_service_process_payment/index.js" showLineNumbers
    exports.process = async (order) => {
      console.log(`[PAYMENT SERVICE] Processing payment for order: ${order.id}`);
      // Process payment...
      console.log(`[PAYMENT SERVICE] Payment succeeded for order: ${order.id}`);
    };
    ```
  </TabItem>
  <TabItem value="python" label="Python">
  :::note
  Python examples will be added soon.
  :::
  </TabItem>
  <TabItem value="go" label="Go">
  :::note
  Go examples will be added soon.
  :::
  </TabItem>
  <TabItem value="rust" label="Rust">
  :::note
  Rust examples will be added soon.
  :::
  </TabItem>
</Tabs>

Once we finish processing our payment we should emit a `payment_success` event.

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```js {1,7} title="less/topics/order_placed/payment_service_process_payment/index.js" showLineNumbers
    const { topics } = require('@chuva.io/less');

    exports.process = async (order) => {
      console.log(`[PAYMENT SERVICE] Processing payment for order: ${order.id}`);
      // Process payment...
      console.log(`[PAYMENT SERVICE] Payment succeeded for order: ${order.id}`);
      await topics.payment_success.publish(order);
    };
    ```
  </TabItem>
  <TabItem value="python" label="Python">
  :::note
  Python examples will be added soon.
  :::
  </TabItem>
  <TabItem value="go" label="Go">
  :::note
  Go examples will be added soon.
  :::
  </TabItem>
  <TabItem value="rust" label="Rust">
  :::note
  Rust examples will be added soon.
  :::
  </TabItem>
</Tabs>

## 3. Process the `payment_success` event in the Restaurant microservice.

Once a payment is successful, the Restaurant microservice continues the workflow by confirming the food order and publishing the `restaurant_confirmed_order` event.

Let's process the `payment_success` event by creating the `restaurant_service_confirm_order` topic subscriber.
```bash
mkdir less/topics/payment_success/restaurant_service_confirm_order
```

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/topics/payment_success/restaurant_service_confirm_order/index.js
    ```

    ```js title="less/topics/payment_success/restaurant_service_confirm_order/index.js" showLineNumbers
    exports.process = async (order) => {
      console.log(`[RESTAURANT SERVICE] Confirming order: ${order.id}`);
      // Confirm order...
      console.log(`[RESTAURANT SERVICE] Order confirmed: ${order.id}`);
    };
    ```
  </TabItem>
  <TabItem value="python" label="Python">
  :::note
  Python examples will be added soon.
  :::
  </TabItem>
  <TabItem value="go" label="Go">
  :::note
  Go examples will be added soon.
  :::
  </TabItem>
  <TabItem value="rust" label="Rust">
  :::note
  Rust examples will be added soon.
  :::
  </TabItem>
</Tabs>

Once we confirm our order we should emit the `restaurant_confirmed_order` event.
<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```js {1,7} title="less/topics/payment_success/restaurant_service_confirm_order/index.js" showLineNumbers
    const { topics } = require('@chuva.io/less');

    exports.process = async (order) => {
      console.log(`[RESTAURANT SERVICE] Confirming order: ${order.id}`);
      // Confirm order...
      console.log(`[RESTAURANT SERVICE] Order confirmed: ${order.id}`);
      await topics.restaurant_confirmed_order.publish(order);
    };
    ```
  </TabItem>
  <TabItem value="python" label="Python">
  :::note
  Python examples will be added soon.
  :::
  </TabItem>
  <TabItem value="go" label="Go">
  :::note
  Go examples will be added soon.
  :::
  </TabItem>
  <TabItem value="rust" label="Rust">
  :::note
  Rust examples will be added soon.
  :::
  </TabItem>
</Tabs>

## 4. Process the `restaurant_confirmed_order` event in the Order, Notification, Delivery Partner, and Loyalty microservices.

Let's quickly create our 4 topic subscribers and their processors.

```bash
mkdir less/topics/restaurant_confirmed_order/order_service_update_order_status
mkdir less/topics/restaurant_confirmed_order/notification_service_notify_user
mkdir less/topics/restaurant_confirmed_order/delivery_partner_service_assign_delivery_partner
mkdir less/topics/restaurant_confirmed_order/loyalty_service_add_loyalty_points
```

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/topics/restaurant_confirmed_order/order_service_update_order_status/index.js
    touch less/topics/restaurant_confirmed_order/notification_service_notify_user/index.js
    touch less/topics/restaurant_confirmed_order/delivery_partner_service_assign_delivery_partner/index.js
    touch less/topics/restaurant_confirmed_order/loyalty_service_add_loyalty_points/index.js
    ```

    ```js title="less/topics/restaurant_confirmed_order/order_service_update_order_status/index.js" showLineNumbers
    exports.process = async (order) => {
      console.log(`[ORDER SERVICE] Updating order confirmation success status: ${order.id}`);
      // Update order...
      console.log(`[ORDER SERVICE] Updated order confirmation success status: ${order.id}`);
    };
    ```
    
    ```js title="less/topics/restaurant_confirmed_order/notification_service_notify_user/index.js" showLineNumbers
    exports.process = async (order) => {
      console.log(`[NOTIFICATION SERVICE] Emailing customer of order success: ${order.id}`);
      // Email customer...
      console.log(`[NOTIFICATION SERVICE] Emailed customer of order success: ${order.id}`);
    };
    ```
    
    ```js title="less/topics/restaurant_confirmed_order/delivery_partner_service_assign_delivery_partner/index.js" showLineNumbers
    exports.process = async (order) => {
      console.log(`[DELIVERY PARTNER SERVICE] Assigning delivery partner: ${order.id}`);
      // Assign delivery partner...
      console.log(`[DELIVERY PARTNER SERVICE] Delivery partner assigned: ${order.id}`);
    };
    ```
    
    ```js title="less/topics/restaurant_confirmed_order/loyalty_service_add_loyalty_points/index.js" showLineNumbers
    exports.process = async (order) => {
      console.log(`[LOYALTY SERVICE] Adding points to wallet: ${order.id}`);
      // Add points to wallet...
      console.log(`[LOYALTY SERVICE] Added points to wallet: ${order.id}`);
    };
    ```
  </TabItem>
  <TabItem value="python" label="Python">
  :::note
  Python examples will be added soon.
  :::
  </TabItem>
  <TabItem value="go" label="Go">
  :::note
  Go examples will be added soon.
  :::
  </TabItem>
  <TabItem value="rust" label="Rust">
  :::note
  Rust examples will be added soon.
  :::
  </TabItem>
</Tabs>

## 5. Publish the `delivery_partner_assigned` event.
Let's make a small update to our `/topics/restaurant_confirmed_order/delivery_partner_service_assign_delivery_partner` topic and publish the `delivery_partner_assigned` event.

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```js {1,7} title="less/topics/restaurant_confirmed_order/delivery_partner_service_assign_delivery_partner/index.js" showLineNumbers
    const { topics } = require('@chuva.io/less');

    exports.process = async (order) => {
      console.log(`[DELIVERY PARTNER SERVICE] Assigning delivery partner: ${order.id}`);
      // Assign delivery partner...
      console.log(`[DELIVERY PARTNER SERVICE] Delivery partner assigned: ${order.id}`);
      await topics.delivery_partner_assigned.publish(order);
    };
    ```
  </TabItem>
  <TabItem value="python" label="Python">
  :::note
  Python examples will be added soon.
  :::
  </TabItem>
  <TabItem value="go" label="Go">
  :::note
  Go examples will be added soon.
  :::
  </TabItem>
  <TabItem value="rust" label="Rust">
  :::note
  Rust examples will be added soon.
  :::
  </TabItem>
</Tabs>

## 6. Process the `delivery_partner_assigned` event in the Order and Notification microservices.
Let's create 2 more processors, this time for the `delivery_partner_assigned` topic.

```bash
mkdir less/topics/delivery_partner_assigned/order_service_update_order_status
mkdir less/topics/delivery_partner_assigned/notification_service_notify_user
```

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/topics/delivery_partner_assigned/order_service_update_order_status/index.js
    touch less/topics/delivery_partner_assigned/notification_service_notify_user/index.js
    ```
    
    ```js title="less/topics/delivery_partner_assigned/order_service_update_order_status/index.js" showLineNumbers
    exports.process = async (order) => {
      console.log(`[ORDER SERVICE] Update delivery status: ${order.id}`);
      // Update delivery status...
      console.log(`[ORDER SERVICE] Updated delivery status: ${order.id}`);
    };
    ```
    
    ```js title="less/topics/delivery_partner_assigned/notification_service_notify_user/index.js" showLineNumbers
    exports.process = async (order) => {
      console.log(`[NOTIFICATION SERVICE] Emailing customer of delivery partner assignment: ${order.id}`);
      // Email customer...
      console.log(`[NOTIFICATION SERVICE] Emailed customer of delivery partner assignment: ${order.id}`);
    };
    ```
  </TabItem>
  <TabItem value="python" label="Python">
  :::note
  Python examples will be added soon.
  :::
  </TabItem>
  <TabItem value="go" label="Go">
  :::note
  Go examples will be added soon.
  :::
  </TabItem>
  <TabItem value="rust" label="Rust">
  :::note
  Rust examples will be added soon.
  :::
  </TabItem>
</Tabs>

---

Up until now we have seen how easy it is to handle success cases between our services, as well as express our system, using Less. 

So far we have a project with the following structure:
```
─ less
  └─ apis
     └─ orders
        └─ orders
  └─ topics
     └─ order_placed
        └─ payment_service_process_payment
     └─ payment_success
        └─ restaurant_service_confirm_order
     └─ restaurant_confirmed_order
        └─ order_service_update_order_status
        └─ notification_service_notify_user
        └─ delivery_partner_service_assign_delivery_partner
        └─ loyalty_service_add_loyalty_points
     └─ delivery_partner_assigned
        └─ order_service_update_order_status
        └─ notification_service_notify_user
```

Compare our folder structure to our system diagram and you will see that going from a system's architectural design to a live implementation is super easy with Less.

![Placing Food Order using Choreography Coordination Pattern diagram from Waswani's article](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*-4Z5zq5FCaNeFmaG4jgxfg.jpeg)

## Handling errors
That was easy! Now let's move on to the error case in which the order could not be processed by the Restaurant microservice and the payment needs to be refunded.

Here is a diagram of the error case:

![Error Handling Diagram from Waswani's article](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*BiE4u3faxbB0ZqOkP_88Mg.jpeg)

Starting from point 3 of the error section of Waswani's article let's see how we can easily handle errors with Less as well.

### 3. Publish a `restaurant_order_confirmation_failed` upon failure.

Let's randomly make our Restaurant service fail to process some orders by updating our `topics/payment_success/restaurant_service_confirm_order` topic processor.

First we'll create a function that will throw an error 50% of the time.

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```js {1-6} title="less/topics/payment_success/restaurant_service_confirm_order/index.js" showLineNumbers
    const confirm_order = (order) => {
      const success = Math.floor(Math.random() * 2) + 1
      if (success === 1) {
        throw new Error(`Failed to confirm order: ${order.id}`);
      }
    };

    exports.process = async (order) => {
      console.log(`[RESTAURANT SERVICE] Confirming order: ${order.id}`);
      // Confirm order...
      console.log(`[RESTAURANT SERVICE] Order confirmed: ${order.id}`);
    };
    ```
  </TabItem>
  <TabItem value="python" label="Python">
  :::note
  Python examples will be added soon.
  :::
  </TabItem>
  <TabItem value="go" label="Go">
  :::note
  Go examples will be added soon.
  :::
  </TabItem>
  <TabItem value="rust" label="Rust">
  :::note
  Rust examples will be added soon.
  :::
  </TabItem>
</Tabs>

Now let's update our code to add our _amazing_ order confirmation implementation.

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```js {11-16} title="less/topics/payment_success/restaurant_service_confirm_order/index.js" showLineNumbers
    const confirm_order = (order) => {
      const success = Math.floor(Math.random() * 2) + 1
      if (success === 1) {
        throw new Error(`Failed to confirm order: ${order.id}`);
      }
    };

    exports.process = async (order) => {
      console.log(`[RESTAURANT SERVICE] Confirming order: ${order.id}`);
      // Confirm order...
      try {
        confirm_order(order);
      } catch (error) {
        console.log(`[RESTAURANT SERVICE] Failed to confirm order: ${order.id}`);
        return;
      }
      console.log(`[RESTAURANT SERVICE] Order confirmed: ${order.id}`);
    };
    ```
  </TabItem>
  <TabItem value="python" label="Python">
  :::note
  Python examples will be added soon.
  :::
  </TabItem>
  <TabItem value="go" label="Go">
  :::note
  Go examples will be added soon.
  :::
  </TabItem>
  <TabItem value="rust" label="Rust">
  :::note
  Rust examples will be added soon.
  :::
  </TabItem>
</Tabs>

:::note
Here we are failing gracefully but if we wanted to take advantage of Less's fault tolerance we could have just let the function crash or thrown an exception and Less would continue to replay the message until it succeeds or expires.

See the [Handling Failing Messages documentation](https://docs.less.chuva.io/topics_subscribers#handling-failing-messages) to learn more about fault tolerance in Less.
:::

### 4. Process the `restaurant_order_confirmation_failed` event in the Payment, Notification, and Order microservices.

Let's create our `restaurant_order_confirmation_failed` topic and update our code to publish the failed order to it.

```bash
mkdir less/topics/restaurant_order_confirmation_failed
```

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```js {1,17} title="less/topics/payment_success/restaurant_service_confirm_order/index.js" showLineNumbers
    const { topics } = require('@chuva.io/less');

    const confirm_order = (order) => {
      const success = Math.floor(Math.random() * 2) + 1
      if (success === 1) {
        throw new Error(`Failed to confirm order: ${order.id}`);
      }
    };

    exports.process = async (order) => {
      console.log(`[RESTAURANT SERVICE] Confirming order: ${order.id}`);
      // Confirm order...
      try {
        confirm_order(order);
      } catch (error) {
        console.log(`[RESTAURANT SERVICE] Failed to confirm order: ${order.id}`);
        await topics.restaurant_order_confirmation_failed.publish(order);
        return;
      }
      console.log(`[RESTAURANT SERVICE] Order confirmed: ${order.id}`);
    };
    ```
  </TabItem>
  <TabItem value="python" label="Python">
  :::note
  Python examples will be added soon.
  :::
  </TabItem>
  <TabItem value="go" label="Go">
  :::note
  Go examples will be added soon.
  :::
  </TabItem>
  <TabItem value="rust" label="Rust">
  :::note
  Rust examples will be added soon.
  :::
  </TabItem>
</Tabs>

Now let's create the processors in each of the Payment, Notification, and Order services.

```bash
mkdir less/topics/restaurant_order_confirmation_failed/order_service_update_order_status
mkdir less/topics/restaurant_order_confirmation_failed/notification_service_notify_user
```

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/topics/restaurant_order_confirmation_failed/payment_service_initiate_payment_reversal/index.js
    touch less/topics/restaurant_order_confirmation_failed/notification_service_notify_user/index.js
    touch less/topics/restaurant_order_confirmation_failed/order_service_update_order_status/index.js
    ```
    
    ```js title="less/topics/restaurant_order_confirmation_failed/payment_service_initiate_payment_reversal/index.js" showLineNumbers
    exports.process = async (order) => {
      console.log(`[PAYMENT SERVICE] Refunding payment for order: ${order.id}`);
      // Refund payment...
      console.log(`[PAYMENT SERVICE] Refunded succeeded for order: ${order.id}`);
    };
    ```
    
    ```js title="less/topics/restaurant_order_confirmation_failed/notification_service_notify_user/index.js" showLineNumbers
    exports.process = async (order) => {
      console.log(`[NOTIFICATION SERVICE] Emailing customer of order cancellation: ${order.id}`);
      // Email customer...
      console.log(`[NOTIFICATION SERVICE] Emailed customer of order cancellation: ${order.id}`);
    };
    ```
    
    ```js title="less/topics/restaurant_order_confirmation_failed/order_service_update_order_status/index.js" showLineNumbers
    exports.process = async (order) => {
      console.log(`[ORDER SERVICE] Updating order cancellation status: ${order.id}`);
      // Update order...
      console.log(`[ORDER SERVICE] Updated order cancellation status: ${order.id}`);
    };
    ```
  </TabItem>
  <TabItem value="python" label="Python">
  :::note
  Python examples will be added soon.
  :::
  </TabItem>
  <TabItem value="go" label="Go">
  :::note
  Go examples will be added soon.
  :::
  </TabItem>
  <TabItem value="rust" label="Rust">
  :::note
  Rust examples will be added soon.
  :::
  </TabItem>
</Tabs>

### 5. Publish a `payment_reversed` event from the Payment microservice.

Let's update the `restaurant_order_confirmation_failed/payment_service_initiate_payment_reversal` processor to emit a `payment_reversed` event.

Once again, we'll create a topic.
```bash
mkdir less/topics/payment_reversed
```

And publish our event.
<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```js {1,7} title="less/topics/restaurant_order_confirmation_failed/payment_service_initiate_payment_reversal/index.js" showLineNumbers
    const { topics } = require('@chuva.io/less');

    exports.process = async (order) => {
      console.log(`[PAYMENT SERVICE] Refunding payment for order: ${order.id}`);
      // Refund payment...
      console.log(`[PAYMENT SERVICE] Refunded succeeded for order: ${order.id}`);
      await topics.payment_reversed.publish(order);
    };
    ```
  </TabItem>
  <TabItem value="python" label="Python">
  :::note
  Python examples will be added soon.
  :::
  </TabItem>
  <TabItem value="go" label="Go">
  :::note
  Go examples will be added soon.
  :::
  </TabItem>
  <TabItem value="rust" label="Rust">
  :::note
  Rust examples will be added soon.
  :::
  </TabItem>
</Tabs>

### 6. Process the `payment_reversed` event in the Notification microservice.

Let's process our final event and finish building our system.

First we need our topic processor.
```bash
mkdir less/topics/payment_reversed/notification_service_notify_user
```

<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/topics/payment_reversed/notification_service_notify_user/index.js
    ```
    
    ```js title="less/topics/payment_reversed/notification_service_notify_user/index.js" showLineNumbers
    exports.process = async (order) => {
      console.log(`[NOTIFICATION SERVICE] Emailing customer of payment reversal: ${order.id}`);
      // Email customer...
      console.log(`[NOTIFICATION SERVICE] Emailed customer of payment reversal: ${order.id}`);
    };
    ```
  </TabItem>
  <TabItem value="python" label="Python">
  :::note
  Python examples will be added soon.
  :::
  </TabItem>
  <TabItem value="go" label="Go">
  :::note
  Go examples will be added soon.
  :::
  </TabItem>
  <TabItem value="rust" label="Rust">
  :::note
  Rust examples will be added soon.
  :::
  </TabItem>
</Tabs>

### Final project structure
Our final project structure looks like this:
```bash {18-23}
─ less
  └─ apis
     └─ orders
        └─ orders
  └─ topics
     └─ order_placed
        └─ payment_service_process_payment
     └─ payment_success
        └─ restaurant_service_confirm_order
     └─ restaurant_confirmed_order
        └─ order_service_update_order_status
        └─ notification_service_notify_user
        └─ delivery_partner_service_assign_delivery_partner
        └─ loyalty_service_add_loyalty_points
     └─ delivery_partner_assigned
        └─ order_service_update_order_status
        └─ notification_service_notify_user
     └─ restaurant_order_confirmation_failed
        └─ order_service_update_order_status
        └─ notification_service_notify_user
        └─ payment_service_initiate_payment_reversal
     └─ payment_reversed
        └─ notification_service_notify_user
```

Let's look at the additions made in comparison with the error diagram:

![Error Handling Diagram from Waswani's article](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*BiE4u3faxbB0ZqOkP_88Mg.jpeg)

> Just imagine for a second — someone wants to understand how the overall workflow is implemented and what are the possible alternate paths and error conditions within the workflow. It would be simply crazy :)  
> \- Naresh Waswani

When using Less I actually find it quite easy to understand how the overall system is architected, mitigating a large part of the disadvantages outlined in Waswani's article.

## Deploy your system

Finally we can deploy our system and test our `POST /orders` route to see our system in action.

<Tabs groupId="package-manager" queryString="package-manager">
  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli deploy choreography-coordination-pattern
    ```
  </TabItem>
  <TabItem value="npm" label="npm">
    ```bash
    npm i -g @chuva.io/less-cli
    less-cli deploy food-delivery-system
    ```
  </TabItem>
  <TabItem value="yarn" label="yarn">
    ```bash
    yarn global add @chuva.io/less-cli
    less-cli deploy food-delivery-system
    ```
  </TabItem>
</Tabs>

:::note
See the [Less Logs documentation](https://docs.less.chuva.io/cli/function-logs) to learn how how to monitor your function logs.
:::

---

I appreciate you reading along! Reach out to me on [Linkedin](https://www.linkedin.com/in/nilsonnascimento/) with any comments or if you would like to talk about Less, microservices, or anything else!
