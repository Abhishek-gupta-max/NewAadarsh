# Database Migrations

This directory contains schema change scripts for the MySQL database.

> [!IMPORTANT]
> The backend **never executes DDL automatically**. All migrations must be **manually reviewed and applied** by a developer or DBA.

## Migration Rules

1. **Never** `DROP TABLE` or `DROP COLUMN` without explicit approval.
2. **Never** truncate or delete data via a migration.
3. All column additions must use a `DEFAULT` value so existing rows are not broken.
4. Test every migration on a local database copy before applying to production.
5. Maintain a rollback SQL block in every migration file.
6. Name files: `YYYYMMDD_HHMMSS_short_description.sql`

## How to Apply a Migration

```bash
# 1. Connect to the target database
mysql -h <DB_HOST> -u <DB_USER> -p <DB_NAME>

# 2. Review the migration file
cat database/migrations/<filename>.sql

# 3. Apply the Up section only — copy and paste the SQL statements
```

## Migration Log

| File | Applied To | Date | Applied By |
|------|-----------|------|-----------|
| _(no migrations yet)_ | — | — | — |

## Current Schema

See [database/schemas/schema.sql](../schemas/schema.sql) for the full documented schema.
