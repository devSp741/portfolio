-- Migration 01: Contact Messages Table & Policies
create table if not exists contact_messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  project_type text default 'General enquiry',
  budget text default 'Not decided',
  message text not null,
  is_read boolean default false
);

alter table contact_messages enable row level security;

drop policy if exists "Allow public insert" on contact_messages;
create policy "Allow public insert" on contact_messages
  for insert to anon, authenticated with check (true);

drop policy if exists "Allow read messages" on contact_messages;
create policy "Allow read messages" on contact_messages
  for select to anon, authenticated using (true);

drop policy if exists "Allow update messages" on contact_messages;
create policy "Allow update messages" on contact_messages
  for update to anon, authenticated using (true);

drop policy if exists "Allow delete messages" on contact_messages;
create policy "Allow delete messages" on contact_messages
  for delete to anon, authenticated using (true);

