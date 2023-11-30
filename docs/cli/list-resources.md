---
sidebar_position: 3
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
[less-cli]      - Demo: https://3izstmbced.execute-api.eu-west-1.amazonaws.com/production
[less-cli] WEBSOCKET URLs
[less-cli]      - ChatSocketApi: wss://pr9fbdgwve.execute-api.eu-west-1.amazonaws.com/production
```
