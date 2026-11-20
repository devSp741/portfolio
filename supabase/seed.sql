-- Supabase Local / CI Seed File
-- Run during local setup or CI testing

insert into test_table (title, status, notes)
values
  ('Seeded test record', 'success', 'Seed script executed properly')
on conflict do nothing;

