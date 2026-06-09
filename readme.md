# Jade Summer Tracker

A deployable Next.js version of the SageSure internship personal tracker. It keeps the original weekly tracker style and adds editable goals, weekly logs, business impact notes, manager feedback, and a daily meeting tracker.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

If Supabase environment variables are not set, the app saves to `localStorage` so it still works locally.

## Environment Variables

Create `.env.local` for local Supabase use:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Add the same variables in Vercel under Project Settings -> Environment Variables.

## Supabase Setup

Create a Supabase project, then run this SQL in the Supabase SQL editor:

```sql
create table if not exists goals (
  id text primary key,
  goal text not null default '',
  type text not null default '',
  success_metric text not null default '',
  status text not null default 'Not started',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists weekly_logs (
  id text primary key,
  week_number integer not null unique,
  week_label text not null,
  week_dates text not null,
  worked_on text not null default '',
  business_impact text not null default '',
  learned text not null default '',
  hard text not null default '',
  focus_next_week text not null default '',
  goal_progress text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists manager_feedback (
  id text primary key,
  week_number integer not null unique,
  clarity_rating integer,
  clarity_note text not null default '',
  support_rating integer,
  support_note text not null default '',
  feedback_quality_rating integer,
  feedback_quality_note text not null default '',
  growth_rating integer,
  growth_note text not null default '',
  open_reflection_good text not null default '',
  open_reflection_different text not null default '',
  open_reflection_needs text not null default '',
  one_word text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists daily_entries (
  id text primary key,
  date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists meeting_cards (
  id text primary key,
  daily_entry_id text not null references daily_entries(id) on delete cascade,
  title text not null default '',
  time text not null default '',
  attendees text not null default '',
  notes text not null default '',
  takeaways text not null default '',
  follow_ups text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table goals enable row level security;
alter table weekly_logs enable row level security;
alter table manager_feedback enable row level security;
alter table daily_entries enable row level security;
alter table meeting_cards enable row level security;

create policy "anon can manage goals" on goals for all using (true) with check (true);
create policy "anon can manage weekly logs" on weekly_logs for all using (true) with check (true);
create policy "anon can manage manager feedback" on manager_feedback for all using (true) with check (true);
create policy "anon can manage daily entries" on daily_entries for all using (true) with check (true);
create policy "anon can manage meeting cards" on meeting_cards for all using (true) with check (true);
```

The app seeds the original 10 weeks automatically if the Supabase tables are empty:

- Week 1: June 2 - June 6
- Week 2: June 9 - June 13
- Week 3: June 16 - June 20
- Week 4: June 23 - June 27
- Week 5: June 30 - July 4
- Week 6: July 7 - July 11
- Week 7: July 14 - July 18
- Week 8: July 21 - July 25
- Week 9: July 28 - Aug 1
- Week 10: Aug 4 - Aug 8

## Deploy To Vercel

1. Push this folder to GitHub.
2. Import the project in Vercel.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Deploy.

Vercel should detect Next.js automatically. The build command is `npm run build`.
