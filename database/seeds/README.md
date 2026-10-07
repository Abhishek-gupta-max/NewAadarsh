# Database Seeds

This directory contains sample/seed data scripts for **development and staging only**.

> [!CAUTION]
> **NEVER** run seed scripts against the **production** database (`u624959623_newadarsh`). Seed data may overwrite or conflict with real data.

## Usage

```bash
# Connect to your local development database
mysql -h localhost -u root -p newaadarsh_dev

# Review the seed file
cat database/seeds/<filename>.sql

# Apply the seed (copy and paste the INSERT statements)
```

## Available Seeds

| File | Table(s) | Description |
|------|----------|-------------|
| `_seed_template.sql` | — | Template for new seed files |
| _(none yet)_ | — | — |

## Creating a New Seed

1. Copy `_seed_template.sql`
2. Rename: `seed_<table>_<description>.sql`
3. Fill in the INSERT statements
4. Add a cleanup/rollback section
5. Test locally before committing
