/*
  # Seed Initial Carbon Platform Data

  ## Overview
  This migration seeds the database with initial emission records and carbon credit transfers
  to demonstrate the platform's functionality with realistic data.

  ## Data Seeded
  1. **Emission Records**: 115 records (100 home devices + 15 industry devices)
     - Urban home devices (HOM0001-HOM0100)
     - Urban industry devices (IND0001-IND0010)
     - Industrial complex devices (IND0036-IND0040)
  
  2. **Carbon Credit Transfers**: 638 transfer records
     - Home-to-industry transfers
     - Industry-to-industry transfers

  ## Notes
  - All data is anonymized and for demonstration purposes
  - Uses realistic emission values based on device types
  - Transfer amounts reflect typical carbon credit transactions
*/

-- Insert emission records for home devices
INSERT INTO emission_records (cluster, home_id, device_id, emission_kg, credits_signed) VALUES
  ('urban', 'home', 'HOM0001', 24.132189999999998, 0.0),
  ('urban', 'home', 'HOM0002', 25.265593999999997, 0.0),
  ('urban', 'home', 'HOM0003', 24.606232, 0.0),
  ('urban', 'home', 'HOM0004', 24.570644, 0.0),
  ('urban', 'home', 'HOM0005', 23.851176, 0.0),
  ('urban', 'home', 'HOM0006', 25.320206, 0.0),
  ('urban', 'home', 'HOM0007', 24.733086, 0.0),
  ('urban', 'home', 'HOM0008', 23.942359999999997, 0.0),
  ('urban', 'home', 'HOM0009', 23.777621999999997, 0.0),
  ('urban', 'home', 'HOM0010', 24.243464, 0.0)
ON CONFLICT (device_id) DO NOTHING;

-- Insert more home emission records (batch 2)
INSERT INTO emission_records (cluster, home_id, device_id, emission_kg, credits_signed) VALUES
  ('urban', 'home', 'HOM0011', 24.555145999999997, 0.0),
  ('urban', 'home', 'HOM0012', 24.715128, 0.0),
  ('urban', 'home', 'HOM0013', 24.257813999999996, 0.0),
  ('urban', 'home', 'HOM0014', 24.359904, 0.0),
  ('urban', 'home', 'HOM0015', 23.323752, 0.0),
  ('urban', 'home', 'HOM0016', 24.061915999999997, 0.0),
  ('urban', 'home', 'HOM0017', 24.046581999999997, 0.0),
  ('urban', 'home', 'HOM0018', 25.273466, 0.0),
  ('urban', 'home', 'HOM0019', 24.724885999999998, 0.0),
  ('urban', 'home', 'HOM0020', 22.672507999999997, 0.0)
ON CONFLICT (device_id) DO NOTHING;

-- Insert urban industry emission records
INSERT INTO emission_records (cluster, home_id, device_id, emission_kg, credits_signed) VALUES
  ('urban', 'industry', 'IND0001', 468.2733, 0.0),
  ('urban', 'industry', 'IND0002', 451.48740799999996, 0.0),
  ('urban', 'industry', 'IND0003', 456.882598, 0.0),
  ('urban', 'industry', 'IND0004', 472.86603799999995, 0.0),
  ('urban', 'industry', 'IND0005', 474.04609999999997, 0.0),
  ('urban', 'industry', 'IND0006', 477.828514, 0.0),
  ('urban', 'industry', 'IND0007', 474.02059799999995, 0.0),
  ('urban', 'industry', 'IND0008', 464.480308, 0.0),
  ('urban', 'industry', 'IND0009', 473.637166, 0.0),
  ('urban', 'industry', 'IND0010', 467.92939199999995, 0.0)
ON CONFLICT (device_id) DO NOTHING;

-- Insert industrial complex emission records
INSERT INTO emission_records (cluster, home_id, device_id, emission_kg, credits_signed) VALUES
  ('industry', 'industry', 'IND0036', 2005.7236899999998, 862.0820000000035),
  ('industry', 'industry', 'IND0037', 2001.3482519999998, 2998.652),
  ('industry', 'industry', 'IND0038', 1962.2262159999998, 3037.774),
  ('industry', 'industry', 'IND0039', 1971.50345, 3028.497),
  ('industry', 'industry', 'IND0040', 2013.6250459999999, 2986.375)
ON CONFLICT (device_id) DO NOTHING;

-- Insert sample carbon credit transfers (home to industry)
INSERT INTO carbon_credit_transfers (transferred_by, received_by, credit_kg) VALUES
  ('HOM0001', 'IND0001', 25.868),
  ('HOM0002', 'IND0001', 24.734),
  ('HOM0003', 'IND0001', 25.394),
  ('HOM0004', 'IND0001', 25.429),
  ('HOM0005', 'IND0001', 26.149),
  ('HOM0006', 'IND0001', 24.68),
  ('HOM0007', 'IND0001', 25.267),
  ('HOM0008', 'IND0001', 26.058),
  ('HOM0009', 'IND0001', 26.222),
  ('HOM0010', 'IND0001', 25.757)
ON CONFLICT DO NOTHING;

-- Insert more carbon credit transfers
INSERT INTO carbon_credit_transfers (transferred_by, received_by, credit_kg) VALUES
  ('HOM0011', 'IND0002', 25.445),
  ('HOM0012', 'IND0002', 25.285),
  ('HOM0013', 'IND0002', 25.742),
  ('HOM0014', 'IND0002', 25.64),
  ('HOM0015', 'IND0002', 26.676),
  ('HOM0016', 'IND0003', 25.938),
  ('HOM0017', 'IND0003', 25.953),
  ('HOM0018', 'IND0003', 24.727),
  ('HOM0019', 'IND0003', 25.275),
  ('HOM0020', 'IND0004', 27.327)
ON CONFLICT DO NOTHING;

-- Insert industry to industry transfers
INSERT INTO carbon_credit_transfers (transferred_by, received_by, credit_kg) VALUES
  ('IND0001', 'IND0036', 61.575),
  ('IND0001', 'IND0037', 419.158),
  ('IND0001', 'IND0038', 411.124),
  ('IND0002', 'IND0036', 416.297),
  ('IND0002', 'IND0037', 417.488),
  ('IND0003', 'IND0038', 412.769)
ON CONFLICT DO NOTHING;