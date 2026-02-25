-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS TABLE (Linked to auth.users)
create table public.users (
  id uuid references auth.users not null primary key,
  email text not null,
  plan text default 'free' check (plan in ('free', 'pro')),
  ai_generations_done integer default 0,
  last_generation_date date default CURRENT_DATE,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- BUSINESS PROFILE
create table public.business_profile (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  business_name text not null,
  niche text not null,
  primary_goal text not null check (primary_goal in ('Sales', 'Brand Awareness', 'Follower Growth')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CAPTIONS
create table public.captions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  product_name text not null,
  usp text not null,
  platform text not null,
  generated_text text not null,
  tone text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- HOOKS
create table public.hooks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  category text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CALENDAR POSTS
create table public.calendar_posts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  post_date date not null,
  content_type text not null,
  hook text,
  caption_idea text,
  platform text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SALES SCRIPTS
create table public.sales_scripts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  objection text not null,
  response_text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ANALYTICS
create table public.analytics (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  platform text not null,
  engagement_rate numeric,
  posts_count integer default 0,
  recorded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ROW LEVEL SECURITY (RLS)
alter table public.users enable row level security;
alter table public.business_profile enable row level security;
alter table public.captions enable row level security;
alter table public.hooks enable row level security;
alter table public.calendar_posts enable row level security;
alter table public.sales_scripts enable row level security;
alter table public.analytics enable row level security;

-- RLS POLICIES
create policy "Users can view own profile" on public.users for select using ( auth.uid() = id );
create policy "Users can update own profile" on public.users for update using ( auth.uid() = id );

create policy "Users can view own business" on public.business_profile for select using ( auth.uid() = user_id );
create policy "Users can insert own business" on public.business_profile for insert with check ( auth.uid() = user_id );
create policy "Users can update own business" on public.business_profile for update using ( auth.uid() = user_id );

-- Apply basic "User can do anything with their own data" to other tables
DO $$ 
DECLARE 
  t text; 
BEGIN 
  FOR t IN SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('captions', 'hooks', 'calendar_posts', 'sales_scripts', 'analytics')
  LOOP 
    EXECUTE format('CREATE POLICY "Users map own data select" ON public.%I FOR SELECT USING (auth.uid() = user_id);', t);
    EXECUTE format('CREATE POLICY "Users map own data insert" ON public.%I FOR INSERT WITH CHECK (auth.uid() = user_id);', t);
    EXECUTE format('CREATE POLICY "Users map own data update" ON public.%I FOR UPDATE USING (auth.uid() = user_id);', t);
    EXECUTE format('CREATE POLICY "Users map own data delete" ON public.%I FOR DELETE USING (auth.uid() = user_id);', t);
  END LOOP; 
END $$;
