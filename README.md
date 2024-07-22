# HR APP TEAM3

HR APP TEAM3 ist eine leistungsstarke Anwendung zur Verwaltung von Personalressourcen. Sie ermöglicht es Unternehmen, Mitarbeiterdaten effizient zu verwalten, Arbeitszeiten zu verfolgen und Leistungsberichte zu erstellen.

## Inhaltsverzeichnis

- [Installation](#installation)
- [Verwendung](#verwendung)
- [Funktionen](#funktionen)
- [Features](#features)
- [Screenshots](#screenshots)
- [Mitwirken](#mitwirken)
- [Lizenz](#lizenz)
- [Danksagungen](#danksagungen)

## Installation

Folgen Sie diesen Schritten, um HR APP TEAM3 zu installieren und lokal auszuführen:

```bash
# Repository klonen
git clone https://github.com/vnikolayev-ts/HR-App-TEAM3.git
```
# Backened installieren & starten
```bash
cd HR_APP_TEAM3/backend

# Abhängigkeiten installieren
npm install

# Anwendung starten
node server.js
```

# Frontend installieren & starten
```bash
cd HR_APP_TEAM3/frontend

# Abhängigkeiten installieren
npm install

# Anwendung starten
npm start
```

## Screenshots

Hier können Sie sich unsere Screenshots im Karussell ansehen: [Screenshots](./readme/screenshots.html)


## Funktionen

#### Die HR-App bietet die folgenden Funktionen.

Zunächst loggt man sich auf dem Dashboard ein.
Hier kann man die Rolle eines Superadmin, Users mit Adminrechten oder eines einfachen Users haben.

#### User-Rolle
Meldet man sich als einfacher User an, hat man nur eine einfache Form der Navigationsbar und kann auf der Dashboardseite nur die Daten seiner Firma sehen, die Userdaten-Liste und Userdetails ansehen, aber nur seine eigenen Daten ändern. Außerdem kann er die Daten seiner Firma aufrufen und einsehen.

#### Admin-User-Rolle
Meldet sich ein User mit Adminrechten an, hat dieser eine Navigationsbar, über die er nur seine Firma/Tenant sehen kann und hat Zugriff auf die User, Employees (Angestellten) und seinen Tenant (Firma).
Er kann die Userliste seiner Firma einsehen, einzelne User aufrufen, deren Daten ändern oder diese löschen und neue User anlegen.
Er kann die Employee-/Angestellten-Liste seiner Firma aufrufen, einzelne Angestellte aufrufen, bei diesen Änderungen vornehmen und Employee-/Angestellten Sätze löschen. Weiterhin kann er neue Employee-/Angestelltensätze anlegen.
Außerdem kann er die Daten seiner Firma aufrufen und einsehen.

#### Superadmin-Rolle
Meldet sich ein Superadmin an, findet dieser eine Navigationsbar vor, die ihm auf alles Vollzugriff erlaubt. 
Dieser kann für jeden Tenant/Firma die User-Liste aufrufen, einzelne User aufrufen, deren Daten ändern oder diese löschen und neue User anlegen.
Er kann die Employee- Angestellten-/Angestellten-Liste aufrufen, einzelne Angestellte/Employees aufrufen, deren Daten ändern oder diese löschen und neue Angestellte/Employees anlegen.
Außerdem kann er die Firmen/Tenants-Liste sehen, als Einziger diese auch ändern und löschen und neue Firmen/Tenants anlegen. 


## License

Dieses Projekt ist unter der MIT-Lizenz lizenziert – siehe die <a href="LICENSE.md"> LICENSE.md</a>  Datei für Details. 

## Danksagung

Wir, das Team hinter HR APP TEAM3 (Viktor Nikolayev, Peter Martin Berg, Willy Ellwart, Christian Sawatzky und Marcel Welk), möchten uns herzlich bei allen bedanken, die zur erfolgreichen Umsetzung unserer leistungsstarken Anwendung zur Verwaltung von Personalressourcen beigetragen haben. HR APP TEAM3 ermöglicht es Unternehmen, Mitarbeiterdaten effizient zu verwalten, Arbeitszeiten zu verfolgen und Leistungsberichte zu erstellen.

Unser besonderer Dank gilt unseren Coaches Suheib, Mete und Hubertus. Eure wertvolle Unterstützung, euer Fachwissen und eure unermüdliche Motivation haben uns maßgeblich vorangebracht.

Ein großes Dankeschön auch an unsere Teaching Assists Sarah & Hubertus , deren Hilfe und Engagement von unschätzbarem Wert waren.

Nicht zuletzt möchten wir uns bei dem gesamten Techstarter-Team bedanken. Ohne eure Ressourcen, euer Feedback und eure kontinuierliche Unterstützung wäre dieses Projekt nicht möglich gewesen.

#### Vielen Dank an alle!
