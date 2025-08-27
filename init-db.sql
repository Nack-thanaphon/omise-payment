-- Initialize database and create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create sample seats for testing
INSERT INTO seats (id, seat_number, row, section, seat_type, price, status, description, is_active, created_at, updated_at) 
VALUES 
  (uuid_generate_v4(), 'A1', 'A', 'Front', 'premium', 1500.00, 'available', 'Front row premium seat', true, NOW(), NOW()),
  (uuid_generate_v4(), 'A2', 'A', 'Front', 'premium', 1500.00, 'available', 'Front row premium seat', true, NOW(), NOW()),
  (uuid_generate_v4(), 'A3', 'A', 'Front', 'premium', 1500.00, 'available', 'Front row premium seat', true, NOW(), NOW()),
  (uuid_generate_v4(), 'B1', 'B', 'Middle', 'vip', 1200.00, 'available', 'VIP section seat', true, NOW(), NOW()),
  (uuid_generate_v4(), 'B2', 'B', 'Middle', 'vip', 1200.00, 'available', 'VIP section seat', true, NOW(), NOW()),
  (uuid_generate_v4(), 'B3', 'B', 'Middle', 'vip', 1200.00, 'available', 'VIP section seat', true, NOW(), NOW()),
  (uuid_generate_v4(), 'B4', 'B', 'Middle', 'vip', 1200.00, 'available', 'VIP section seat', true, NOW(), NOW()),
  (uuid_generate_v4(), 'C1', 'C', 'Back', 'regular', 800.00, 'available', 'Regular seat', true, NOW(), NOW()),
  (uuid_generate_v4(), 'C2', 'C', 'Back', 'regular', 800.00, 'available', 'Regular seat', true, NOW(), NOW()),
  (uuid_generate_v4(), 'C3', 'C', 'Back', 'regular', 800.00, 'available', 'Regular seat', true, NOW(), NOW()),
  (uuid_generate_v4(), 'C4', 'C', 'Back', 'regular', 800.00, 'available', 'Regular seat', true, NOW(), NOW()),
  (uuid_generate_v4(), 'C5', 'C', 'Back', 'regular', 800.00, 'available', 'Regular seat', true, NOW(), NOW()),
  (uuid_generate_v4(), 'D1', 'D', 'Back', 'regular', 600.00, 'available', 'Economy seat', true, NOW(), NOW()),
  (uuid_generate_v4(), 'D2', 'D', 'Back', 'regular', 600.00, 'available', 'Economy seat', true, NOW(), NOW()),
  (uuid_generate_v4(), 'D3', 'D', 'Back', 'regular', 600.00, 'available', 'Economy seat', true, NOW(), NOW())
ON CONFLICT DO NOTHING;
