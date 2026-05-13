-- Leads arriving from the public website contact form
CREATE TABLE website_leads (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT NOT NULL,
  company      TEXT,
  email        TEXT NOT NULL,
  phone        TEXT NOT NULL,
  category     TEXT NOT NULL,
  description  TEXT,
  status       TEXT DEFAULT 'new'
               CHECK (status IN ('new','contacted','became_client','archived','deleted')),
  notes        TEXT,
  client_id    UUID REFERENCES clients(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- CMS: page content editable from CRM admin
CREATE TABLE website_pages (
  slug        TEXT PRIMARY KEY,
  is_enabled  BOOLEAN DEFAULT true,
  title_he    TEXT,
  content     JSONB,
  meta_title  TEXT,
  meta_desc   TEXT,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- CMS: global site settings (firm name, phone, email, hours, social)
CREATE TABLE website_settings (
  key        TEXT PRIMARY KEY,
  value      TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email templates for auto-confirmation to new leads
CREATE TABLE website_email_templates (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT UNIQUE NOT NULL,
  subject    TEXT NOT NULL,
  body       TEXT NOT NULL,
  logo_url   TEXT,
  signature  TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default email template
INSERT INTO website_email_templates (name, subject, body, signature)
VALUES (
  'lead-confirmation',
  'תודה שפנית אלינו — משרד אורבך · ירדן',
  E'שלום {{name}},\n\nקיבלנו את פנייתך ונחזור אליך בהקדם האפשרי.\n\nצוות המשרד',
  'עו״ד מיכל | אורבך · ירדן | 03-720-1898'
);

-- Seed default site settings
INSERT INTO website_settings (key, value) VALUES
  ('firm_name',    'אורבך ירדן עורכי דין'),
  ('phone',        '03-720-1898'),
  ('email',        'office@auerbach-yarden.co.il'),
  ('address',      'מגדל אלרוב, רחוב ויצמן 2, קומה 32, תל אביב'),
  ('hours',        'ימים א׳–ה׳ · 08:30–19:00'),
  ('established',  '1998'),
  ('tagline',      'ייצוג משפטי בשיקול דעת של רבע מאה');

-- RLS policies
ALTER TABLE website_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_email_templates ENABLE ROW LEVEL SECURITY;

-- Authenticated users (CRM staff) can do everything
CREATE POLICY "authenticated_all" ON website_leads FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "authenticated_all" ON website_pages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "authenticated_all" ON website_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "authenticated_all" ON website_email_templates FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Anon can only INSERT leads (for website contact form)
CREATE POLICY "anon_insert_lead" ON website_leads FOR INSERT TO anon WITH CHECK (true);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER website_leads_updated_at BEFORE UPDATE ON website_leads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER website_pages_updated_at BEFORE UPDATE ON website_pages FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER website_settings_updated_at BEFORE UPDATE ON website_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER website_email_templates_updated_at BEFORE UPDATE ON website_email_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at();
