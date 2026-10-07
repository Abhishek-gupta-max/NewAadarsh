-- database/seeds/README.md (as SQL comment file)
-- See database/seeds/README.md for guidance.
--
-- SEED TEMPLATE — Development & Staging Only
-- DO NOT run seed files against the production database.
--
-- Copy this file and rename: seed_<table>_<description>.sql
-- Example: seed_job_requirements_sample_data.sql

-- ─── Seed metadata ────────────────────────────────────────────────────────────
-- Seed:        <name>
-- Table(s):    <table names>
-- Environment: development | staging (NOT production)
-- Author:      <name>
-- Date:        <date>

-- ─── Seed data ────────────────────────────────────────────────────────────────

-- <INSERT statements here>
-- Example:
-- INSERT INTO job_requirements (position_title, description, requirements, experience_needed, salary_range, location, status)
-- VALUES
--   ('Software Engineer', 'Build and maintain web applications.', 'Node.js, React', '2+ years', '30,000 - 50,000 INR/month', 'Delhi', 'active'),
--   ('HR Executive', 'Handle recruitment and employee relations.', 'HR degree, communication skills', '1+ year', '20,000 - 30,000 INR/month', 'Mumbai', 'active');

-- ─── Cleanup (optional rollback) ─────────────────────────────────────────────
-- DELETE FROM job_requirements WHERE position_title IN ('Software Engineer', 'HR Executive');
