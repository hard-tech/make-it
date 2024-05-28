# Make-it (back-end)

## Description
Ce projet est une application qui utilise des scripts Python pour la gestion et la manipulation de fichiers, ainsi que des scripts Node.js pour d'autres fonctionnalités. Le projet est structuré de manière à séparer les différentes responsabilités, avec des répertoires dédiés pour les scripts Python, les fichiers de sortie et les fichiers téléchargés.

## Structure du Projet
Voici un aperçu de la structure du projet :

```
.
├── LICENSE
├── index.js
├── package-lock.json
├── package.json
├── outputs
│   └── output.pdf
├── script-py
│   ├── compiling.py
│   ├── deletFiles.py
│   └── manageFiles.py
└── uploads
    └── emptyFile
```

### Détails des Répertoires et Fichiers
- **index.js**: Le point d'entrée principal de l'application Node.js.
- **package.json**: Fichier de configuration pour la gestion des dépendances et des métadonnées du projet.
- **outputs**: Contient les fichiers de sortie générés par l'application.
- **script-py**: Contient les scripts Python pour la gestion et la manipulation des fichiers.
  - `compiling.py`: Script pour compiler des fichiers.
  - `deletFiles.py`: Script pour supprimer des fichiers.
  - `manageFiles.py`: Script pour gérer les fichiers.
- **uploads**: Répertoire pour les fichiers téléchargés. Contient actuellement un fichier vide nommé `emptyFile`.

## Prérequis
- Node.js
- Python 3.x

## Installation
1. Clonez le dépôt :
   ```bash
   git clone <URL_DU_DEPOT>
   cd <NOM_DU_DEPOT>
   ```

2. Installez les dépendances Node.js :
   ```bash
   npm install
   ```

## Utilisation
### Exécution du script principal
Pour exécuter le script principal, utilisez la commande suivante :
```bash
node index.js
```

### Exécution des scripts Python
Vous pouvez exécuter les scripts Python individuellement en utilisant Python. Par exemple :
```bash
python3 script-py/compiling.py
```

## Contribuer
Les contributions sont les bienvenues ! Veuillez soumettre une pull request ou ouvrir une issue pour discuter des changements que vous souhaitez apporter.

## Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.
`