#!/usr/bin/env node
// Uruchom: node scripts/migrate.js
// Wymaga: DB_PASSWORD w .env.local lub jako argument

const { Client } = require('pg')
require('dotenv').config({ path: '.env.local' })

const SQL = `
-- Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  credits INTEGER DEFAULT 3 NOT NULL,
  plan TEXT DEFAULT 'free' NOT NULL CHECK (plan IN ('free', 'pro')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "profiles_select" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "profiles_update" ON profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.create_profile_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id) VALUES (NEW.id) ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_profile_for_user();

-- Quotes
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  pomieszczenie TEXT NOT NULL,
  miasto TEXT NOT NULL,
  wynik JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "quotes_select" ON quotes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "quotes_insert" ON quotes FOR INSERT WITH CHECK (auth.uid() = user_id);
`

async function migrate() {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.log('\n❌ Brak DATABASE_URL w .env.local')
    console.log('\nDodaj do .env.local:')
    console.log('DATABASE_URL=postgresql://postgres:TWOJE_HASLO@db.finupnyhusgmbxhjlzes.supabase.co:5432/postgres')
    console.log('\nHasło znajdziesz w: Supabase → Settings → Database → Database password\n')
    process.exit(1)
  }

  const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } })
  try {
    await client.connect()
    console.log('✓ Połączono z bazą danych')
    await client.query(SQL)
    console.log('✓ Migracja zakończona — tabele profiles i quotes gotowe')
    await client.end()
  } catch (err) {
    console.error('❌ Błąd migracji:', err.message)
    await client.end()
    process.exit(1)
  }
}

migrate()
