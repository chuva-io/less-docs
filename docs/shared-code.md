---
sidebar_position: 9
---

# Shared Code

We have not seen how to write code yet but we should note that code processors for each resource are completely isolated serverless functions. As such they cannot import one another since once deployed they won't have access to one another. In order to share code between serverless functions, Less allows you to create shared modules. Simply add each of your shared modules to the `shared` folder in `less` and all of you functions will be able to import them.

```bash
─ less
  └─ shared
     └─ models
     └─ database_clients
     └─ helpers
```

## Deploy

