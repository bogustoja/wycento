-- Uruchom to w Supabase Dashboard > SQL Editor

-- 1. Tabela profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  credits INTEGER DEFAULT 3 NOT NULL,
  plan TEXT DEFAULT 'free' NOT NULL CHECK (plan IN ('free', 'pro')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Row Level Security — każdy widzi tylko swój profil
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Użytkownik widzi swój profil" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Użytkownik aktualizuje swój profil" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- 3. Trigger — automatycznie tworzy profil po rejestracji
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
