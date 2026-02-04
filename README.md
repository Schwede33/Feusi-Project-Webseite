# 🛍️ Bens Webshop – Webtechnologien Projekt

Schulprojekt im Modul **Webtechnologien**.  
Ziel ist die Umsetzung einer modernen Webanwendung mit **REST API**, **Datenbank** und **Next.js Frontend**.

---

## 🚀 Quickstart – Projekt lokal starten

### Voraussetzungen
- Linux VM
- Docker & Docker Compose
- Git
- Node.js (über nvm empfohlen)
- Visual Studio Code

---

## 🗄️ Setup: Datenbank & REST API

### Installation

Terminal öffnen und folgende Befehle ausführen:

```bash
git clone https://github.com/Schwede33/Feusi-Project-Webseite
cd w3schools-database
git pull
docker-compose up -d
code .
Damit werden automatisch gestartet:

MySQL Datenbank

REST API (CRUD Endpunkte)
```

🔧 Troubleshooting (Docker)
Container-Status prüfen:
```
docker ps
```
Falls Container nicht laufen:
```
docker-compose up -d
```
💡 Tipp: Bei Problemen hilft oft ein Neustart der VM.

🌐 Web Application (Next.js)
Node.js & npm installieren (mit nvm)
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
. "$HOME/.nvm/nvm.sh"
nvm install 24
```
Versionen prüfen:
```
node -v   # z.B. v24.13.0
npm -v    # z.B. 11.6.2
```
▶️ Web-App starten
```
cd web-app
npm install
npm run dev
```
🌍 Anwendung öffnen
Im Browser öffnen:

http://localhost:3001


Die Webanwendung Bens Webshop wird angezeigt.


*****************************************************************************************************************************************************
### 📦 Projekt-Funktionen


✅ Entitäten anzeigen (GET)
Kategorien

Produkte

Kunden

Bestellungen
*****************************************************************************************************************************************************

### ✏️ Erstellen (POST)

Kategorien erstellen

Produkte erstellen
*****************************************************************************************************************************************************

### 🔄 Bearbeiten (PATCH)

Kategorien bearbeiten

Produkte bearbeiten
*****************************************************************************************************************************************************

### 🗑️ Löschen (DELETE)
Kategorien löschen

Produkte löschen
*****************************************************************************************************************************************************

### 🛒 Warenkorb-Funktionen

Produkte in den Warenkorb legen

Menge erhöhen bei gleichen Produkten

Einzelne Produkte entfernen

Gesamten Warenkorb leeren

Warenkorb-Zähler in der Navigation

Warenkorb-Seite mit Gesamtpreis

*****************************************************************************************************************************************************

### 🔍 Suche & Benutzerfreundlichkeit
Suche nach Kategorien und Produkten

Hervorhebung des Suchbegriffs

Automatisches Scrollen zum Treffer

Visuelle Hervorhebung des Ergebnisses

*****************************************************************************************************************************************************

### 🎨 UI & UX

Einheitliches Layout

Responsive Design (Grid-System)

Kartenansicht für Kategorien & Produkte

Dynamische Aktualisierung ohne Seiten-Reload

*****************************************************************************************************************************************************

### 🧠 Technische Erklärung (Kurzfassung)

Backend: Externe REST API mit MySQL (Docker)

Frontend: Next.js (App Router)

Kommunikation: fetch() gegen REST API

State Management: React Context (Warenkorb)

Styling: Tailwind CSS

Rendering: Server & Client Components

Session: Client-seitig (kein Checkout-Prozess)
*****************************************************************************************************************************************************

### 📝 Journal

Ein Projektjournal wurde geführt und dokumentiert:

Umsetzung der Features

Aufgetretene Probleme

Lösungen und Verbesserungen

Abgelegt als File "Journal"


