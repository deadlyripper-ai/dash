-- ========================================================
-- Inception Efficiency Dashboard — Supabase Schema
-- ========================================================

-- ===== SYNC METADATA =====
CREATE TABLE IF NOT EXISTS sync_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source          TEXT NOT NULL,
  status          TEXT NOT NULL,
  records_synced  INTEGER DEFAULT 0,
  error_message   TEXT,
  started_at      TIMESTAMPTZ DEFAULT NOW(),
  completed_at    TIMESTAMPTZ,
  triggered_by    TEXT DEFAULT 'cron'
);

-- ===== KPI CACHE =====
CREATE TABLE IF NOT EXISTS kpi_cache (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pillar      TEXT NOT NULL,
  metric_key  TEXT NOT NULL,
  value       NUMERIC,
  target      NUMERIC,
  unit        TEXT,
  trend       TEXT,
  trend_pct   NUMERIC,
  status      TEXT,
  label       TEXT,
  source      TEXT,
  period      TEXT,
  as_of_date  DATE,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (pillar, metric_key)
);

-- ===== PIPELINE CACHE (D365 Sales) =====
CREATE TABLE IF NOT EXISTS pipeline_deals (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crm_id          TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  account_name    TEXT,
  stage           TEXT,
  stage_pct       INTEGER,
  tcv             NUMERIC,
  arr             NUMERIC,
  close_date      DATE,
  owner_name      TEXT,
  owner_email     TEXT,
  status          TEXT,
  created_at_crm  TIMESTAMPTZ,
  synced_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ===== PROJECTS CACHE (Monday.com) =====
CREATE TABLE IF NOT EXISTS project_cache (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  monday_id       TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  status          TEXT,
  owner           TEXT,
  team            TEXT,
  start_date      DATE,
  due_date        DATE,
  completion_pct  INTEGER DEFAULT 0,
  csat_score      NUMERIC,
  pillar          TEXT,
  synced_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ===== SPRINT CACHE (Monday.com Dev Boards) =====
CREATE TABLE IF NOT EXISTS sprint_cache (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  monday_id       TEXT UNIQUE NOT NULL,
  sprint_name     TEXT,
  velocity        NUMERIC,
  planned_pts     NUMERIC,
  completed_pts   NUMERIC,
  start_date      DATE,
  end_date        DATE,
  synced_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ===== OKR CACHE (WorkBoard) =====
CREATE TABLE IF NOT EXISTS okr_objectives (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workboard_id    TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  owner_name      TEXT,
  owner_team      TEXT,
  pillar          TEXT,
  period          TEXT,
  progress_pct    NUMERIC,
  status          TEXT,
  synced_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS okr_key_results (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workboard_id    TEXT UNIQUE NOT NULL,
  objective_id    UUID REFERENCES okr_objectives(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  current_value   NUMERIC,
  target_value    NUMERIC,
  unit            TEXT,
  progress_pct    NUMERIC,
  status          TEXT,
  due_date        DATE,
  synced_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ===== FINANCE CACHE (D365 Finance) =====
CREATE TABLE IF NOT EXISTS finance_cache (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_key  TEXT UNIQUE NOT NULL,
  value       NUMERIC,
  period      TEXT,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ===== HEADCOUNT CACHE (Monday / HR system) =====
CREATE TABLE IF NOT EXISTS headcount_cache (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department    TEXT NOT NULL,
  actual_hc     INTEGER,
  planned_hc    INTEGER,
  corp_hc       INTEGER,
  direct_hc     INTEGER,
  utilisation   NUMERIC,
  period_month  DATE,
  UNIQUE (department, period_month)
);

-- ===== INDEXES =====
CREATE INDEX IF NOT EXISTS idx_kpi_pillar      ON kpi_cache(pillar);
CREATE INDEX IF NOT EXISTS idx_deals_status    ON pipeline_deals(status);
CREATE INDEX IF NOT EXISTS idx_deals_close     ON pipeline_deals(close_date);
CREATE INDEX IF NOT EXISTS idx_projects_pillar ON project_cache(pillar);
CREATE INDEX IF NOT EXISTS idx_okr_team        ON okr_objectives(owner_team);
CREATE INDEX IF NOT EXISTS idx_sync_source     ON sync_log(source, started_at DESC);

-- ===== RLS POLICIES =====
ALTER TABLE kpi_cache          ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_deals     ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_cache      ENABLE ROW LEVEL SECURITY;
ALTER TABLE sprint_cache       ENABLE ROW LEVEL SECURITY;
ALTER TABLE okr_objectives     ENABLE ROW LEVEL SECURITY;
ALTER TABLE okr_key_results    ENABLE ROW LEVEL SECURITY;
ALTER TABLE finance_cache      ENABLE ROW LEVEL SECURITY;
ALTER TABLE headcount_cache    ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_log           ENABLE ROW LEVEL SECURITY;

-- Allow authenticated reads for all cache tables
CREATE POLICY "auth_read_kpi"        ON kpi_cache          FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "auth_read_pipeline"   ON pipeline_deals      FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "auth_read_projects"   ON project_cache       FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "auth_read_sprints"    ON sprint_cache        FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "auth_read_okr_obj"    ON okr_objectives      FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "auth_read_okr_kr"     ON okr_key_results     FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "auth_read_finance"    ON finance_cache       FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "auth_read_hc"         ON headcount_cache     FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "auth_read_sync"       ON sync_log            FOR SELECT USING (auth.role() = 'authenticated');
