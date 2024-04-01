---
sidebar_position: 9
tags: ['cron', 'job', 'schedule']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CRON Jobs

## Create CRON Job

In order to create CRON jobs, just add a `crons` folder to `less`. Each CRON job is just another folder inside of `less/crons`.

Here's an example of a `generate_daily_report` CRON job.
```bash
mkdir -p less/crons/generate_daily_report
```

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/crons/generate_daily_report/index.js
    ```
    
    ```js title="less/crons/generate_daily_report/index.js" showLineNumbers
    exports.process = async () => {
      console.log('Generating report...');
    };
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```bash
    touch less/crons/generate_daily_report/__init__.py
    ```

    ```py title="less/crons/generate_daily_report/__init__.py" showLineNumbers
    def process():
      # Your code here
    ```
  </TabItem>
  
</Tabs>

## Set CRON Schedule
In order to set the CRON schedule you will need to configure them as [Environment Variables](/environment-variables). The name of the variable should be `CRON_` + the uppercase CRON folder name.

In the example of the `generate_daily_report` CRON the envoronment variable would be `CRON_GENERATE_DAILY_REPORT`:

```bash
export CRON_GENERATE_DAILY_REPORT="0 0 * * ? *"
```

:::note Remember to add the env var to your less.config.
```bash
touch less.config
```

```yaml title="less.config" 
env_vars:
   - CRON_GENERATE_DAILY_REPORT
```

:::info Less Configuration Documentation
Read the [Less configuration documentation](/configuration#environment-variables) to learn more about setting up environment variables.
:::

:::tip
Visit the [AWS Cron expressions reference](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cron-expressions.html) for CRON expression syntax documentation.
:::
