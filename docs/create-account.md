---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create Account

Create your Less account straight from the Less CLI and deploy your first project in seconds.

<Tabs groupId="package-manager" queryString="package-manager">
  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli register
    ```
  </TabItem>

  <TabItem value="npm" label="npm">
    ```bash
    npm i -g @chuva.io/less-cli
    less-cli register
  ```
  </TabItem>

  <TabItem value="yarn" label="yarn">
    ```bash
    yarn global add @chuva.io/less-cli
    less-cli register
    ```
  </TabItem>
</Tabs>

Less will create an AWS account for you and email you your credentials once you complete the email verification process. Use your credentials to access your function logs through the AWS console.

```bash
[less-cli] Enter your name: Cesaria Evora
[less-cli] Enter your email: cesaria@chuva.io
[less-cli] Enter your password: ************
[less-cli] Enter the verification code sent to your email: ******
[less-cli] Account verified! Please check your email for your Less credentials.
```

:::note
We are working on bringing log functionality to the CLI to make them easier for you to access.
:::