/*
	File: snake.js
	Require Files: variables.js et functions.js
	Description: créer le jeu 'snake' en Javascript avec jQuery
	Author: Cédric Dedenon
	Date de création: 24/11/2018
	Version: 1.2.2
*/

$(function(){
	/* *************************
	*  Gestion générale du jeu 
	***************************/
	initForm();		// On crée le formulaire 'Standard' de manière dynamique
	containerResponsive('Normal');
	init();			// On initialise les variables nécéssaires
	startGame();	// On démarre le jeu

	/* *************************
	* 	Gestion des évenéments 
	***************************/
	/* 
	*	On teste si l'utilisateur a appuyé sur les touches (flêche du haut, flêche du bas, flêche de gauche, flêche de droite) ou (z, q, s, d)
	*	on actualise alors l'objet 'snake_head' avec la direction souhaitée.
	*	Par appui sur la touche 'p', le joueur met le jeu en pause (ou on relance la partie en cours alternativement)
	*	Par appui sur la touche 'n', le joueur lance une nouvelle partie
	*	Par appui sur la touche 'o', le joueur ouvre le menu 'Options'
	*	Par appui sur la touche 'b', le joueur ouvre le menu 'TOP 10 scores'
	*/
	$(window).on('keyup', function(e){
		e.preventDefault();
		if(!keyboardOff){
			switch (e.key){
				case 'z':
				case 'ArrowUp': 
					snake_head ="BOTTOM";
					break;
				case 'q':
				case 'ArrowLeft': 
					snake_head ="LEFT";
					break;
				case 's':
				case 'ArrowDown': 
					snake_head = "TOP";
					break;
				case 'd':
				case 'ArrowRight':
					snake_head ="RIGHT";
					break;
				case 'p':
					pauseOrStartGame();	
					break;	
				case 'n': 
					options();	
					startGame();
					break;
				case 'o': 
					openOptions(default_form);
					break;
				case 'b': 
					initWindowRecord();
					break;
			}
		}
	});

	/* 
	*	TACTILE: on enregistre les coordonnées lorsque le joueur utilise son doigt sur l'écran
	*/
	$('#section-game').on('touchstart',function(e){
		e.preventDefault();
		startx = parseInt(e.touches[0].clientX);
		starty = parseInt(e.touches[0].clientY);
	});

	/* 
	*	TACTILE: on enregistre les coordonnées lorsque le joueur déplace son doigt sur l'écran
	*	On compare ces coordonnées avec les coordonnées initiales pour la gestion de la direction de la tête de serpent 
	*/
	$('#section-game').on('touchmove',function(e){
		e.preventDefault();
		var distx = parseInt(e.touches[0].clientX) - startx;
		var disty = parseInt(e.touches[0].clientY) - starty;

		if(distx >= 0 && Math.abs(distx) > Math.abs(disty)) snake_head ="RIGHT";
		if(distx < 0 && Math.abs(distx) > Math.abs(disty)) snake_head ="LEFT";
		if(disty >= 0 && Math.abs(disty) > Math.abs(distx)) snake_head ="TOP";
		if(distx < 0 && Math.abs(disty) > Math.abs(distx)) snake_head ="BOTTOM";
	});

	/* 
	*	Si on clique sur le bouton 'Rejouer', on récupére les données entrées par l'utilisateur (options) et on relance une nouvelle partie avec ces valeurs
	*/
	$("#new, #newgame").on('click', function(){
		$('#endgame').css('display', 'none');
		$('#newrecord img').remove();
		options();
		startGame();
	});

	/* 
	*	Si on clique sur le bouton 'Options', le formulaire précédemment modifié s'affiche (par défaut le mode standard est sélectionné) 
	*/
	$("#options").on('click', function(){
		openOptions(default_form);
	});

	/* 
	*	Si on clique sur un onglet du menu 'Options', le formulaire du mode sélectionné s'affiche 
	*/
	$("#section-form .onglets li").on('click', function(){
		var numonglet= $(this).attr("data-click");
		$("#section-form .onglets li").removeClass("actif");
		$(this).addClass("actif");
		openOptions(numonglet);
	});
	
	/* 
	*	Pour le mode personnalisé, si le joueur choisit d'ajouter des obsatcles, le champ 'nombre d'obstacles' est disponible 
	*/
	$('#form-perso').on('change', function(){
		if($(':radio[name="obstacles"]:checked').val() === 'yes') $('#nb_obstacles').attr('disabled', false);
		else $('#nb_obstacles').attr('disabled', true);
	});

	/* 
	*	Lors de la soumission du formulaire (appui sur le bouton 'Enregistrer'), on vient lire les valeurs entrées par l'utilisateur
	*	on adapte la grille, les obstacles (s'il en désire), on quitte le menu et on réinitialise toutes les variables
	*/
	$('form').on("submit", function(e){
		keyboardOff = false;
		e.preventDefault();
		options();
		startGame();
		$('#section-form').css('display', 'none');
	});

	/* 
	*	Si on clique sur le bouton pour afficher les meilleurs scores, on va récupérer les données stockées dans le localStorage.
	*   Ces données sont d'abord triées selon le score effectué, puis par le temps si le score est identique.
	*	Enfin, on ajoute une ligne dans nos tableaux pour chaque score dans les 3 modes de jeu différents.
	*/
 	$('#bestscore').on('click', function(){
		initWindowRecord();
	});

	/* 
	*	Lorsque l'on clique sur un onglet du menu 'Top 10 scores', on affiche le contenu du mode sélectionné (Facile, Normal, Expert ou Personnalisé)
	*/
	$("#section-score .onglets li").on("click", function(){
		var numonglet= $(this).attr("data-click");
		$("article").hide();
		$("#" + numonglet).show();
		$("#section-score .onglets li").removeClass("actif");
		$(this).addClass("actif");
	});

	/* 
	*	Lorsque l'on ferme la fenêtre des meilleurs scores, on réinitilise tous les paramètres par défaut et on relance la partie en cours
	*/
 	$('#section-score .close').on('click', function(){
		keyboardOff = false;
		closeWindowRecord();
		startGame();
		$('#section-score .modal-content article').remove();
	});

 	/* 
	*	Lorsque l'on souhaite effacer l'historique des meilleurs scores, on supprime les données présentes en localStorage,
	*	on enlève toutes les données présentes dans la variable globale "newRecord" et on quitte le menu
	*/
 	$('#historique').on('click', function(e){
		e.preventDefault;
		keyboardOff = false;
 		if ( typeof localStorage != "undefined" && JSON) {
 			localStorage.removeItem("NewScore");
 			var length = newRecord.length;
 			for(var i=0; i < length; i++){
 				newRecord.pop();
 			}
			closeWindowRecord();
			startGame();
 	 		$('article div').html('Il n\'y a aucun record actuellement dans ce mode de jeu');
 		}
 	});	
});