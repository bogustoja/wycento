# Redesign: ciemny styl (kierunek E)

Data: 2026-11-08. Makiety: płótno „Wycento – kierunki wyglądu” (kierunek E = ciemny premium + skan).

## Decyzje
- Cała aplikacja ciemna. Raport PDF zostaje jasny i bez zmian (drukowany, pokazywany ekipie).
- Jeden krój: Onest, pliki lokalne w `public/fonts` (SIL OFL 1.1). Obrazki OG: statyczne pliki w `assets/fonts`.
- Kolory tylko z tokenów w `app/globals.css` (`bg-bg`, `bg-surface`, `text-ink`, `text-muted`, `bg-accent`, `text-accent-2`…).
- Hero strony głównej: ilustrowana łazienka ze skanem (`ScanDemo`), bez zdjęcia ze stocku.
- Ekran wyceny: podczas czekania na AI skan przechodzi po zdjęciu, które wrzucił użytkownik.
- Usunięte: tabelka „my vs inne kalkulatory”, emoji jako ikony na stronach PL.

## Animacje
- Tylko CSS, bez bibliotek. Skan i świecąca ramka animowane przez `transform` (karta graficzna).
- `prefers-reduced-motion`: bez skanu, wszystko widoczne od razu.
- Światło za myszką (`Spotlight`) tylko przy myszce, bez re-renderów Reacta.

## Sprawdzone (lokalnie)
- Lighthouse strona główna: wydajność 94–98, dostępność 100, SEO 100. Strony SEO: 99/100/100.
- Brak poziomego przewijania przy 390 px na wszystkich stronach.
- PDF: HTML raportu identyczny jak przed zmianą.
