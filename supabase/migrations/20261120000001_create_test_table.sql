-- Migration 02: Test Table for automated migration verification
create table if not exists test_table (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  status text default 'active',
  notes text default 'Auto-migrated via GitHub Actions'
);

-- Enable Row Level Security
alter table test_table enable row level security;

-- Policies for test_table
drop policy if exists "Allow public read test_table" on test_table;
create policy "Allow public read test_table" on test_table
  for select to anon, authenticated using (true);

drop policy if exists "Allow public insert test_table" on test_table;
create policy "Allow public insert test_table" on test_table
  for insert to anon, authenticated with check (true);

-- Test seed row (table create hone ke saath ye row bhi insert ho jayegi)
insert into test_table (title, status, notes)
values
  ('First automated test record', 'success', 'Agar ye row Supabase me dikh rahi hai toh automated migration successful ho chuki hai!'),
  ('GitHub Actions test', 'active', 'Automated push to Supabase verified successfully')
on conflict do nothing;

