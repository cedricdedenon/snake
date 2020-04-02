# Snake

Le célébre jeu du "snake" reproduit en Javascript ES6 orientée objets

Le but est d'obtenir le meilleur score possible, pour cela, le serpent doit avaler de la nourriture et à chaque fois qu'il mange, il grandit. 
La partie se termine lorsque sa tête se heurte dans une partie de son corps (ou lorsqu'il rencontre un obstacle ou s'il percute le mur extérieur).

La version actuelle est la v2.0.0

## Version pour Ordinateur

Pour déplacer le serpent, utiliser soit les flêches directionnelles (haut, bas, gauche, droite), soit les touches 'z', 'q', 's', 'd'.

### Raccourcis clavier

Des racourcis clavier ont été rajoutés à partir de la version 1.2
* Touche 'p', pour mettre en pause la partie. Un second appui sur la touche 'p' relance la partie en cours
* Touche 'n', pour lancer une nouvelle partie
* Touche 'o', pour ouvrir le menu 'Options'
* Touche 'b', pour ouvrir le menu 'Top 10 scores'

## Version pour appareils tactiles

Depuis la version 1.3.0, le jeu est disponible pour les appareils tactiles comme les smartphones et les tablettes.
Pour déplacer le serpent, il suffit d'effectuer le geste dans la direction souhaitée. Par exemple, si le joueur déplace son doigt de gauche à droite sur l'écran, le serpent se déplacera vers la droite. 

## Options

Vous avez la possibilité de modifier plusieurs paramètres de jeu
* Mode Standard
    * Le niveau de difficulté: facile, normal ou expert
    * L'ajout de la nourriture spéciale
    * L'ajout d'obstacles
    * La vitesse du serpent
    * Les différentes couleurs (tête et corps du serpent, nourriture, obstacles, grille et thème)
* Mode personnalisé
    * La taille de la grille de jeu en pourcentage (de 10% à 90%). La taille dépend du périphérique utilisé.
    * L'ajout de la nourriture spéciale
    * Désactiver l'accés aux murs extérieurs
    * L'ajout d'obstacles
    * Le nombre d'obstacles (de 1 à 50) (à condition d'accepter l'ajout d'obstacles)
    * La vitesse du serpent
    * Les différentes couleurs (tête et corps du serpent, nourriture, obstacles, grille et thème)

## Sauvegarde des meilleurs scores

Les 10 meilleurs scores de chaque niveau de difficulté seront sauvegardés.

Les données ne sont pas conservées d'un navigateur à l'autre.

Si le joueur ne fait pas de score, il ne sera pas sauvegardé.

Les données peuvent être supprimées. Pour cela, il faut appuyer sur le bouton 'Supprimer l'historique'.
**ATTENTION:** tous les meilleurs scores de chaque niveau de difficulté seront effacés 