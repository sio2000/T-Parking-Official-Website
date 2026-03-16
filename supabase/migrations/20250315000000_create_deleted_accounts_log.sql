-- Table to log account deletions for admin dashboard statistics
-- Run this in Supabase SQL Editor: Dashboard > SQL Editor > New Query

CREATE TABLE IF NOT EXISTS public.deleted_accounts_log (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  email text,
  deleted_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT deleted_accounts_log_pkey PRIMARY KEY (id)
);

-- Enable RLS but allow service_role full access (default)
ALTER TABLE public.deleted_accounts_log ENABLE ROW LEVEL SECURITY;

-- service_role bypasses RLS - no policies needed for admin/Netlify

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_deleted_accounts_log_deleted_at 
  ON public.deleted_accounts_log(deleted_at DESC);
