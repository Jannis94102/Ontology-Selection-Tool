# Ontology-Selection-Tool
Repository for the Ontology Selection Tool

# Allgemeine Informationen
In diesem Repository befinden sich sämtliche Inhalte für das Ontologieselektionswerkzeug, dass bei der Wiederverwendung existierender Ontologien unterstützen soll. Das Werkzeug ist eine webbasierte Angular-Applikation und wurde mit Angular 8 entwickelt.

Der Ordner CQ-Store-Ontology beinhaltet eine Ontologie mit T-Box-Konzepten, um die formulierten Competency Questions (CQs) formal abzuspeichern. Die Ontologie wird beim Anlegen eines neuen GraphDB-Repositories automatisch importiert.

Im Ordner "ontology files" befindet sich eine Vorauswahl an SG-Ontologien, die für Automatisierungslösungen im SG-Kontext sinnvolle Konzepte beinhalten. Diese Ontologien können per Checkbox in das GraphDB-Repository geladen werden, auf das das Tool zugreift.

Unter "scientific papers" wurden die wissenschaftlichen Veröffentlichungen zu den Ontologien im PDF-Format hochgeladen. Die Veröffentlichungen sind im Tool verlinkt und ermöglichen dem Benutzer weitere Informationen zu der jeweiligen Ontologie nachzulesen.

Im Ordner Tool Source Code befindet sich der gesamte Quellcode des Ontologieselektionswerkzeuges. Die Inhalte dieses Ordner müssen heruntergeladen bzw. geklont werden, um das Tool starten zu können.

# Voraussetzungen: 

Für die Inbetriebnahme des Ontologieselektionswerkzeuges wird Node.JS benötigt. Den Download finden Sie unter folgendem Link: https://nodejs.org/en/ Außerdem empfiehlt es sich, eine IDE wie Visual Studio Code für das Ausführen der Commands zum Installieren / Starten zu verwenden. Visual Studio Code (VSC) kann unter https://code.visualstudio.com/ heruntergeladen werden. 
Als nächstes sollten Sie in VSC im Terminal das Angulare CLI installieren. Nutzen Sie dazu den Befehl
`npm install -g @angular/cli`

# Installation:

Clonen oder Downloaden Sie den Inhalt des "Tool Source Code" Ordners. Wenn Sie sich die Inhalte heruntergeladen haben, dann müssen Sie die zip-komprimierte Datei auf Ihrem lokalen Speicher entpacken.
Navigieren Sie im Terminal in VSC zum Stammordner der Kopie.

Führen Sie zur Installation den Command:

`npm install`

aus, dies installiert alle softwareseitigen Abhängigkeiten.
Zum Starten des Tools führen Sie anschließend den Befehl
`ng serve`
aus. Nun kann die Benutzeroberfläche des Tools in Ihrem Browser unter der Adresse http://localhost:4200/ aufgerufen werden.

