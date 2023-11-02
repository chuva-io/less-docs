---
sidebar_position: 7
---

# Fanout (Pub/Sub)

Less makes it easy to set up pub-sub. Messages are guaranteed to be sent to all subscribers at least once. Messages that fail to process will be retained by Less in order to be delivered again later, automatically. In this case, new messages will continue to be processed.

In order to create publishers and subscribers you need to create a `topics` folder in `less`. Each folder inside of `topics` will be your topic/publisher.

```bash
─ less
  └─ topics
     └─ user_created
```

A topic can have several subscribers. Just add them to your topic folder.

```bash
─ less
  └─ topics
     └─ user_created
        └─ send_welcome_email
        └─ send_to_analytics
```

## Cross-Application Fanout (Pub/Sub)

Less also allows one application to connect to topics from others. This makes it easier than ever to build distributed, fault-tolerant, event-driven microservices.

In order to connect to another project start by creating an `external_topics` folder inside of `less`.

```bash
─ less
  └─ external_topics
```

Next, add the projects you want to connect to to the `external_topics` folder. The folder name should be the name of the application you want to connect to. For example, here we're connecting to a `payment_service` application.

```bash
─ less
  └─ external_topics
     └─ payment_service
```

Finally, add the specific topic you want to connect to to the application folder. Here, for example, we connect to the `payment_processed` topic from the `payment_service` application.

```bash
─ less
  └─ external_topics
     └─ payment_service
        └─ payment_processed
```

And add your processors.

```bash
─ less
  └─ external_topics
     └─ payment_service
        └─ payment_processed
           └─ create_receipt
```

<aside>
:::tip In contrast to topics in the `topics` folder, we are not creating topics here. In this case we are simply connecting to a topic from the specified application.
:::

</aside>

## Deploy

