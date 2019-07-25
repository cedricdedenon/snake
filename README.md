# Snake

Le célébre jeu du "snake" reproduit en Javascript (avec jQuery) pour **Ordinateur**

Le but est d'obtenir le meilleur score possible, pour cela, le serpent doit avaler de la nourriture et à chaque fois qu'il mange, il grandit. 
Pour déplacer le serpent, utiliser soit les flêches directionnelles (haut, bas, gauche, droite), soit les touches 'z', 'q', 's', 'd'.
La partie se termine lorsque sa tête se heurte dans une partie de son corps (ou lorsqu'il rencontre un obstacle ou s'il percute le mur extérieur).

## Raccourcis clavier

Des racourcis clavier ont été rajoutés dans la nouvelle version
* Touche 'Espace', pour mettre en pause la partie. Un second appui sur la touche 'Espace' relance la partie en cours
* Touche 'n', pour lancer une nouvelle partie
* Touche 'o', pour ouvrir le menu 'Options'
* Touche 'b', pour ouvrir le menu 'Top 10 scores'

## Options

Vous avez la possibilité de modifier plusieurs paramètres de jeu
* Mode Standard
    * Le niveau de difficulté: facile, normal ou expert
    * L'ajout d'obstacles
    * La vitesse du serpent
    * La couleur du serpent
    * La couleur de la nourriture
    * La couleur des obstacles
* Mode personnalisé
    * La taille de la grille de jeu en pixels (longueur: de 100px à 1000px, largeur: de 100px à 500px)
    * L'ajout d'obstacles
    * Le nombre d'obstacles (de 1 à 50) (à condition d'accepter l'ajout d'obstacles)
    * Désactiver l'accés aux murs extérieurs
    * La vitesse du serpent
    * La couleur du serpent
    * La couleur de la nourriture
    * La couleur des obstacles

## Sauvegarde des meilleurs scores

### LocalStorage

Les 10 meilleurs scores de chaque niveau de difficulté seront sauvegardés.
Les données sont stockées dans le WebStorage (ici localStorage). 

L'interface localStorage mémorise les données sans limite de durée de vie. Elles ne sont pas effacées lors de la fermeture d'un onglet ou du navigateur.

Les données ne sont pas conservées d'un navigateur à l'autre.

### Suppression des données

Les données du localStorage peuvent être supprimées. Pour cela, il faut appuyer sur le bouton 'Supprimer l'historique'.
**ATTENTION:** tous les meilleurs scores de chaque niveau de difficulté seront effacés 