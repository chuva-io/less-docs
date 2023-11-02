---
sidebar_position: 8
---

# CRON Jobs

In order to create CRON jobs, just add a `crons` folder to `less`. Each CRON job is just another folder inside of `less/crons/`.

```bash
─ less
  └─ crons
     └─ backup_database
     └─ generate_daily_report
```

In order to set the CRON schedules you will need to configure them as [environment variables](/environment-variables). The name of the variable should be *CRON_* + the uppercase folder name.

```bash
$ export CRON_BACKUP_DATABASE="0 * * * ? *"
$ export CRON_GENERATE_DAILY_REPORT="0 0 * * ? *"
```

## Deploy

