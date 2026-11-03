-- WyceńTo — poprawka bezpieczeństwa + tabela quotes
-- Uruchom RAZ w Supabase → SQL Editor (albo zatwierdź, żeby Claude wgrał przez connector).
-- Nie usuwa żadnych danych.

-- 1. Zamknij dziurę: polityka UPDATE pozwalała userowi z przeglądarki
--    ustawić sobie plan='pro' i dowolne credits (klucz anon jest publiczny).
--    Webhook Stripe używa service_role, więc nadal działa.
drop policy if exists "Użytkownik aktualizuje swój profil" on public.profiles;

create unique index if not exists profiles_user_id_key on public.profiles(user_id);

-- 2. Atomowe pobranie kredytu. Zwraca true, jeśli user może robić wycenę.
create or replace function public.use_credit()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_plan text;
  v_credits int;
begin
  if auth.uid() is null then
    return false;
  end if;

  select plan, credits into v_plan, v_credits
  from profiles where user_id = auth.uid()
  for update;

  if not found then
    return false;
  end if;

  if v_plan = 'pro' then
    return true;
  end if;

  if coalesce(v_credits, 0) <= 0 then
    return false;
  end if;

  update profiles set credits = credits - 1 where user_id = auth.uid();
  return true;
end;
$$;

revoke all on function public.use_credit() from public, anon;
grant execute on function public.use_credit() to authenticated;

-- 3. Zwrot kredytu, gdy wycena się nie uda. Tylko serwer (service_role).
create or replace function public.refund_credit(p_user uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update profiles set credits = credits + 1
  where user_id = p_user and plan <> 'pro';
$$;

revoke all on function public.refund_credit(uuid) from public, anon, authenticated;
grant execute on function public.refund_credit(uuid) to service_role;

-- 4. Tabela quotes (istnieje, pusta): wymagane pola, user tylko czyta i dodaje swoje.
alter table public.quotes alter column user_id set not null;
alter table public.quotes alter column pomieszczenie set not null;
alter table public.quotes alter column miasto set not null;
alter table public.quotes alter column wynik set not null;
alter table public.quotes alter column created_at set not null;

alter table public.quotes enable row level security;
drop policy if exists "Users see own quotes" on public.quotes;
drop policy if exists "quotes_select_own" on public.quotes;
drop policy if exists "quotes_insert_own" on public.quotes;
create policy "quotes_select_own" on public.quotes
  for select to authenticated using (auth.uid() = user_id);
create policy "quotes_insert_own" on public.quotes
  for insert to authenticated with check (auth.uid() = user_id);

create index if not exists quotes_user_created_idx on public.quotes(user_id, created_at desc);
