/*
  # Create Lead Submissions Table

  1. New Tables
    - `lead_submissions`
      - `id` (uuid, primary key) - Unique identifier for each lead
      - `name` (text) - Full name of the lead
      - `email` (text) - Email address
      - `phone` (text) - Phone number
      - `insurance_type` (text) - Type of insurance interested in
      - `message` (text) - Additional message/details
      - `city` (text) - Detected city from geolocation
      - `state` (text) - Detected state from geolocation
      - `ip_address` (text) - IP address for tracking
      - `user_agent` (text) - Browser user agent
      - `created_at` (timestamptz) - Submission timestamp
      - `status` (text) - Lead status (new, contacted, converted, etc.)
      
  2. Security
    - Enable RLS on `lead_submissions` table
    - Add policy for service role to insert leads (public form submissions)
    - Add policy for authenticated users to read all leads (admin access)
*/

-- Create lead submissions table
CREATE TABLE IF NOT EXISTS lead_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  insurance_type text NOT NULL,
  message text,
  city text,
  state text,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new',
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_status CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed'))
);

-- Enable RLS
ALTER TABLE lead_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to insert leads (public form submissions)
CREATE POLICY "Anyone can submit leads"
  ON lead_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to read all leads
CREATE POLICY "Authenticated users can view all leads"
  ON lead_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users to update lead status
CREATE POLICY "Authenticated users can update leads"
  ON lead_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_lead_submissions_created_at ON lead_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_submissions_status ON lead_submissions(status);
CREATE INDEX IF NOT EXISTS idx_lead_submissions_email ON lead_submissions(email);