---
sidebar_position: 4
tags: ['projects', 'resources']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# List Resources

The `list resources` command fetches and lists the resources based on the specified project_id.

## Usage

Here's an example of how to use the `list resources` command:

```bash
less-cli list resources demo-api
```

## Output example

After running the `less-cli list resources <project_id>` command, you might see output similar to this:

```bash
[less-cli] API URLs
[less-cli]      - Demo: https://[PROJECT_NAME]-[API_NAME].api.eu-0.a83b464c9.less.chuva.cv
[less-cli] WEBSOCKET URLs
[less-cli]      - ChatSocketApi: wss://[PROJECT_NAME]-[SOCKET_NAME].ws.eu-0.a83b464c9.less.chuva.cv
```
