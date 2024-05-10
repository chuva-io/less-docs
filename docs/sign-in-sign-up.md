---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sign In / Sign Up

Create your Less account straight from the Less CLI and deploy your first project in seconds.

## Sign Up

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
```

## Sign In

<Tabs groupId="package-manager" queryString="package-manager">
  <TabItem value="npx" label="npx">
    ```bash
    npx @chuva.io/less-cli login
    ```
  </TabItem>

  <TabItem value="npm" label="npm">
    ```bash
    npm i -g @chuva.io/less-cli
    less-cli login
  ```
  </TabItem>

  <TabItem value="yarn" label="yarn">
    ```bash
    yarn global add @chuva.io/less-cli
    less-cli login
    ```
  </TabItem>
</Tabs>

```bash
[less-cli] Enter your email: cesaria@chuva.io
[less-cli] Enter your password: ************
[less-cli] Login successful! Your LESS_TOKEN has been exported to your environment.
```
