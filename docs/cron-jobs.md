---
sidebar_position: 8
tags: ['cron', 'job', 'schedule']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CRON Jobs

## Create CRON Job

In order to create CRON jobs, just add a `crons` folder to `less`. Each CRON Job is just another folder inside of `less/crons`.

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
    exports.process = async () => { };
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
In order to set the CRON schedules you will need to configure them as [Environment Variables](/environment-variables). The name of the variable should be `CRON_` + the uppercase CRON folder name.

In the example of the `generate_daily_report` CRON the envoronment variable would be `CRON_GENERATE_DAILY_REPORT`:

```bash
export CRON_GENERATE_DAILY_REPORT="0 0 * * ? *"
```
