# Express SQLite API

## Projektbeschreibung

Dieses Projekt ist eine einfache Backend-API mit Node.js, Express und SQLite.

Die API verwaltet zwei Bereiche:

* Kunden
* Produkte

Für beide Bereiche gibt es vollständige CRUD-Funktionen:

* Create: neue Daten hinzufügen
* Read: Daten anzeigen
* Update: Daten ändern
* Delete: Daten löschen

Die Daten werden dauerhaft in einer SQLite-Datenbank gespeichert.

---

## Verwendete Technologien

* Node.js
* Express.js
* SQLite
* JavaScript
* Thunder Client / Postman zum Testen der API

---

## Projektstruktur

```text
express-course
│
├── app.js
├── database.js
├── database.sqlite
├── package.json
├── package-lock.json
│
└── routes
    ├── customers.js
    └── products.js
```

---

## Installation

Zuerst müssen die Abhängigkeiten installiert werden:

```bash
npm install
```

---

## Projekt starten

Das Projekt wird mit folgendem Befehl gestartet:

```bash
node app.js
```

Danach läuft der Server unter:

```text
http://localhost:3000
```

---

## Datenbank

Die SQLite-Datenbank befindet sich in der Datei:

```text
database.sqlite
```

Beim Start des Servers werden die Tabellen automatisch erstellt, falls sie noch nicht existieren.

Tabellen:

```text
customers
products
```

---

## API Endpoints: Customers

### Alle Kunden anzeigen

```http
GET /customers
```

### Einen Kunden anzeigen

```http
GET /customers/:id
```

Beispiel:

```http
GET /customers/1
```

### Neuen Kunden hinzufügen

```http
POST /customers
```

Beispiel Body:

```json
{
  "name": "Ahmad",
  "city": "Hagen"
}
```

### Kunden ändern

```http
PUT /customers/:id
```

Beispiel:

```http
PUT /customers/1
```

Beispiel Body:

```json
{
  "name": "Ahmad Updated",
  "city": "Berlin"
}
```

### Kunden löschen

```http
DELETE /customers/:id
```

Beispiel:

```http
DELETE /customers/1
```

---

## API Endpoints: Products

### Alle Produkte anzeigen

```http
GET /products
```

### Ein Produkt anzeigen

```http
GET /products/:id
```

Beispiel:

```http
GET /products/1
```

### Neues Produkt hinzufügen

```http
POST /products
```

Beispiel Body:

```json
{
  "name": "Laptop",
  "price": 999
}
```

### Produkt ändern

```http
PUT /products/:id
```

Beispiel:

```http
PUT /products/1
```

Beispiel Body:

```json
{
  "name": "Gaming Laptop",
  "price": 1299
}
```

### Produkt löschen

```http
DELETE /products/:id
```

Beispiel:

```http
DELETE /products/1
```

---

## Status Codes

| Status Code | Bedeutung                      |
| ----------- | ------------------------------ |
| 200         | Anfrage erfolgreich            |
| 201         | Datensatz wurde erstellt       |
| 400         | Fehlende oder falsche Eingabe  |
| 404         | Datensatz wurde nicht gefunden |
| 500         | Server- oder Datenbankfehler   |

---

## Lernziel des Projekts

Das Ziel dieses Projekts ist es, die Grundlagen der Backend-Entwicklung mit JavaScript zu verstehen.

Dabei werden folgende Themen geübt:

* Aufbau eines Express-Servers
* Routing mit Express
* Arbeiten mit JSON-Daten
* CRUD-Operationen
* SQLite-Datenbankanbindung
* SQL-Befehle wie SELECT, INSERT, UPDATE und DELETE
* Strukturierung eines Backend-Projekts
