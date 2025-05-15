# 🎵 Sortify

Sortify är en JavaScript-applikation som hanterar spellistor med musik. Användaren kan skapa och lista spellistor som är organiserade efter **genre**, **artist** och **låtar**.

## 📁 Projektstruktur och brancher

Applikationen är versionshanterad med **Git** och finns på **GitHub** med följande grenar:

- `main` – produktion/stabil version
- `development` – utvecklingsgren där nya funktioner samlas innan de går till `main`
- `features` – används för att bygga enskilda funktioner eller delar av applikationen

## 🔧 Git-kommandon för branch-hantering

### Skapa en ny gren

```bash
git checkout -b features
```

> Detta skapar en ny gren som heter `features` och byter till den direkt.

Alternativt:

```bash
git branch features      # Skapar grenen
git checkout features    # Byter till grenen
```

### Slå ihop grenen `features` till `development`

1. Byt till `development`-grenen:

```bash
git checkout development
```

2. Slå samman `features` in i `development`:

```bash
git merge features
```

### Visa alla grenar

```bash
git branch
```

### Radera en gren (efter merge)

```bash
git branch -d features
```

---

## 💻 Tekniker som används

- **JavaScript**
- **Git & GitHub**
- **HTML & CSS**

---

## ✅ Funktionalitet

- Skapa spellistor
- Lista spellistor
- Kategorisering via:
  - Genre
  - Artist
  - Låt

---

## 📌 Instruktioner

1. Klona projektet:

   ```bash
   git clone https://github.com/kaspervik/sortify.git
   cd sortify
   ```

2. Byt till rätt gren:

   ```bash
   git checkout development
   ```

3. Starta utveckling!

---

## 🧑‍💻 Ansvarig utvecklare

Detta projekt är en del av ett utbildningsmoment med fokus på JavaScript och Git.
