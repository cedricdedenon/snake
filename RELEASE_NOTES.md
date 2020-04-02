# RELEASE NOTES JEU "Snake"

## Version 2.0.0 [02/04/2020]
* Restructuration complète du code
	* utilisation de la programmation orientée objet (au lieu de la programmation structurelle)
	* utilisation du JavaScript ES6+
	* abandon du jQuery
* Abandon du localStorage: les 10 meilleurs scores seront sauvegardés quelque soit le navigateur
* Redesign du CSS
	* Affichage du score et du temps
	* Dans le menu 'option', changements majeurs de disposition des formulaires
	* Dans le menu 'TOP 10', déplacement du bouton 'Supprimer l'historique'
* Ajout de fonctionnalités
	* Une nouvelle nourriture peut être générée toutes les 20 secondes et placée aléatoirement sur la grille, cette nourriture spéciale rapporte 3 points.
	* Les couleurs de la tête du serpent, de la grille et du thème général de la page HTML peuvent être modifiés
	* Le choix des couleurs sont infinis (au lieu de 16 couleurs précédemment)
	* Plus de choix possibles pour la vitesse du serpent. Utilisation d'un slider au lieu d'un menu déroulant
	* Ajout d'un bouton 'reinitialiser' pour remettre tous les paramètres initialisés par défaut 

## Version 1.3.0 [12/03/2020]
* Le jeu est entièrement responsive. La taille de la grille de jeu dépend de la taille du périphérique utilisé. 
Pour le mode 'personnalisé', le joueur choisi la taille de la grille en pourcentage en non plus en pixel.
* Le jeu est utilisable pour les appareils tactiles (Smartphone, tablette ...)
* Création de la fenêtre de fin de partie avec toutes les informations de la partie ecoulée. Si le joueur a effectué un nouveau record, un message sera affiché.
* Correction de la compatibilité du localStorage pour le navigateur Edge
* Si le joueur ne fait aucun point, le record ne sera pas enregistré

## Version 1.2.2 [10/09/2019]
* Correction de bugs de l'algorithme liés aux raccourcis clavier et à leurs diverses utilisations. De nombreux tests ont été effectués.
* Les tests sont tous concluants pour les navigateurs Chrome, Firefox et Edge
* Changement pour mettre le jeu en pause. La touche à utiliser est maintenant la touche 'p'

## Version 1.2.1 [05/09/2019]
* Correction de bugs de l'algorithme
* Gestion de la compatibilité pour les navigateurs ne supportant pas le localStorage

## Version 1.2.0 [25/07/2019]
* Ajout des raccourcis clavier
	* Touche 'Espace', pour mettre en pause la partie. Un second appui sur la touche 'Espace' relance la partie en cours
	* Touche 'n', pour lancer une nouvelle partie
	* Touche 'o', pour ouvrir le menu 'Options'
	* Touche 'b', pour ouvrir le menu 'Top 10 scores'
* Ajout de fonctionnalités des options (plus de choix pour les couleurs et la vitesse du serpent)
* Ajout du mode "personnalisé"
	* Choix de la taille de la grille
	* Choix du nombre d'obstacles
	* Choix de l'utilisation des murs extérieurs
* Ajout des meilleurs scores du mode "Personnalisé"
* Redesign du css (header, menu 'Options' et menu 'TOP 10 scores')
* Correction de bugs de l'algorithme
* Restructuration du code

## Version 1.1.0 [08/07/2019]
* Ajout des meilleurs scores de chaque niveau de difficulté (localStorage)
* Modification de la charte graphique

## Version 1.0.1 [18/01/2019]
Correction de bugs concernant la gestion générale du jeu
Validé avec les navigateurs Chrome, FireFox et Edge
NOTE: sous Edge, lors de l'actualisation de la page, les valeurs par défaut du formulaire ne sont pas réinitialisés 

## Version 1.0.0 [24/11/2018]
Création du jeu
* Choix du niveau de difficulté (3 niveaux différents)
* Ajout possible d'obstacles
* Gestion de la vitesse du serpent
* Gestion des couleurs (serpent, nourriture, obstacles)