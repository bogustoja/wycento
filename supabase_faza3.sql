-- Uruchom to w Supabase Dashboard > SQL Editor (po supabase_setup.sql)

-- Tabela wycen
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  pomieszczenie TEXT NOT NULL,
  miasto TEXT NOT NULL,
  wynik JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Użytkownik widzi swoje wyceny" ON quotes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Użytkownik dodaje swoje wyceny" ON quotes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
