-- KaarYab Afghanistan - Supabase Database Schema

-- Run this SQL in Supabase SQL Editor to set up your database
-- Dashboard → SQL Editor → New query → Paste this → Run



-- 1. OPPORTUNITIES TABLE
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

-- 2. SAVED OPPORTUNITIES TABLE
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

-- 3. INDEXES (for faster queries)

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

-- 4. AUTO-UPDATE TIMESTAMP TRIGGER
-- Automatically updates updated_at when a row is modified

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to opportunities table
DROP TRIGGER IF EXISTS update_opportunities_updated_at ON opportunities;
CREATE TRIGGER update_opportunities_updated_at
  BEFORE UPDATE ON opportunities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- 5. ROW LEVEL SECURITY (RLS)
-- Enable RLS on all tables

ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_opportunities ENABLE ROW LEVEL SECURITY;


-- 6. SECURITY POLICIES
-- Note: Since we use Clerk for authentication (not Supabase Auth),
-- security is enforced at the application layer.
-- These policies allow public access for the app to function.

-- Drop existing policies (if any) to avoid conflicts
DROP POLICY IF EXISTS "Anyone can read opportunities" ON opportunities;
DROP POLICY IF EXISTS "Anyone can insert opportunities" ON opportunities;
DROP POLICY IF EXISTS "Anyone can update opportunities" ON opportunities;
DROP POLICY IF EXISTS "Anyone can delete opportunities" ON opportunities;

DROP POLICY IF EXISTS "Anyone can read saved" ON saved_opportunities;
DROP POLICY IF EXISTS "Anyone can save" ON saved_opportunities;
DROP POLICY IF EXISTS "Anyone can unsave" ON saved_opportunities;

-- OPPORTUNITIES POLICIES
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

-- SAVED OPPORTUNITIES POLICIES
CREATE POLICY "Anyone can read saved"
  ON saved_opportunities FOR SELECT
  USING (true);

CREATE POLICY "Anyone can save"
  ON saved_opportunities FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can unsave"
  ON saved_opportunities FOR DELETE
  USING (true);


-- SETUP COMPLETE! 
-- ============================================================================
-- Next steps:
-- 1. Copy your Supabase URL and Anon Key to .env.local
-- 2. Run: npm run seed (to add sample opportunities)
-- 3. Run: npm run dev (to start the app)