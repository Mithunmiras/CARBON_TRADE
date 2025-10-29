import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface EmissionRecord {
  id: string;
  cluster: string;
  home_id: string;
  device_id: string;
  emission_kg: number;
  credits_signed: number;
  created_at: string;
  updated_at: string;
}

export interface CarbonCreditTransfer {
  id: string;
  transferred_by: string;
  received_by: string;
  credit_kg: number;
  transfer_date: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  role: 'company' | 'auditor' | 'admin' | 'domestic';
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface Device {
  id: string;
  device_id: string;
  owner_id: string | null;
  device_type: 'home' | 'industry';
  cluster: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
