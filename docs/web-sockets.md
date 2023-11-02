---
sidebar_position: 5
---

# Web Sockets

In order to create your Web Sockets, add a `sockets` folder to your `less` folder.

```bash
─ less
  └─ sockets
```

Similarly to REST APIs, Less allows you to create several Web Sockets in the same project. In order to create a new socket, add it to the `sockets` folder. For example, to create a Realtime Chat Socket add a folder named `realtime_chat` to `sockets`.

```bash
─ less
  └─ sockets
     └─ realtime_chat
```

## Connect & disconnect processors

When a client connects or disconnects from your socket, the respective `connect` or `disconnect` function will be called, providing the client's `connection_id`.

In order to handle the connect & disconnect events, add your `connect` and `disconnect` folders to your socket.

```bash
─ less
  └─ sockets
     └─ realtime_chat
        └─ connect
        └─ disconnect
```

## Channels

In order to create channels for your socket, add a folder for each channel to your socket folder. Channels allow clients to send messages to your socket. Here's an example of a `public_chat_room` channel:

```bash
─ less
  └─ sockets
     └─ realtime_chat
        └─ connect
        └─ disconnect
        └─ public_chat_room
```

## Deploy

