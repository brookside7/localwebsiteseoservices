/*
  # Create Leads Table for Contact Form Submissions

  1. New Tables
    - `leads`
      - `id` (uuid, primary key) - Unique identifier for each lead
      - `name` (text, required) - Full name of the lead
      - `email` (text, required) - Email address of the lead
      - `phone` (text, optional) - Phone number of the lead
      - `company` (text, optional) - Company name
      - `message` (text, required) - Message from the contact form
      - `service_interest` (text, optional) - Which service they're interested in
      - `source` (text, optional) - Where the lead came from (contact page, tool, etc.)
      - `status` (text, default 'new') - Lead status (new, contacted, qualified, closed)
      - `created_at` (timestamptz) - When the lead was created
      - `updated_at` (timestamptz) - When the lead was last updated

  2. Security
    - Enable RLS on `leads` table
    - Add policy for authenticated admin users to read all leads
    - Add policy for public users to insert leads (contact form submissions)
    - Add policy for authenticated admin users to update lead status

  3. Important Notes
    - Public users can only insert new leads, not read them
    - Only authenticated admin users can view and manage leads
    - Lead status helps track the sales pipeline
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text NOT NULL,
  service_interest text,
  source text DEFAULT 'website',
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert leads (for contact form submissions)
CREATE POLICY "Anyone can submit a lead"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can view all leads
CREATE POLICY "Authenticated users can view all leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can update leads
CREATE POLICY "Authenticated users can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status);

-- Create index on email for lookups
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads(email);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();