---
sidebar_position: 10
---

# Environment Variables

In case you need access to environment variables in your code you will need to declare them in your `less.config` file in the root of your project.

```bash
touch less.config
```

```yaml title="less.config" 
env_vars:
   - HASH_SECRET
   - POSTGRES_URL
```

:::note 
The `AWS_` prefix is reserved for environment variables and should not be used.
:::
