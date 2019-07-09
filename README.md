# Snake

Le célébre jeu du "snake" reproduit en Javascript (avec jQuery) pour **Ordinateur**

Le but est d'obtenir le meilleur score possible, pour cela, le serpent doit avaler de la nourriture et à chaque fois qu'il mange, il grandit. 
Pour déplacer le serpent, utiliser soit les flêches directionnelles (haut, bas, gauche, droite), soit les touches 'z', 'q', 's', 'd'.
La partie se termine lorsque sa tête se heurte dans une partie de son corps (ou lorsqu'il rencontre un obstacle)

## Options

Vous avez la possibilité de modifier plusieurs paramètres de jeu
* Le niveau de difficulté: facile, normal ou expert
* L'ajout d'obstacles
* La vitesse du serpent
* La couleur du serpent
* La couleur de la nourriture
* La couleur des obstacles (à condition d'accepter l'ajout d'obstacles)

## Sauvegarde des meilleurs scores

### LocalStorage

Les 10 meilleurs scores de chaque niveau de difficulté seront sauvegardés.
Les données sont stockées dans le WebStorage (ici localStorage). 

L'interface localStorage mémorise les données sans limite de durée de vie. Elles ne sont pas effacées lors de la fermeture d'un onglet ou du navigateur.

Les données ne sont pas conservées d'un navigateur à l'autre.

### Suppression des données

Les données du localStorage peuvent être supprimées. Pour cela, il faut appuyer sur le bouton 'Supprimer l'historique'.
**ATTENTION:** tous les meilleurs scores de chaque niveau de difficulté seront effacés 