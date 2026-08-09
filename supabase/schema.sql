-- KaarYab Afghanistan - Complete Database Schema
-- Run this SQL in Supabase SQL Editor to set up your database
-- Dashboard → SQL Editor → New query → Paste this → Run


-- 1. AUTO-UPDATE TIMESTAMP FUNCTION
-- MUST be created FIRST because tables use it
-- Automatically updates updated_at when a row is modified

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- 2. OPPORTUNITIES TABLE
-- Stores all opportunity postings (jobs, scholarships, internships, etc.)

CREATE TABLE IF NOT EXISTS opportunities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,

  -- Basic Info
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  logo TEXT,

  -- Classification
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Remote', 'On-site', 'Hybrid')),

  -- Dates
  deadline DATE NOT NULL,
  posted_date DATE DEFAULT CURRENT_DATE,

  -- Content
  short_desc TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',

  -- Application
  apply_link TEXT NOT NULL,
  contact_email TEXT,
  contact_phone TEXT,

  -- Optional Details
  salary TEXT,
  duration TEXT,
  seats INTEGER,
  gender TEXT DEFAULT 'Any' CHECK (gender IN ('Any', 'Male', 'Female')),
  language TEXT DEFAULT 'Any' CHECK (language IN ('Any', 'Dari', 'Pashto', 'English')),

  -- Flags
  featured BOOLEAN DEFAULT FALSE,
  urgent BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,

  -- Stats
  views INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,

  -- SEO
  slug TEXT UNIQUE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- 3. SAVED OPPORTUNITIES TABLE
-- Stores user's saved/bookmarked opportunities

CREATE TABLE IF NOT EXISTS saved_opportunities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  opportunity_id TEXT NOT NULL,
  opportunity_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Prevent duplicate saves
  UNIQUE(user_id, opportunity_id)
);


-- 4. APPLICATION TRACKER TABLE
-- Tracks user applications through different stages (Kanban board)

CREATE TABLE IF NOT EXISTS application_tracker (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,

  -- Opportunity reference
  opportunity_id TEXT NOT NULL,
  opportunity_data JSONB NOT NULL,

  -- Application status
  status TEXT NOT NULL DEFAULT 'interested'
    CHECK (status IN ('interested', 'applied', 'interview', 'accepted', 'rejected')),

  -- Optional user notes
  notes TEXT,

  -- Timeline tracking
  applied_date DATE,
  interview_date DATE,
  decision_date DATE,

  -- Priority level
  priority TEXT DEFAULT 'medium'
    CHECK (priority IN ('low', 'medium', 'high')),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Prevent duplicate tracking
  UNIQUE(user_id, opportunity_id)
);


-- 5. INDEXES (for faster queries)

-- Opportunities indexes
CREATE INDEX IF NOT EXISTS idx_opportunities_user_id
  ON opportunities(user_id);

CREATE INDEX IF NOT EXISTS idx_opportunities_category
  ON opportunities(category);

CREATE INDEX IF NOT EXISTS idx_opportunities_location
  ON opportunities(location);

CREATE INDEX IF NOT EXISTS idx_opportunities_type
  ON opportunities(type);

CREATE INDEX IF NOT EXISTS idx_opportunities_deadline
  ON opportunities(deadline);

CREATE INDEX IF NOT EXISTS idx_opportunities_created_at
  ON opportunities(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_opportunities_featured
  ON opportunities(featured) WHERE featured = true;

CREATE INDEX IF NOT EXISTS idx_opportunities_slug
  ON opportunities(slug);

-- Saved opportunities indexes
CREATE INDEX IF NOT EXISTS idx_saved_user_id
  ON saved_opportunities(user_id);

CREATE INDEX IF NOT EXISTS idx_saved_opportunity_id
  ON saved_opportunities(opportunity_id);

CREATE INDEX IF NOT EXISTS idx_saved_created_at
  ON saved_opportunities(created_at DESC);

-- Application tracker indexes
CREATE INDEX IF NOT EXISTS idx_tracker_user_id
  ON application_tracker(user_id);

CREATE INDEX IF NOT EXISTS idx_tracker_status
  ON application_tracker(status);

CREATE INDEX IF NOT EXISTS idx_tracker_opportunity_id
  ON application_tracker(opportunity_id);

CREATE INDEX IF NOT EXISTS idx_tracker_created_at
  ON application_tracker(created_at DESC);


-- 6. TRIGGERS (Auto-update timestamps)

-- Opportunities trigger
DROP TRIGGER IF EXISTS update_opportunities_updated_at ON opportunities;
CREATE TRIGGER update_opportunities_updated_at
  BEFORE UPDATE ON opportunities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Application tracker trigger
DROP TRIGGER IF EXISTS update_tracker_updated_at ON application_tracker;
CREATE TRIGGER update_tracker_updated_at
  BEFORE UPDATE ON application_tracker
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- 7. ROW LEVEL SECURITY (RLS)
-- Enable RLS on all tables

ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_tracker ENABLE ROW LEVEL SECURITY;


-- 8. SECURITY POLICIES
-- Note: Since we use Clerk for authentication (not Supabase Auth),
-- security is enforced at the application layer.

-- Drop existing opportunities policies
DROP POLICY IF EXISTS "Anyone can read opportunities" ON opportunities;
DROP POLICY IF EXISTS "Anyone can insert opportunities" ON opportunities;
DROP POLICY IF EXISTS "Anyone can update opportunities" ON opportunities;
DROP POLICY IF EXISTS "Anyone can delete opportunities" ON opportunities;

-- Drop existing saved policies
DROP POLICY IF EXISTS "Anyone can read saved" ON saved_opportunities;
DROP POLICY IF EXISTS "Anyone can save" ON saved_opportunities;
DROP POLICY IF EXISTS "Anyone can unsave" ON saved_opportunities;

-- Drop existing tracker policies
DROP POLICY IF EXISTS "Anyone can read tracker" ON application_tracker;
DROP POLICY IF EXISTS "Anyone can insert tracker" ON application_tracker;
DROP POLICY IF EXISTS "Anyone can update tracker" ON application_tracker;
DROP POLICY IF EXISTS "Anyone can delete tracker" ON application_tracker;


-- Opportunities policies
CREATE POLICY "Anyone can read opportunities"
  ON opportunities FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert opportunities"
  ON opportunities FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update opportunities"
  ON opportunities FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete opportunities"
  ON opportunities FOR DELETE
  USING (true);


-- Saved opportunities policies
CREATE POLICY "Anyone can read saved"
  ON saved_opportunities FOR SELECT
  USING (true);

CREATE POLICY "Anyone can save"
  ON saved_opportunities FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can unsave"
  ON saved_opportunities FOR DELETE
  USING (true);


-- Application tracker policies
CREATE POLICY "Anyone can read tracker"
  ON application_tracker FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert tracker"
  ON application_tracker FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update tracker"
  ON application_tracker FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete tracker"
  ON application_tracker FOR DELETE
  USING (true);


-- SETUP COMPLETE!
-- Tables Created:
--   opportunities        → Main opportunity postings
--   saved_opportunities  → User bookmarks
--   application_tracker  → Kanban board tracking
--
-- Next steps:
-- 1. Copy your Supabase URL and Anon Key to .env.local
-- 2. Run: npm run seed (to add sample opportunities)
-- 3. Run: npm run dev (to start the app)