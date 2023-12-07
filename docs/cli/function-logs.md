---
sidebar_position: 2
tags: ['logs']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Logs

The `log` command is a part of the `less-cli`. It is used to fetches and logs the function logs based on the specified project and function path.

## Usage

Here's an example of how to use the `log` command:

```bash
less-cli log --project hello-api --path apis/demo/hello/get
```

## Options

The `log` command accepts the following options:

- `--project <projectName>`: This option allows you to specify the name of your project for which you want to list the logs.
- `--path <functionPath>`: This option allows you to specify the path of the function for which you want to log.

## Output example

```bash
2023-11-29 15:00:22.938 START RequestId: 15e6099b-b101-4574-ab62-b848c967ee29 Version: $LATEST
2023-11-29 15:00:22.956 2023-11-29T16:00:22.956Z 15e6099b-b101-4574-ab62-b848c967ee29 ERROR Error: test error
    at Object.process (/var/task/get.js:9:15)
    at Runtime.exports.handler (/var/task/handler_get.js:27:38)
    at Runtime.handleOnceNonStreaming (file:///var/runtime/index.mjs:1173:29)
2023-11-29 15:00:22.997 END RequestId: 15e6099b-b101-4574-ab62-b848c967ee29
2023-11-29 15:00:22.997 REPORT RequestId: 15e6099b-b101-4574-ab62-b848c967ee29 Duration: 58.87 ms Billed Duration: 59 ms Memory Size: 128 MB Max Memory Used: 58 MB Init Duration: 177.97 ms 
2023-11-29 15:00:28.006 2023-11-29T16:00:28.006Z 009b82d3-41a6-4b3e-abba-35e6d1628939 ERROR Error: test error
    at Object.process (/var/task/get.js:9:15)
    at Runtime.exports.handler (/var/task/handler_get.js:27:38)
    at Runtime.handleOnceNonStreaming (file:///var/runtime/index.mjs:1173:29)
2023-11-29 15:00:28.006 START RequestId: 009b82d3-41a6-4b3e-abba-35e6d1628939 Version: $LATEST
2023-11-29 15:00:28.017 END RequestId: 009b82d3-41a6-4b3e-abba-35e6d1628939
2023-11-29 15:00:28.017 REPORT RequestId: 009b82d3-41a6-4b3e-abba-35e6d1628939 Duration: 12.37 ms Billed Duration: 13 ms Memory Size: 128 MB Max Memory Used: 59 MB
```

:::tip Tip
Please note that you need to replace `<projectName>` and `<functionPath>` with your actual project name and function path respectively.
:::
