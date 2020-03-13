/* 
* Déclaration des variables globales 
*/

var snake_head;                             // Tête du serpent
var snake_body = {                          // Corps du serpent, stocke les coordonnées et sa longueur
    length: 0,
    coord: {
        x: [],
        y: []
    },
};

var animation_snake;                        // Animation du serpent
var animation_time = 100;                   // Temps de l'animation (100ms par défaut)

var time, minute, second;                   // Gestion du temps 
var score;                                  // Gestion du score 

var container_width, container_height;      // Longueur et largeur du conteneur, c'est-à-dire la grille du jeu 
var random_x, random_y;                     // Coordonnées utilisées pour placer la nourriture aléatoirement
var snake_color = 'black';                  // Couleur du corps du serpent (noir par défaut)
var obstacles_color = 'royalblue';          // Couleur des obstacles (bleu par défaut)
var default_form = 'form-default';          // Correspond au formulaire 'standard' dans le menu 'Options'
var wall = false;                           // True, si le joueur peut dépasser les murs extérieurs de la grille de jeu, false sinon (false par défaut)

var tab_obstacles = [];                     // Stocke les coordonnées de tous les obstacles générés aléatoirement
var newRecord = [];                         // Stocke tous les records disponibles dans le localStorage

var isPause = false;                        // Permet de savoir si le jeu est en pause (true) ou non (false par défaut)
var keyboardOff = false;                    // Désactive les touches clavier (true) ou non (false par défaut)

var startx = 0;                             // Gestion du tactile: enregistre la coordonnée en x
var starty = 0;                             // Gestion du tactile: enregistre la coordonnée en y