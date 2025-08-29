-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- Create initial user (if needed)
-- INSERT INTO users (id, email, name) VALUES (uuid_generate_v4(), 'admin@jobtracker.com', 'Admin');
