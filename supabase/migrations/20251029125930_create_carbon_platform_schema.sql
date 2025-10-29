/*
  # Create Carbon Platform Database Schema

  ## Overview
  This migration creates the complete database schema for the carbon emissions tracking and trading platform.

  ## New Tables Created

  ### 1. emission_records
  - `id` (uuid, primary key) - Unique identifier for each emission record
  - `cluster` (text) - Geographic/organizational cluster (urban, industry, etc.)
  - `home_id` (text) - Type identifier (home, industry)
  - `device_id` (text, unique) - Unique device identifier
  - `emission_kg` (numeric) - Carbon emissions in kilograms
  - `credits_signed` (numeric) - Signed carbon credits amount
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record last update timestamp

  ### 2. carbon_credit_transfers
  - `id` (uuid, primary key) - Unique identifier for each transfer
  - `transferred_by` (text) - Device ID that transferred credits
  - `received_by` (text) - Device ID that received credits
  - `credit_kg` (numeric) - Amount of credits transferred in kg
  - `transfer_date` (timestamptz) - When the transfer occurred
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. users
  - `id` (uuid, primary key) - Links to auth.users
  - `email` (text) - User email address
  - `role` (text) - User role (company, auditor, admin, domestic)
  - `full_name` (text) - User's full name
  - `created_at` (timestamptz) - Account creation date
  - `updated_at` (timestamptz) - Last profile update

  ### 4. devices
  - `id` (uuid, primary key) - Unique device identifier
  - `device_id` (text, unique) - Human-readable device ID
  - `owner_id` (uuid) - References users table
  - `device_type` (text) - Type of device (home, industry)
  - `cluster` (text) - Geographic/organizational cluster
  - `is_active` (boolean) - Device status
  - `created_at` (timestamptz) - Device registration date
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security (RLS Policies)

  All tables have Row Level Security enabled with appropriate policies:
  
  ### emission_records
  - Users can view all emission records
  - Only authenticated users with 'company' or 'admin' role can insert records
  - Only record owners can update their own records
  
  ### carbon_credit_transfers
  - Users can view all transfers
  - Only authenticated users can create transfers
  
  ### users
  - Users can view all user profiles
  - Users can only update their own profile
  
  ### devices
  - Users can view all devices
  - Only device owners can insert/update their devices

  ## Indexes
  - Created indexes on frequently queried columns for optimal performance
  - Foreign key constraints ensure data integrity
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create emission_records table
CREATE TABLE IF NOT EXISTS emission_records (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  cluster text NOT NULL,
  home_id text NOT NULL,
  device_id text UNIQUE NOT NULL,
  emission_kg numeric NOT NULL DEFAULT 0,
  credits_signed numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create carbon_credit_transfers table
CREATE TABLE IF NOT EXISTS carbon_credit_transfers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  transferred_by text NOT NULL,
  received_by text NOT NULL,
  credit_kg numeric NOT NULL,
  transfer_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('company', 'auditor', 'admin', 'domestic')),
  full_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create devices table
CREATE TABLE IF NOT EXISTS devices (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  device_id text UNIQUE NOT NULL,
  owner_id uuid REFERENCES users(id) ON DELETE SET NULL,
  device_type text NOT NULL CHECK (device_type IN ('home', 'industry')),
  cluster text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_emission_records_device_id ON emission_records(device_id);
CREATE INDEX IF NOT EXISTS idx_emission_records_home_id ON emission_records(home_id);
CREATE INDEX IF NOT EXISTS idx_emission_records_cluster ON emission_records(cluster);
CREATE INDEX IF NOT EXISTS idx_carbon_transfers_transferred_by ON carbon_credit_transfers(transferred_by);
CREATE INDEX IF NOT EXISTS idx_carbon_transfers_received_by ON carbon_credit_transfers(received_by);
CREATE INDEX IF NOT EXISTS idx_devices_device_id ON devices(device_id);
CREATE INDEX IF NOT EXISTS idx_devices_owner_id ON devices(owner_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Enable Row Level Security
ALTER TABLE emission_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE carbon_credit_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;

-- RLS Policies for emission_records
CREATE POLICY "Anyone can view emission records"
  ON emission_records FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Companies and admins can insert emission records"
  ON emission_records FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('company', 'admin')
    )
  );

CREATE POLICY "Users can update their own emission records"
  ON emission_records FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM devices
      WHERE devices.device_id = emission_records.device_id
      AND devices.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM devices
      WHERE devices.device_id = emission_records.device_id
      AND devices.owner_id = auth.uid()
    )
  );

-- RLS Policies for carbon_credit_transfers
CREATE POLICY "Anyone can view carbon credit transfers"
  ON carbon_credit_transfers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create transfers"
  ON carbon_credit_transfers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for users
CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for devices
CREATE POLICY "Anyone can view devices"
  ON devices FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own devices"
  ON devices FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own devices"
  ON devices FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to automatically update updated_at
CREATE TRIGGER update_emission_records_updated_at BEFORE UPDATE ON emission_records
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_devices_updated_at BEFORE UPDATE ON devices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();