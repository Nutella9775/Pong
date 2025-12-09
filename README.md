# SoloPong

> **Jouez au Pong... à la verticale !**
> Un jeu d'arcade addictif développé en JavaScript pur (Vanilla JS).

[Voir le jeu en ligne](https://nutella9775.github.io/Pong/) ## 📝 Description

**SoloPong** revisite le classique du jeu vidéo dans un format vertical. L'objectif est simple : empêcher la balle de tomber le plus longtemps possible.

Mais attention : **la difficulté est progressive !** À chaque fois que la balle rebondit sur la raquette ou les murs, elle gagne de la vitesse. Vos réflexes seront mis à rude épreuve.

## Fonctionnalités

* **Gameplay Vertical :** Une approche originale du Pong classique.
* **Accélération Dynamique :** La vitesse de la balle augmente à chaque rebond pour intensifier la partie.
* **Multi-supports :** Jouable sur ordinateur (Clavier/Souris) et sur mobile et tablette (Tactile).
* **Score :** Votre score est le temps le plus long a rester en vie!

## Comment Jouer ?

Le jeu détecte automatiquement votre périphérique pour offrir la meilleure expérience possible.

| Périphérique | Contrôles |
| :--- | :--- |
| ** Clavier** | Utilisez les **Flèches Gauche (⬅️)** et **Droite (➡️)** pour déplacer la raquette. |
| ** Souris** | Cliquez continuellement sur la raquette, tout la déplacant avec les mouvements de la souris pour ainsi diriger la raquette. |
| ** Tactile** | Appuyez sur la gauche ou la droite de votre écran (compatible smartphone/tablette). |

## Technologies Utilisées

Ce projet a été réalisé sans aucun framework, pour maîtriser les bases du web :

* **HTML5** : Structure du jeu (Canvas ou éléments DOM).
* **CSS3** : Design néon/rétro et mise en page responsive.
* **JavaScript (ES6+)** :
    * Logique de déplacement et physique de la balle.
    * Gestion des collisions (murs et raquette).
    * Écouteurs d'événements multiples (`keydown`, `click`, `touchstart`).
