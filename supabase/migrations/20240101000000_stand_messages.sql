create table if not exists stand_messages (
  id uuid default gen_random_uuid() primary key,
  stand_id text not null,
  profile_id uuid references auth.users(id) not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table stand_messages enable row level security;

-- Create policies
create policy "Enable read access for all users" on stand_messages
  for select using (true);

create policy "Enable insert for authenticated users only" on stand_messages
  for insert with check (auth.role() = 'authenticated');

-- Realtime broadcast
alter publication supabase_realtime add table stand_messages;
