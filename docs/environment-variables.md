---
sidebar_position: 10
---

# Environment Variables

In case you need access to environment variables in your code you will need to declare them in your `less.config` file in the root of your project.

*Note: The `AWS_` prefix is reserved for environment variables.*

```yaml
env_vars:
   - HASH_SECRET
   - POSTGRES_URL
   - MONGO_DB_URL
```
