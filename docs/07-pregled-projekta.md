# Pregled prevzetega projekta Petalog

## Implementirane funkcionalnosti MVP

Petalog je spletna aplikacija za veterinarsko ambulanto (React, TypeScript, Express, PostgreSQL in Prisma). V MVP so implementirani registracija in prijava lastnikov, administracija zaposlenih, dodajanje in urejanje živali, vnos cepljenj z izračunom naslednjega roka, zdravstveni zapisi z možnostjo zaključevanja, zdravstvena časovnica, alergije ter nadzorni plošči veterinarja in lastnika. Rezervacija terminov še ni implementirana.

## Pregled petih uporabniških zgodb

| Zgodba | Ugotovitev |
|---|---|
| **US-01 – Registracija in prijava lastnika** | Registracija, prijava, odjava, validacija vnosa in zaščita strani po odjavi delujejo. |
| **US-02 – Upravljanje računov osebja** | Administrator lahko dodaja, filtrira in deaktivira zaposlene. Omejitve dostopa delujejo. |
| **US-03 – Dodajanje in urejanje živali** | Dodajanje, urejanje, brisanje živali brez zdravstvene evidence in preverjanje podatkov delujejo. |
| **US-04 – Vnos cepljenja** | Veterinar lahko zabeleži cepljenje; preverjeni so izračun naslednjega roka, validacija datuma in pregled za lastnika. |
| **US-05 – Zdravstveni zapis** | Veterinar lahko ustvari in uredi osnutek, zaključi zapis ter doda dodatek. Zaključenega zapisa ni mogoče več urejati. |

Projekt je bil pregledan na ravni dokumentacije in kode ter uspešno zagnan lokalno z Docker Compose. Pri ročnem preizkusu je vseh 30 preverjanj za izbranih pet zgodb uspelo, zato implementacija ustreza njihovim **preizkušenim** funkcionalnim zahtevam. Dodatno je bilo uspešno opravljenih 14 preverjanj za US-06 do US-08; prikaz dejanskih rezerviranih terminov pri US-08 ostaja neimplementiran. Preizkus ne pomeni preverbe vseh možnih primerov ali vseh odzivov API.
