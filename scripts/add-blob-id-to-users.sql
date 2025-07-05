-- Add blob_id column to users table for voice talent applications
ALTER TABLE users ADD COLUMN IF NOT EXISTS blob_id VARCHAR(255);

-- Create index on blob_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_blob_id ON users(blob_id);

-- Add comment to document the column
COMMENT ON COLUMN users.blob_id IS 'Blob ID from voice talent application API response'; 