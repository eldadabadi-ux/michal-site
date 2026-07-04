-- ── Leads ─────────────────────────────────────────────────────────────────────
-- Contact-form submissions from the public website.

create table if not exists leads (
  id            uuid primary key default gen_random_uuid(),
  tenant_id     uuid not null references tenants(id) on delete cascade,
  name          text not null,
  email         text not null,
  phone         text,
  subject       text,
  message       text,
  status        text not null default 'new'
                  check (status in ('new','contacted','converted','archived','deleted')),
  source        text default 'website',
  client_id     uuid references clients(id) on delete set null,
  created_at    timestamptz not null default now(),
  contacted_at  timestamptz,
  archived_at   timestamptz,
  deleted_at    timestamptz
);

create index if not exists leads_tenant_id_idx  on leads (tenant_id);
create index if not exists leads_status_idx     on leads (status);
create index if not exists leads_created_at_idx on leads (created_at desc);

alter table leads enable row level security;

create policy "tenant members can read leads"
  on leads for select
  using (tenant_id in (select tenant_id from tenant_users where user_id = auth.uid())
    or auth.email() = 'eldadabadi@gmail.com');

create policy "tenant members can insert leads"
  on leads for insert
  with check (tenant_id in (select tenant_id from tenant_users where user_id = auth.uid())
    or auth.email() = 'eldadabadi@gmail.com');

create policy "tenant members can update leads"
  on leads for update
  using (tenant_id in (select tenant_id from tenant_users where user_id = auth.uid())
    or auth.email() = 'eldadabadi@gmail.com');

-- Public insert policy — allows the website form (anon) to submit leads
create policy "public can insert leads"
  on leads for insert
  with check (true);

-- ── Site Content ──────────────────────────────────────────────────────────────
-- CMS content: each row = one section on one page.

create table if not exists site_content (
  id          uuid primary key default gen_random_uuid(),
  tenant_id   uuid not null references tenants(id) on delete cascade,
  page_key    text not null,     -- 'home' | 'about' | 'services' | 'contact'
  section_key text not null,     -- 'hero' | 'services_section' | 'about_section' etc.
  content     jsonb not null default '{}',
  is_enabled  boolean not null default true,
  updated_at  timestamptz not null default now(),
  unique (tenant_id, page_key, section_key)
);

alter table site_content enable row level security;

create policy "public can read site_content"
  on site_content for select using (true);

create policy "tenant members can manage site_content"
  on site_content for all
  using (tenant_id in (select tenant_id from tenant_users where user_id = auth.uid())
    or auth.email() = 'eldadabadi@gmail.com');

-- ── Site Settings ─────────────────────────────────────────────────────────────
-- Key-value store for site-wide config (logo, colors, social links, SEO).

create table if not exists site_settings (
  id          uuid primary key default gen_random_uuid(),
  tenant_id   uuid not null references tenants(id) on delete cascade,
  key         text not null,
  value       jsonb not null default 'null',
  updated_at  timestamptz not null default now(),
  unique (tenant_id, key)
);

alter table site_settings enable row level security;

create policy "public can read site_settings"
  on site_settings for select using (true);

create policy "tenant members can manage site_settings"
  on site_settings for all
  using (tenant_id in (select tenant_id from tenant_users where user_id = auth.uid())
    or auth.email() = 'eldadabadi@gmail.com');

-- ── Email Templates ───────────────────────────────────────────────────────────

create table if not exists email_templates (
  id                   uuid primary key default gen_random_uuid(),
  tenant_id            uuid not null references tenants(id) on delete cascade,
  type                 text not null,   -- 'lead_auto_reply' | 'lead_notification'
  subject              text not null default 'תודה שפנית אלינו',
  body                 text not null default '',
  logo_url             text,
  signature_text       text,
  signature_image_url  text,
  updated_at           timestamptz not null default now(),
  unique (tenant_id, type)
);

alter table email_templates enable row level security;

create policy "tenant members can manage email_templates"
  on email_templates for all
  using (tenant_id in (select tenant_id from tenant_users where user_id = auth.uid())
    or auth.email() = 'eldadabadi@gmail.com');

-- ── Default seed content for Michal's tenant ──────────────────────────────────
-- Run AFTER the tenant is created; replace the UUID with Michal's actual tenant_id.
-- Example:
-- insert into site_settings (tenant_id, key, value) values
--   ('TENANT_UUID', 'site_name', '"משרד עו"ד מיכל גלר-אבדי"'),
--   ('TENANT_UUID', 'phone',     '"+972-XX-XXXXXXX"'),
--   ('TENANT_UUID', 'email',     '"michal@law.co.il"'),
--   ('TENANT_UUID', 'address',   '"רחוב הרצל 1, תל אביב"');
