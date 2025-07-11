# DonkeyKongRL – Reinforcement Learning in einer 2D-Spielumgebung

## Projektbeschreibung

Dieses Projekt befasst sich mit der Entwicklung und Evaluierung von Reinforcement-Learning-Agenten (RL) in einer benutzerdefinierten 2D-Plattformspielumgebung, die sich konzeptionell am klassischen Donkey-Kong-Spiel orientiert. Ziel ist die Implementierung, das Training und der Vergleich verschiedener RL-Algorithmen im Hinblick auf ihre Leistungsfähigkeit beim Erreichen definierter Ziele innerhalb der Spielumgebung.

## Motivation

Die Anwendung von Reinforcement Learning in simulierten Spielumgebungen bietet ein ideales Testfeld zur Untersuchung von Lernverhalten, Exploration und Belohnungsstrategien. Dieses Projekt verbindet die wissenschaftliche Relevanz moderner RL-Methoden mit einer intuitiven visuellen Darstellung der Lernprozesse in einer eigens entwickelten Umgebung.

## Projektstruktur

```plaintext
DonkeyKongRL-main/
│
├── DKRLAlteStaende/                         
├── DonkeyKongRL-feature-login-form/
│   ├── Games/
│   │   └── BackupModelle/                   
│   ├── VergleichModelle/
│   │   ├── A2C/                             
│   │   ├── Backup/                          
│   │   └── DK/                              
│   ├── platform_env.py                      
│   └── *.py                                 
├── Aktuelle_Data_Science_Entwicklung Donkey Kong.pdf
└── .gitignore
```

## Implementierte Algorithmen

Die folgenden Algorithmen wurden zur Modellierung des Agentenverhaltens verwendet:

- **DQN (Deep Q-Network):** Wertbasiertes Verfahren mit diskreten Aktionen und Q-Funktion-Approximation durch neuronale Netze.
- **A2C (Advantage Actor Critic):** Policy-basierter Ansatz mit getrennten Netzwerken für Wert- und Policy-Funktion.

## Visualisierungen und Auswertung

Im Verlauf des Projekts wurden folgende Kennzahlen und Darstellungen generiert:

- `rewards_plot.png`: Entwicklung der kumulierten Belohnung pro Episode
- `positions_xy_plot.png`: Kartesische Bewegungspfade des Agenten
- `logA2C.png`: Lernlogarithmus bei Anwendung von A2C
- `run_results.csv`: Metriken und Laufzeiten der Agenten

## Ausführung

### Abhängigkeiten installieren

```bash
pip install gym pygame stable-baselines3 matplotlib pandas numpy
```

## Agent trainieren

```bash
python train_agentDQN.py
python train_agentAC2.py

