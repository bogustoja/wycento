-- WyceńTo — pełna konfiguracja bazy danych
-- Uruchom JEDNORAZOWO w Supabase Dashboard > SQL Editor

-- === TABELA PROFILES ===
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

CREATE POLICY IF NOT EXISTS "profiles_select" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "profiles_update" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- === TRIGGER — automatyczny profil po rejestracji ===
CREATE OR REPLACE FUNCTION public.create_profile_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_profile_for_user();

-- === TABELA WYCEN ===
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  pomieszczenie TEXT NOT NULL,
  miasto TEXT NOT NULL,
  wynik JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "quotes_select" ON quotes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "quotes_insert" ON quotes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
