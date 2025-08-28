-- Initialize database and create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM for SeatStatus
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'seat_status_enum') THEN
        CREATE TYPE "seat_status_enum" AS ENUM ('available', 'reserved', 'occupied', 'maintenance');
    END IF;
END
$$;

-- Create seats table
CREATE TABLE IF NOT EXISTS seats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seat_number VARCHAR(50) UNIQUE NOT NULL,
  section VARCHAR(100),
  row VARCHAR(100),
  seat_type VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  status "seat_status_enum" DEFAULT 'available',
  metadata JSON,
  reserved_until TIMESTAMP,
  reserved_by VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create sample seats for testing
INSERT INTO seats (id, seat_number, row, section, seat_type, price, status, metadata, is_active, created_at, updated_at) 
VALUES 
  (uuid_generate_v4(), 'A1', 'A', 'Front', 'premium', 1500.00, 'available', '{"description": "Front row premium seat"}', true, NOW(), NOW()),
  (uuid_generate_v4(), 'A2', 'A', 'Front', 'premium', 1500.00, 'available', '{"description": "Front row premium seat"}', true, NOW(), NOW()),
  (uuid_generate_v4(), 'A3', 'A', 'Front', 'premium', 1500.00, 'available', '{"description": "Front row premium seat"}', true, NOW(), NOW()),
  (uuid_generate_v4(), 'B1', 'B', 'Middle', 'vip', 1200.00, 'available', '{"description": "VIP section seat"}', true, NOW(), NOW()),
  (uuid_generate_v4(), 'B2', 'B', 'Middle', 'vip', 1200.00, 'available', '{"description": "VIP section seat"}', true, NOW(), NOW()),
  (uuid_generate_v4(), 'B3', 'B', 'Middle', 'vip', 1200.00, 'available', '{"description": "VIP section seat"}', true, NOW(), NOW()),
  (uuid_generate_v4(), 'B4', 'B', 'Middle', 'vip', 1200.00, 'available', '{"description": "VIP section seat"}', true, NOW(), NOW()),
  (uuid_generate_v4(), 'C1', 'C', 'Back', 'regular', 800.00, 'available', '{"description": "Regular seat"}', true, NOW(), NOW()),
  (uuid_generate_v4(), 'C2', 'C', 'Back', 'regular', 800.00, 'available', '{"description": "Regular seat"}', true, NOW(), NOW()),
  (uuid_generate_v4(), 'C3', 'C', 'Back', 'regular', 800.00, 'available', '{"description": "Regular seat"}', true, NOW(), NOW()),
  (uuid_generate_v4(), 'C4', 'C', 'Back', 'regular', 800.00, 'available', '{"description": "Regular seat"}', true, NOW(), NOW()),
  (uuid_generate_v4(), 'C5', 'C', 'Back', 'regular', 800.00, 'available', '{"description": "Regular seat"}', true, NOW(), NOW()),
  (uuid_generate_v4(), 'D1', 'D', 'Back', 'regular', 600.00, 'available', '{"description": "Economy seat"}', true, NOW(), NOW()),
  (uuid_generate_v4(), 'D2', 'D', 'Back', 'regular', 600.00, 'available', '{"description": "Economy seat"}', true, NOW(), NOW()),
  (uuid_generate_v4(), 'D3', 'D', 'Back', 'regular', 600.00, 'available', '{"description": "Economy seat"}', true, NOW(), NOW())
ON CONFLICT DO NOTHING;
