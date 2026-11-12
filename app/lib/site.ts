// Jedno miejsce na dane kontaktowe i adres serwisu — zmieniasz tu, zmienia się wszędzie.
export const SITE_URL = 'https://wycento.app'
export const CONTACT_EMAIL = 'kontakt@wycento.app'

// Sprzedawca (wymóg ustawy o prawach konsumenta: kto sprzedaje i gdzie go znaleźć).
// Działalność nierejestrowana (art. 5 Prawa przedsiębiorców) — bez NIP i wpisu do CEIDG.
export const SELLER_NAME = 'Bogumił Kowalczyk'
// Adres do korespondencji (ulica, kod, miasto). Pusty = nie wyświetla się. MUSI być wpisany przed przyjmowaniem płatności.
export const SELLER_ADDRESS = ''
export const SELLER_LINE = SELLER_ADDRESS ? `${SELLER_NAME}, ${SELLER_ADDRESS}` : SELLER_NAME

// Płatności włączają się dopiero, gdy podany jest adres sprzedawcy (wymóg prawa konsumenckiego).
export const PAYMENTS_ENABLED = SELLER_ADDRESS.trim().length > 0
