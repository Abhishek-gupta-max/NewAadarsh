-- database/schemas/schema.sql
--
-- Read-only documentation of the existing MySQL database schema.
-- DO NOT run this against a production database — it is documentation only.
-- The backend never executes DDL statements.
--
-- Source: database/README.md + SHOW CREATE TABLE (local development copy)
-- Production database: u624959623_newadarsh on Hostinger MySQL

-- ─── applications ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `applications` (
  `id`           INT           NOT NULL AUTO_INCREMENT,
  `name`         VARCHAR(100)  NOT NULL,
  `email`        VARCHAR(100)  NOT NULL,
  `phone`        VARCHAR(20)   NOT NULL,
  `job_position` VARCHAR(100)  NOT NULL,
  `experience`   VARCHAR(100)  NOT NULL,
  `resume_file`  VARCHAR(255)  DEFAULT NULL COMMENT 'e.g. resume_1791220172_f9423ded.pdf',
  `file_path`    VARCHAR(255)  DEFAULT NULL COMMENT 'e.g. uploads/resumes/resume_1791220172_f9423ded.pdf',
  `message`      LONGTEXT      DEFAULT NULL,
  `created_at`   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status`       VARCHAR(50)   NOT NULL DEFAULT 'pending' COMMENT 'pending | approved | rejected',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── contact_messages ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id`         INT           NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(150)  NOT NULL,
  `email`      VARCHAR(150)  NOT NULL,
  `phone`      VARCHAR(50)   NOT NULL,
  `subject`    VARCHAR(255)  DEFAULT NULL,
  `message`    TEXT          NOT NULL,
  `created_at` TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── job_requirements ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `job_requirements` (
  `id`               INT           NOT NULL AUTO_INCREMENT,
  `position_title`   VARCHAR(150)  NOT NULL,
  `description`      LONGTEXT      DEFAULT NULL,
  `requirements`     TEXT          DEFAULT NULL,
  `experience_needed` VARCHAR(100) DEFAULT NULL,
  `salary_range`     VARCHAR(100)  DEFAULT NULL,
  `location`         VARCHAR(150)  DEFAULT NULL,
  `status`           VARCHAR(50)   NOT NULL DEFAULT 'active' COMMENT 'active | inactive',
  `created_at`       TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`       TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── jobs (legacy — read-only) ────────────────────────────────────────────────
-- Used by GET /api/jobs as a fallback when job_requirements is empty/missing.
-- Do NOT write to this table from the backend.
CREATE TABLE IF NOT EXISTS `jobs` (
  `id`              INT           NOT NULL AUTO_INCREMENT,
  `title`           VARCHAR(255)  DEFAULT NULL,
  `slug`            VARCHAR(255)  DEFAULT NULL,
  `company_name`    VARCHAR(255)  DEFAULT NULL,
  `job_location`    VARCHAR(255)  DEFAULT NULL,
  `salary`          VARCHAR(100)  DEFAULT NULL,
  `experience`      VARCHAR(100)  DEFAULT NULL,
  `job_type`        VARCHAR(50)   DEFAULT NULL,
  `category`        VARCHAR(100)  DEFAULT NULL,
  `description`     LONGTEXT      DEFAULT NULL,
  `requirements`    TEXT          DEFAULT NULL,
  `vacancies`       VARCHAR(100)  DEFAULT NULL,
  `featured_image`  VARCHAR(255)  DEFAULT NULL,
  `status`          VARCHAR(50)   DEFAULT 'active',
  `created_at`      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Other tables (not used by backend) ──────────────────────────────────────
-- company_info, contacts, recruitment_area, website_visitors
-- These exist in the production DB but the backend does not read/write them.
-- Omitted from this schema file intentionally.
