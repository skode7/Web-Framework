## Säännöt

## Käyttäjät joilla `role = "user"`

- Saavat päivittää ja poistaa vain omia tietojaan, toteutetaan isOwnerOrAdmin funktiossa.

- Voi päivittää tai poistaa niitä kissoja, joiden omistaja hän on, tarkistus tehdään isOwnerOrAdmin funktiossa.

## Käyttäjät joilla `role = "admin"`

- Voi muokata kenen tahansa käyttäjän tai kissojen tietoja
