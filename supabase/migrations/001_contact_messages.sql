-- Lightweight contact inbox for danweihmiller.com
-- Run in Supabase SQL Editor or via CLI after project creation.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  context text,
  is_read boolean not null default false,
  email_delivered boolean,
  email_error text
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

create index if not exists contact_messages_is_read_idx
  on public.contact_messages (is_read);

alter table public.contact_messages enable row level security;

-- No public insert/select: the Express API uses the service role key.
-- Logged-in admin users (Supabase Auth) can manage messages in the portal.

create policy "Admins can read contact messages"
  on public.contact_messages
  for select
  to authenticated
  using (true);

create policy "Admins can update contact messages"
  on public.contact_messages
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Admins can delete contact messages"
  on public.contact_messages
  for delete
  to authenticated
  using (true);
