/*
File: snake.js
Description: créer le jeu 'snake' en Javascript avec jQuery
Author: Cédric Dedenon
Date de création: 24/11/2018
Version 1.0.0: création
Version 1.0.1: correction de bugs, validé avec Chrome, FireFox et Edge (modifié le 18/01/2019)
		   	   NOTE: sous Edge, lors de l'actualisation de la page, les valeurs par défaut du formulaire ne sont pas réinitialisés 
Version 1.1.0: ajout des meilleurs scores (localStorage) et modification de la charte graphique (modifié le 08/07/2019)
*/

$(function(){
	
	/* ***************************************************************************************************
	******************************************************************************************************
	*								DECLARATION DES VARIABLES 
	******************************************************************************************************
	*  ***************************************************************************************************/
	var snake_head, score, minute, second;
	var container_width, container_height, random_x, random_y;
	var snake_color = 'black';
	var obstacles_color = 'royalblue';
	var tab_obstacles = [];
	var animation_time = 100;

	var snake_body = {
		length: 0,
		coord: {
			x: [],
			y: []
		},
	};

	var newRecord = [];


	/* ***************************************************************************************************
	******************************************************************************************************
	*								GESTION GENERALE DU JEU
	******************************************************************************************************/
	//	1.	Initialisation et affectation des variables
	init();

	//	2.	Tous les 100ms, on fait appel à la fonction 'managingContainer' permettant la gestion générale du jeu
	var animation_snake = setInterval(function(){ managingContainer(); }, animation_time);

	//	3.	On met à jour le temps toutes les secondes
	setInterval(function(){ getTime(); }, 1000);
 	


	/* ***************************************************************************************************
	******************************************************************************************************
	*								GESTION DES EVENEMENTS 
	******************************************************************************************************
	*  ***************************************************************************************************/
	/* 
	*	Si on clique sur le bouton 'options', le formulaire s'affiche ou est caché alternativement
	*/
	$("#options").on('click', function(){
		$('form').slideToggle(500);
		$('footer').slideToggle(100);
	});


	/* 
	*	Si on clique sur le bouton 'nouvelle partie', on récupére les données entrés par l'utilisateur (options) et on relance une nouvelle partie avec ces valeurs
	*/
	$("#new").on('click', function(e){
		e.preventDefault();
		clearInterval(animation_snake);
		options();
		animation_snake = setInterval(function(){ managingContainer(); }, animation_time);
	});


	/* 
	*	Lors de la soumission du formulaire (appui sur le bouton 'Enregistrer'), on vient lire les valeurs entrées par l'utilisateur
	*	on adapte la grille, les obstacles (s'il en désire), on cache le formulaire et on réinitialise toutes les variables (fonction init())
	*/
	$('form').on("submit", function(e){
		e.preventDefault();
		clearInterval(animation_snake);
		options();
		animation_snake = setInterval(function(){ managingContainer(); }, animation_time);
		$('form').slideUp(500);
		$('footer').slideDown(100);
	});


	/* 
	*	On teste si l'utilisateur a appuyé sur les touches (flêche du haut, flêche du bas, flêche de gauche, flêche de droite) ou (z, q, s, d)
	*	on actualise alors l'objet 'snake_head' avec la direction souhaitée.
	*/
	$(window).on('keyup', function(e){
		switch (e.keyCode){
			case 90:
			case 38: 
				snake_head ="BOTTOM";
				break;
			case 81:
			case 37: 
				snake_head ="LEFT";
				break;
			case 83:
			case 40: 
				snake_head = "TOP";
				break;
			case 68:
			case 39:
				snake_head ="RIGHT";
				break;
		}
	});


	/* 
	*	RECORDS: Si on clique sur le bouton pour afficher nos meilleurs scores, on va récupérer les données stockées dans le localStorage.
	*   Ces données sont d'abord triées par le score effectué, puis par le temps si le score est identique.
	*	Enfin, on ajoute une ligne dans nos tableaux pour chaque score dans les 3 modes de jeu différents.
	*/
 	$('#bestscore').on('click', function(e){
		e.preventDefault();
		if ( typeof localStorage != "undefined" && JSON) {
			// On récupère les données stockées dans le localStorage
			var scores = JSON.parse(localStorage.getItem("NewScore"));
			$('#section-score').css('display', 'block');
			if(scores != null){
				var scoreswap = null;

				// On trie les données, en fonction du score, puis en fonction du temps si le score est identique
				scores.sort(function(a,b){
					// On récupère les temps dans les tableaux
					astring = a.time.split(' ');
					bstring = b.time.split(' ');

					//On récupère le temps des secondes
					a_secondtime = parseInt(astring[0]);
					b_secondtime = parseInt(bstring[0]);

					// On calcule les temps en secondes pour les deux temps à comparer
					if(astring.length === 4 && bstring.length === 4){
						a_minutetime = parseInt(astring[0]);
						a_secondtime = (a_minutetime*60) + parseInt(astring[2]);
						b_minutetime = parseInt(bstring[0]);
						b_secondtime = (b_minutetime*60) + parseInt(bstring[2]);
					} else if(astring.length === 2 && bstring.length === 4){
						b_minutetime = parseInt(astring[0]);
						b_secondtime = (b_minutetime*60) + parseInt(bstring[2]);
					} else if(astring.length === 4 && bstring.length === 2){
						a_minutetime = parseInt(astring[0]);
						a_secondtime = (a_minutetime*60) + parseInt(astring[2]);
					}

					return b_secondtime - a_secondtime;
				});

				scores.sort(function(a,b){
					return a.scoring - b.scoring;
				});
				scores.reverse();

				// On ajoute les lignes dans les tableaux
				for(var i=0; i<scores.length; i++)
				{	
					createLineTableRecord(scores[i]);
				}			
			}	
		}
	});


	/* 
	*	RECORDS: lorsque l'on clique sur un onglet, on affiche le contenu du mode sélectionné (Facile, Normal ou Expert)
	*/
	$("#onglets span").on("click", function(){
		var numonglet= $(this).attr("data-click");
		$("article").hide();
		$("#" + numonglet).show();
		$("#onglets span").removeClass("actif");
		$(this).addClass("actif");
	});


	/* 
	*	RECORDS: on ferme la fenêtre des meilleurs scores, on réinitilise tous les paramètres par défaut
	*/
 	$('#close').on('click', function(){
		initRecord();
		var actif = $('.actif').attr('data-click');
 	 	$("#" + actif).show();
	});


 	/* 
	*	RECORDS: lorsque l'on souhaite effacer notre historique des meilleurs scores, on supprime les données présentes en localStorage
	*	et on enlève toutes les données présentes dans la variable globale "newRecord"
	*/
 	$('#historique').on('click', function(e){
 		e.preventDefault;
 		if ( typeof localStorage != "undefined" && JSON) {
 			localStorage.removeItem("NewScore");
 			var length = newRecord.length;
 			for(var i=0; i < length; i++){
 				newRecord.pop();
 			}
 			initRecord();
 	 		$('article div').html('Il n\'y a aucun record actuellement dans ce mode de jeu');
 		}
 	});



	/* ***************************************************************************************************
	******************************************************************************************************
	*										FONCTIONS
	******************************************************************************************************
	*  ***************************************************************************************************/

	/**
	 * init(): fonction d'initialisation du jeu avec les instanciations et affectations des variables
	 * @param int - minObstacles (OPTIONS: indique le nombre minimum d'obstacles). Par défaut = 0 (pas d'obstacles)
	 * @param int - maxObstacles (OPTIONS: indique le nombre maximum d'obstacles). Par défaut = 0 (pas d'obstacles)
	 * @param String - obstacles_color (OPTIONS: indique la couleur de base des obstacles). Par défaut = royalblue
	 * @return void
	 */
	function init(minObstacles = 0, maxObstacles = 0, obstacles_color = 'royalblue'){
		// 1.	On initialise les variables (score, le temps) à 0 et on les affiche à l'écran
		snake_head=0; score = 0; minute=0, second=0;
		$('#score').html(score);
		$('#points').html('pt');
		$('#time').html(second);

		//	2.	Si une partie a déjà été joué, on supprime tous les éléments html crées précédemment et on réinitialise toutes les variables
		var length = snake_body.length;
		for (var i=length; i >= 0; i--){
			snake_body.coord.x.pop();
			snake_body.coord.y.pop();
		}
		snake_body.length = 0;
		$('.snake_body').remove();

		var length = tab_obstacles.length;
		for (var i=0; i < length; i++){
			tab_obstacles.pop();
		}
		$('.obstacle').remove();

		//	3.	On place la tête du serpent au centre du conteneur
		container_width = $('#container').width();
		container_height= $('#container').height();
		$("#snake_head").css('left',container_width/2).css('top', container_height/2);

		//	4.	On génére aléatoirement la nourriture et on la place dans le conteneur
		random_x = getRandomArbitrary(0, container_width -10);
		random_y = getRandomArbitrary(0, container_height-10);
		$('#food').css('display','block').css('left', random_x).css('top', random_y);	

		//	5.	CAS OU L'UTILISATEUR CHOISI D'INSERER DES OBSTACLES (le nombre d'ostacles est généré aléatoirement entre minObstacles et maxObstacles)
		if (maxObstacles != 0){
			var coord_obstacle_OK = true;				
			var idObstacles = 1;
			var nbObstacles = Math.floor(Math.random() * (maxObstacles - minObstacles + 1) + minObstacles);

			var obstacle = {
				length: 1,
				width: 0,
				height: 0,
				coord: {
					x: 0,
					y: 0
				}
			}

			for(var i=0; i< nbObstacles; i++, idObstacles++)
			{
				//Pour chaque obstacle, on crée un nouvel élément html avec la classe 'obstacle'
				var newdivObstacle = `<div class="obstacle" id="obstacle_` + idObstacles + `">`;
				$("#container").append(newdivObstacle);

				//On génére alétoirement une longueur et une direction
				var direction = Math.floor(Math.random() *2 + 1) -1;
				var length = Math.floor(Math.random() *2 + 1) -1;
				var obstacle_width = 0, obstacle_height = 0;
				if(direction === 0 && length === 0){ obstacle_width= 3; obstacle_height = 20; $('#obstacle_' + idObstacles).css('width', '3px').css('height', '20px'); }
				else if(direction === 0 && length === 1) { obstacle_width= 3; obstacle_height = 40; $('#obstacle_' + idObstacles).css('width', '3px').css('height', '40px'); }
				else if(direction === 1 && length === 0) { obstacle_width= 20; obstacle_height = 3; $('#obstacle_' + idObstacles).css('width', '20px').css('height', '3px'); }
				else { obstacle_width= 40; obstacle_height = 3; $('#obstacle_' + idObstacles).css('width', '40px').css('height', '3px'); }

				//On génére aléatoirement les coordonnées en x et en y des obstacles. 
				//On fait attention à ce que ces coordonnées ne soient pas identiques à la tête du serpent et à la nourriture
				do{
					coord_obstacle_OK = true;
					var obstacle_x = getRandomArbitrary(0, container_width -10);
					var obstacle_y = getRandomArbitrary(0, container_height-10);
					 
					if(random_x >= obstacle_x  && random_x <= (obstacle_x+obstacle_width) && random_y >= obstacle_y  && random_y <= (obstacle_y+obstacle_height)) {coord_obstacle_OK = false;}
					if(container_width/2 >= obstacle_x  && container_width/2 <= (obstacle_x+obstacle_width) && container_height/2 >= obstacle_y  && container_height/2 <= (obstacle_y+obstacle_height)) {coord_obstacle_OK = false;}
				}while (!coord_obstacle_OK);
				$('#obstacle_' + idObstacles).css('display','block').css('left', obstacle_x).css('top', obstacle_y);

				//On affecte l'objet 'obstacle' avec les données générés précédemement
				if(length === 0) obstacle.length = 20; else obstacle.length = 40;
				if(direction === 0){obstacle.width = 3; obstacle.height = obstacle.length} else {obstacle.width = obstacle.length; obstacle.height = 3};
				obstacle.coord.x = obstacle_x;
				obstacle.coord.y = obstacle_y;

				// On stocke tous les obstacles générés dans un tableau d'objets
				tab_obstacles.push({length : obstacle.length, width: obstacle.width, height: obstacle.height , x: obstacle.coord.x, y: obstacle.coord.y});
			}
			$('.obstacle').css('backgroundColor', obstacles_color);
		}

		//	6.	Initialisation des paramètres des meilleurs scores
		$('article div').html('Il n\'y a aucun record actuellement dans ce mode de jeu');
 		$("article").hide();
 		var actif = $('.actif').attr('data-click');
		$("#" + actif).show();
	}


	/**
	 * setCoord(): met à jour les coordonnées du serpent dans la variable 'snake_body'.
	 *			   On retire la dernière coordonnées (shift) et on insére la nouvelle coordonnée à la fin (push)
	 * @param int - snakeX (coordonnées de la tête du serpent en X)
	 * @param int - snakeY (coordonnées de la tête du serpent en Y)
	 * @return void
	 */
	function setCoord(snakeX, snakeY){
		snake_body.coord.x.shift();
		snake_body.coord.y.shift();
		snake_body.coord.x.push(snakeX);
		snake_body.coord.y.push(snakeY);	
	}


	/**
	 * growSnake(): met à jour les positions 'left' et 'top' du corps du serpent
	 * @return void
	 */
	function growSnake(){
		var length = snake_body.length;
		var id = 1;
		for (var i=length; i > 0; i--, id++){
			$("#snake_body_" + id).css('left', snake_body.coord.x[i]);
			$("#snake_body_" + id).css('top', snake_body.coord.y[i]);
		}
		$(".snake_body").css('backgroundColor', snake_color);
	}


	/**
	 * testCollision(): teste si la tête du serpent touche une partie de son corps ou un quelconque obstacle
	 * @param int - snakeX (coordonnées de la tête du serpent en X)
	 * @param int - snakeY (coordonnées de la tête du serpent en Y)
	 * @return boolean - true si les coordonnées de la tête se trouve dans la variable 'snake_body' ou dans le tableau d'objets 'tab_obstacles', false sinon
	 */
	function testCollision(snakeX, snakeY){
		var length = snake_body.length;
		if(length >= 1){
			for (var i=length; i >= 0; i--){
				if(snake_body.coord.x[i] === snakeX && snake_body.coord.y[i] === snakeY){
					return true;
				}
			}	
		}

		length = tab_obstacles.length;
		for (var i=0; i < length; i++){
			if(snakeX >= tab_obstacles[i].x  && snakeX <= (tab_obstacles[i].x+tab_obstacles[i].width) && snakeY >= tab_obstacles[i].y  && snakeY <= (tab_obstacles[i].y+tab_obstacles[i].height)) {
				return true;
			}
		}
		return false;
	}


	/**
	 * managingContainer(): gestion générale du jeu et du conteneur
	 * @return void
	 */
	function managingContainer(){
		//	1.	On récupère les coordonnées de la tête du serpent
		var snake_x = $('#snake_head').position().left;
		var snake_y = $('#snake_head').position().top;

		//	2.	On teste si la tête du serpent touche une partie de son corps ( ie la partie se termine et on relance une nouvelle partie)
		if(testCollision(snake_x, snake_y)){
			writeLocalStorage();
			var points = $('#score').html() > 1 ? 'points' : 'point';
			alert('Vous avez perdu. \nVotre score est de ' + score + ' ' + points);	
			clearInterval(animation_snake);
			options();
			animation_snake = setInterval(function(){ managingContainer(); }, animation_time);
		}

		//	3.  Gestion des extrémités du jeu
		if(snake_x === 0 || (snake_x) === container_width) $('#snake_head').css('left',0);
		else if(snake_x < 0) $('#snake_head').css('left', container_width); 			// Gauche
		else if((snake_x) > container_width) $('#snake_head').css('left', 0);		// Droite

		if(snake_y === 0 || (snake_y) === container_height) $('#snake_head').css('top',0);
		else if(snake_y < 0) $('#snake_head').css('top', container_height); 			// Haut
		else if((snake_y) > container_height) $('#snake_head').css('top', 0);		// Bas
		snake_x = $('#snake_head').position().left;
		snake_y = $('#snake_head').position().top;

		//	4.	Gestion de la nouriture avalé par le serpent, si le serpent l'avale, une nouvelle nourriture est généré aléatoirement
		// 		On actualise le score, on stocke une nouvelle valeur (le serpent s'agrandit d'une unité) et on crée une nouvelle
		//		balise 'div' contenant la classe 'snake_body' 
		if(snake_x === random_x && snake_y === random_y){
			// On teste également si la nourriture généré ne se trouve pas sur un obstacle
			do{
				var coord_obstacle_OK = true;
				random_x = getRandomArbitrary(0, container_width -10);
				random_y = getRandomArbitrary(0, container_height-10);

				for(var i=0; i< tab_obstacles.length; i++){
					if(random_x >= tab_obstacles[i].x  && random_x <= (tab_obstacles[i].x+tab_obstacles[i].width) && random_y >= tab_obstacles[i].y  && random_y <= (tab_obstacles[i].y+tab_obstacles[i].height)) {coord_obstacle_OK = false;}
				}				
			}while (!coord_obstacle_OK);
			$('#food').css('display','block').css('left', random_x).css('top', random_y);

			$('#score').html(++score);
			var points = $('#score').html() > 1 ? 'pts' : 'pt';
			$('#points').html(points);
			snake_body.length++;
			snake_body.coord.x.push(snake_x);
			snake_body.coord.y.push(snake_y);

			var newdiv = `<div class="snake_body" id="snake_body_` + (snake_body.length) + `">`;
			$("#container").append(newdiv);
		}

		//	5.	On met à jour l'objet 'snake_body'
		setCoord(snake_x, snake_y);		

		//	6.	On met à jour les propriétés 'left' et 'top' de tous nos 'div' correspondant au corps du serpent
		growSnake(snake_color); 

		//	7. Enfin, on met à jour les propriétés 'left' et 'top' de la tête du serpent  	
		switch (snake_head){
			case "BOTTOM": 
				snake_y -= 10;
				break;
			case "LEFT":
				snake_x -=10;
				break;
			case "TOP": 
				snake_y += 10;
				break;
			case "RIGHT":
				snake_x += 10;
				break;
		}
		$('#snake_head').css('left', snake_x).css('top', snake_y);
	}


	/**
	 * getRandomArbitrary(): genère un nombre alétoire entre le min et le max. Ce nombre doit obligatoirement être un multiple de 10
	 * @param int - min (valeur minimale)
	 * @param int - max (valeur maximale)
	 * @return int - le nombre généré aléatoirement
	 */
	function getRandomArbitrary(min, max) {
		min = Math.ceil(min);
  		max = Math.floor(max);
  		var nb;

  		do{
  			nb = Math.ceil(Math.random() * (max - min +1) + min);
  		}while(nb%10 != 0);
  		return nb;
	}


	/**
	 * getTime(): gestion du temps, met à jour le temps écoulé (au bout de 60 secondes, le compteur des minutes s'incrémente ...)
	 * @return void
	 */
	function getTime(){
		second++;
		if(second === 60){ second = 0; minute++;}
		if(minute === 0) $('#time').html(second + ' sec'); else $('#time').html(minute +  ' min ' + second + ' sec');	
	}


	/**
	 * options(): fonction permettant la gestion des paramètres optionnels (taille de la grille, vitesse de l'animation, insertion d'obstacles, couleur ...)
	 * @return void
	 */
	function options(){
		var minObstacles = 0, maxObstacles = 0;
		var grid = $('#length_grid').val();
		var hard = $('input[type=radio]:checked').val();
		var animation_time_locale = $('#animation_time').val();
		var snake_color_locale =  $('#snake_color').val();
		var food_color =  $('#food_color').val();
		var obstacles_color_locale =  $('#obstacles_color').val();

		//Gestion de la taille de la grille 
		switch(grid){
			case 'Expert': 
				$('#container').css('width','200px').css('height','100px');
				if(hard === "yes"){ minObstacles = 1; maxObstacles = 2; }
				break;
			case 'Normal': 
				$('#container').css('width','400px').css('height','200px');
				if(hard === "yes"){ minObstacles = 3, maxObstacles = 5; }
				break;
			case 'Facile': 
				$('#container').css('width','500px').css('height','300px');
				if(hard === "yes"){ minObstacles = 5, maxObstacles = 10; }
				break; 
		}

		//Gestion de la vitesse du serpent
		switch (animation_time_locale){
			case 'Normal': 
				animation_time = 100;
				break;
			case 'Rapide': 
				animation_time = 80;
				break;
			case 'Très rapide': 
				animation_time = 70;
				break;
		}

		//Gestion de la couleur du serpent
		switch (snake_color_locale){
			case 'Noir': 
				snake_color = 'black';
				break;
			case 'Vert': 
				snake_color = 'green';
				break;
			case 'Marron': 
				snake_color = 'saddlebrown';
				break;
		}

		//Gestion de la couleur de la nourriture
		switch (food_color){
			case 'Rouge': 
				$('#food').css('backgroundColor','red');
				break;
			case 'Or': 
				$('#food').css('backgroundColor','gold');
				break;
			case 'Fuchsia': 
				$('#food').css('backgroundColor','fuchsia');
				break;
			case 'Lime': 
				$('#food').css('backgroundColor','lime');
				break;
			case 'Cyan': 
				$('#food').css('backgroundColor','cyan');
				break;
		}

		//Gestion de la couleur des obstacles
		switch (obstacles_color_locale){
			case 'Bleu': 
				obstacles_color = 'royalblue';
				break;
			case 'Noir': 
				obstacles_color = 'black';
				break;
			case 'Violet': 
				obstacles_color = 'darkviolet';
				break;
		}

		//On relance l'initialisation pour prendre en compte toutes les nouvelles valeurs
		init(minObstacles, maxObstacles, obstacles_color);
	}


	/**
	 * writeLocalStorage(): remplit l'objet "newRecord" (niveau de difficulté, temps mis, score obtenu, si le joueur a joué avec des obstacles)
	 *                      et stocke les données dans le WebStorage (ici localStorage)
	 * @return void
	 */
	function writeLocalStorage(){
		if ( typeof localStorage != "undefined" && JSON) {
			newRecord.push({
				grid : $('#length_grid').val(),
				time : $('#time').html(),
				scoring :  $('#score').html(),
				obstacles: $('input[type=radio]:checked').val()
			});

			localStorage.setItem("NewScore", JSON.stringify(newRecord));
		}
	}


	/**
	 * createLineTableRecord(): crée une nouvelle ligne dans un des tableaux des meilleurs scores. On ne gardera que les 10 meilleurs
	 * @param Object - scores (défaut null)
	 * @return void
	 */
	function createLineTableRecord(scores = null){
		var grid = scores.grid;
		var time = scores.time;
		var scoring = scores.scoring;
		var obstacles = scores.obstacles;

		var nblines = $('table#scores_' +  grid + ' tbody tr');
		var points = scoring > 1 ? 'points' : 'point';
		if(nblines.length < 10){	
			var newline = '<tr><td>' +  scoring + ' ' + points + '</td><td>' + time + '</td><td>';
			if(obstacles === "yes") newline += '<span style="color:green; font-weight: bold;">&check;<span>';
			else newline += '<span style="color:red; font-weight: bold;">&cross;<span>';
			newline += '</td></tr>';
			$('table#scores_' +  grid).css('display', 'table');
			$('table#scores_' +  grid).append(newline);
			$('#' + grid + ' div').html('');
		}
	}


	/**
	 * initRecord(): réinitialise les meilleurs scores lorsque l'on ferme la fenêtre ou supprime l'historique
	 *				 on se replace dans le mode "Normal" par défaut
	 * @return void
	 */
 	function initRecord()
 	{
		$('#section-score').css('display', 'none');
		$('#onglets span').removeClass("actif");
		$('span[data-click="Normal"]').addClass('actif');
		$('table').css('display', 'none');
		$('tbody tr').remove();
 	}

});