---
sidebar_position: 15
tags: ['jamstack']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Custom Domains
Less also allows you to configure your DNS settings in order to use a custom domain with your static websites. Use the following command to get new NS records for your custom domain:
```bash
npx @chuva.io/less-cli domains --project-name PROJECT_NAME --static-name STATIC_NAME --custom-domain CUSTOM_DOMAIN
```

For example, if we want to use a custom domain `demo-website.com` for the `demo-website` website in our `my-less-project` application, we can use the following command:
```bash
npx @chuva.io/less-cli domains --project-name my-less-project --static-name demo-website --custom-domain demo-website.com
```

Resulting in the following example output:
```bash
[less-cli] Connecting to the Less Server...
[less-cli] NS Records
┌─────────┬──────┬────────────────────────────────────┬───────────────────────────┐
│ (index) │ type │                name                │           value           │
├─────────┼──────┼────────────────────────────────────┼───────────────────────────┤
│    0    │ 'NS' │ 'demo-website.com'                 │ 'ns-000.exampledns.org'   │
│    1    │ 'NS' │ 'demo-website.com'                 │ 'ns-000.exampledns.net'   │
│    2    │ 'NS' │ 'demo-website.com'                 │ 'ns-000.exampledns.co.uk' │
│    3    │ 'NS' │ 'demo-website.com'                 │ 'ns-000.exampledns.com'   │
└─────────┴──────┴────────────────────────────────────┴───────────────────────────┘
```
Add the NS records to your DNS provider and wait for the DNS to propagate.

:::info
Most DNS updates take effect within an hour, but could take up to 48 hours to update globally.
:::
