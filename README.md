# 🎭 Calendrama

## Opis projektu

Calendrama to aplikacja webowa służąca do zarządzania repertuarem teatru, planowania wydarzeń oraz obsady pracowników.

System pozwala organizować spektakle, zarządzać scenami i pracownikami, przypisywać obsadę do wydarzeń oraz analizować, czy dany spektakl może zostać wystawiony w wybranym terminie bez konfliktów organizacyjnych.

Projekt został stworzony jako aplikacja pełnostackowa z wykorzystaniem Spring Boot, React oraz relacyjnej bazy danych MySQL.

---

## Główne funkcjonalności

### Zarządzanie spektaklami

- tworzenie, edycja i usuwanie spektakli,
- określanie czasu trwania spektaklu,
- definiowanie wymaganej obsady dla spektaklu.

### Zarządzanie pracownikami

- tworzenie, edycja i usuwanie pracowników,
- przypisywanie stanowisk i ról,
- definiowanie okresów niedostępności pracowników.

### Zarządzanie scenami

- tworzenie, edycja i usuwanie scen,
- planowanie wydarzeń technicznych i serwisowych,
- kontrola dostępności scen.

### Zarządzanie wydarzeniami

- planowanie wydarzeń w kalendarzu,
- przypisywanie spektakli do scen,
- przypisywanie pracowników do obsady wydarzenia,
- edycja i usuwanie wydarzeń.

### Analiza możliwości organizacji wydarzenia

Najważniejszą funkcjonalnością aplikacji jest sprawdzanie, czy wybrany spektakl może zostać zorganizowany w określonym terminie.

Podczas analizy system sprawdza między innymi:

- dostępność sceny,
- konflikty terminów wydarzeń,
- niedostępności pracowników,
- przypisanie pracowników do innych wydarzeń odbywających się w tym samym czasie,
- kompletność wymaganej obsady.

Wynik przedstawiany jest w postaci listy konfliktów oraz ostrzeżeń pomagających podjąć decyzję o organizacji wydarzenia.

---

## Jak działa aplikacja

1. Użytkownik tworzy sceny, pracowników oraz spektakle.
2. Dla spektaklu definiowana jest wymagana obsada.
3. Tworzone są wydarzenia przypisane do konkretnych scen i terminów.
4. Do wydarzeń przypisywani są pracownicy.
5. Przed zapisaniem wydarzenia można uruchomić analizę jego wykonalności.
6. System wykrywa potencjalne konflikty i prezentuje raport.
7. Po pozytywnej weryfikacji wydarzenie może zostać zapisane.

---

## Technologie

### Backend

- Java 17
- Spring Boot
- Spring Data JPA
- Hibernate
- Bean Validation
- Maven
- MySQL

### Frontend

- React
- Vite
- JavaScript
- Mantine UI
- FullCalendar

---

## Architektura

Aplikacja została zbudowana w architekturze klient-serwer.

```text
React + Mantine + FullCalendar
              │
              ▼
        REST API
              │
              ▼
      Spring Boot
              │
              ▼
           MySQL
```

Backend odpowiada za logikę biznesową, walidację danych oraz komunikację z bazą danych, natomiast frontend zapewnia interfejs użytkownika do zarządzania repertuarem teatru.

---

## Przykładowy scenariusz

Pracownik teatru chce zaplanować wystawienie spektaklu.

Po wskazaniu spektaklu, sceny oraz terminu system sprawdza:

- czy scena jest dostępna,
- czy wymagana obsada jest kompletna,
- czy pracownicy nie są niedostępni,
- czy pracownicy nie zostali przypisani do innych wydarzeń w tym samym czasie.

Na podstawie wyników użytkownik otrzymuje informację, czy wydarzenie może zostać zorganizowane.

---

## Uruchomienie projektu

### Backend

1. Skonfiguruj bazę danych MySQL.
2. Uzupełnij dane połączenia w pliku `application.properties`.
3. Uruchom aplikację Spring Boot.

### Frontend

1. Przejdź do katalogu frontend.
2. Zainstaluj zależności:

```bash
npm install
```

3. Uruchom aplikację:

```bash
npm run dev
```

---

## Możliwe kierunki rozwoju

- system uwierzytelniania i autoryzacji użytkowników,
- zaawansowane raportowanie konfliktów,
- filtrowanie i wyszukiwanie wydarzeń,
- rozróżnienie pracowników etatowych i gościnnych podczas planowania i zarządzanie potwierdzaniem terminów z pracownikami kontraktowymi,
- wyszukiwanie pierwszego wolnego terminu dla wybranego spektaklu.

---

## Autor

Projekt wykonany przez Mikołaja Śliwę w ramach bootcampu Java Developer jako projekt końcowy prezentujący umiejętności tworzenia aplikacji z wykorzystaniem Spring Boot, oraz relacyjnych baz danych.

---

## Status projektu

🚧 Projekt w trakcie rozwoju.