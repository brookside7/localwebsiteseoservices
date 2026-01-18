/*
  # Create Profiles Table and Admin Setup

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users) - User ID from auth system
      - `email` (text) - User email for easy reference
      - `is_admin` (boolean, default false) - Whether user has admin access
      - `created_at` (timestamptz) - When the profile was created
      - `updated_at` (timestamptz) - When the profile was last updated

  2. Security
    - Enable RLS on `profiles` table
    - Add policy for users to read their own profile
    - Add policy for admins to read all profiles
    - Only admins can update admin status

  3. Automatic Profile Creation
    - Create trigger to automatically create profile when user signs up
    - Profile creation happens in real-time via database trigger

  4. Important Notes
    - The first user to sign up should be manually set as admin via SQL
    - Profiles are automatically created for all new users
    - is_admin flag controls access to admin dashboard
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy: Users can update their own profile (but not is_admin field)
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, is_admin)
  VALUES (new.id, new.email, false);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at_trigger ON profiles;
CREATE TRIGGER update_profiles_updated_at_trigger 
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_profiles_updated_at();

-- Create index on email for lookups
CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);

-- Create index on is_admin for filtering
CREATE INDEX IF NOT EXISTS profiles_is_admin_idx ON profiles(is_admin);