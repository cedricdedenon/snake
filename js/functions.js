/**
 * init(): fonction d'initialisation du jeu avec les instanciations et affectations des variables
 * @param int - minObstacles (OPTIONS: indique le nombre minimum d'obstacles). Par défaut = 0 (pas d'obstacles)
 * @param int - maxObstacles (OPTIONS: indique le nombre maximum d'obstacles). Par défaut = 0 (pas d'obstacles)
 * @param String - obstacles_color (OPTIONS: indique la couleur de base des obstacles). Par défaut = royalblue
 * @param int - nb_obstacles (OPTIONS: indique le nombre d'obstacles pour le mode personnalisé). Par défaut = 0
 * @return void
 */
function init(minObstacles = 0, maxObstacles = 0, obstacles_color = 'royalblue', nb_obstacles = 0){ 
    // 1.	On initialise les variables (le score, le temps) à 0 et on les affichent à l'écran
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

    length = tab_obstacles.length;
    for (i=0; i < length; i++){
        tab_obstacles.pop();
    }
    $('.obstacle').remove();

    //	3.	On place la tête du serpent au centre du conteneur
    container_width = $('#container').width();
    container_height= $('#container').height();
    $("#snake_head").css('left',container_width/2).css('top', container_height/2);

    //	4.	On génére aléatoirement la nourriture et on la place dans le conteneur. On fait attention à ce que la nourriture ne se trouve pas sur la tête du serpent
    do{
        random_x = getRandomArbitrary(-10, container_width -10);
        random_y = getRandomArbitrary(-10, container_height-10);
    }while(random_x === container_width/2 && random_y === container_height/2);
    $('#food').css('display','block').css('left', random_x).css('top', random_y);	

    //	5.	CAS OU L'UTILISATEUR CHOISI D'INSERER DES OBSTACLES (le nombre d'ostacles est généré aléatoirement entre minObstacles et maxObstacles)
    if (maxObstacles != 0 || nb_obstacles != 0){
        createObstacles(minObstacles, maxObstacles, obstacles_color, nb_obstacles);
    }

    //	6.	Initialisation des paramètres des meilleurs scores
    $('article div').html('Il n\'y a aucun record actuellement dans ce mode de jeu');
    $("article").hide();
    var actif = $('.actif').attr('data-click');
    $("#" + actif).show();
}

/**
 * createObstacles(): crée des obstacles et les placent aléatoirement dans la grille de jeu
 * @param int - minObstacles (OPTIONS: indique le nombre minimum d'obstacles). Par défaut = 0 (pas d'obstacles)
 * @param int - maxObstacles (OPTIONS: indique le nombre maximum d'obstacles). Par défaut = 0 (pas d'obstacles)
 * @param String - obstacles_color (OPTIONS: indique la couleur de base des obstacles). Par défaut = royalblue
 * @param int - nb_obstacles (OPTIONS: indique le nombre d'obstacles pour le mode personnalisé). Par défaut = 0
 * @return void
 */
function createObstacles(minObstacles, maxObstacles, obstacles_color, nb_obstacles)
{
    var coord_obstacle_OK = true;				
    var idObstacles = 1;
    var nbObstacles = nb_obstacles;
    if(nb_obstacles === 0) nbObstacles = Math.floor(Math.random() * (maxObstacles - minObstacles + 1) + minObstacles);

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

        //On génére aléatoirement une longueur et une direction
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
            var obstacle_x = getRandomArbitrary(-10, container_width -10);
            var obstacle_y = getRandomArbitrary(-10, container_height-10);
                
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
 * testCollision(): teste si la tête du serpent touche une partie de son corps
 * @param int - snakeX (coordonnée de la tête du serpent en X)
 * @param int - snakeY (coordonnée de la tête du serpent en Y)
 * @return boolean - true si les coordonnées de la tête se trouvent dans la variable 'snake_body', false sinon
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
}

/**
 * testCollisionObstacles(): teste si la tête du serpent touche un quelconque obstacle
 * @param int - snakeX (coordonnée de la tête du serpent en X)
 * @param int - snakeY (coordonnée de la tête du serpent en Y)
 * @return boolean - true si les coordonnées de la tête se trouvent dans le tableau d'objets 'tab_obstacles', false sinon
 */
function testCollisionObstacles(snakeX, snakeY){
    var length = tab_obstacles.length;
    for (var i=0; i < length; i++){
        if(snakeX >= tab_obstacles[i].x  && snakeX <= (tab_obstacles[i].x+tab_obstacles[i].width) && snakeY >= tab_obstacles[i].y  && snakeY <= (tab_obstacles[i].y+tab_obstacles[i].height)) {
            return true;
        }
    }
    return false;
}

/**
 * testCollisionWall(): teste si la tête du serpent touche une partie du mur (extrémité de la grille de jeu)
 * @param int - snakeX (coordonnée de la tête du serpent en X)
 * @param int - snakeY (coordonnée de la tête du serpent en Y)
 * @return boolean - true si la tête touche le mur, false sinon
 */
function testCollisionWall(snakeX, snakeY){
    if(snakeX < 0 || snakeX >= container_width || snakeY < 0 || snakeY >= container_height) return true;
    return false;
}

/**
 * managingContainer(): gestion générale du jeu et de la grille de jeu
 * @return void
 */
function managingContainer(wall = false){
    //	1.	On récupère les coordonnées de la tête du serpent
    var snake_x = Math.round($('#snake_head').position().left);
    var snake_y = Math.round($('#snake_head').position().top);
 
    //	2.	On teste si la tête du serpent touche une partie de son corps, un obstacle ou le mur extérieur
    //      Si true, la partie se termine et on relance une nouvelle partie
    if(testCollision(snake_x, snake_y) || testCollisionObstacles(snake_x, snake_y) || (wall && testCollisionWall(snake_x, snake_y))){
        writeLocalStorage();
        var points = $('#score').html() > 1 ? 'points' : 'point';
        alert('Vous avez perdu. \nVotre score est de ' + score + ' ' + points);	
        clearInterval(animation_snake);
        options();
        animation_snake = setInterval(function(){ managingContainer(wall); }, animation_time);
    }else{
        //	3.	Gestion de la nouriture avalé par le serpent, si le serpent l'avale, une nouvelle nourriture est généré aléatoirement
        // 		On actualise le score, on stocke une nouvelle valeur (le serpent s'agrandit d'une unité) et on crée une nouvelle
        //		balise 'div' contenant la classe 'snake_body' 
        if(snake_x === random_x && snake_y === random_y){
            // On teste également que la nourriture générée ne se trouve pas sur un obstacle déjà présent
            do{
                var coord_obstacle_OK = true;
                random_x = getRandomArbitrary(-10, container_width -10);
                random_y = getRandomArbitrary(-10, container_height-10);

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

        //	4.	On met à jour l'objet 'snake_body'
        setCoord(snake_x, snake_y);		

        //	5.	On met à jour les propriétés 'left' et 'top' de tous les 'div' correspondant au corps du serpent
        growSnake(snake_color); 

        //	6. Enfin, on met à jour les propriétés 'left' et 'top' de la tête du serpent  	
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

        //	7.  Gestion des extrémités du jeu
        if(!wall){
            if(snake_x >= container_width) $('#snake_head').css('left',0); 				// Droite
            if(snake_x < 0) $('#snake_head').css('left', container_width-10); 			// Gauche	
            if(snake_y >= container_height) $('#snake_head').css('top', 0);				// Bas
            if(snake_y < 0) $('#snake_head').css('top', container_height-10); 			// Haut		
        }
    }
}

/**
 * getRandomArbitrary(): génère un nombre aléatoire entre le min et le max. Ce nombre doit obligatoirement être un multiple de 10
 * @param int - min (valeur minimale)
 * @param int - max (valeur maximale)
 * @return int - le nombre génèré aléatoirement
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
 * getTime(): gestion du temps, met à jour le temps écoulé (au bout de 60 secondes, le compteur des minutes s'incrémente)
 * @return void
 */
function getTime(){
    second++;
    if(second === 60){ second = 0; minute++;}
    if(minute === 0) $('#time').html(second + ' sec'); else $('#time').html(minute +  ' min ' + second + ' sec');	
}

/**
 * openOptions(): crée un formulaire en fonction du paramètre 'numonglet'
 * @param String - numonglet (le formulaire à créer: mode standard ou mode personnalisé)
 * @return void
 */
function openOptions(numonglet = 'form-default'){
    keyboardOff = true;
    pauseOrStartGame();
    if(default_form != numonglet){
        $('form fieldset, form div').remove();
        default_form = numonglet;
        createForm(numonglet);
    }
    $('#section-form').css('display', 'block');		
    $('#' + numonglet).css('display', 'block');
    $("#section-form .onglets li").removeClass("actif");
    $('li[data-click="'+ default_form + '"]').addClass("actif");
}

/**
 * options(): permet la gestion des paramètres optionnels (taille de la grille, vitesse de l'animation, insertion d'obstacles, couleurs ...)
 * @return void
 */
function options(){
    var minObstacles = 0, maxObstacles = 0;
    var grid_default = $('#difficulty').val();
    var obstacles = $('input[type=radio]:checked').val();
    var animation_time_locale = $('#animation_time').val();

    // Gestion de la taille de la grille (mode standard)
    switch(grid_default){
        case 'Expert': 
            $('#container').css('width','200px').css('height','100px');
            $('body').css('min-width', '250px');
            if(obstacles === "yes"){ minObstacles = 1; maxObstacles = 2; }
            break;
        case 'Normal': 
            $('#container').css('width','400px').css('height','200px');
            $('body').css('min-width', '450px');
            if(obstacles === "yes"){ minObstacles = 3, maxObstacles = 5; }
            break;
        case 'Facile': 
            $('#container').css('width','500px').css('height','300px');
            $('body').css('min-width', '550px');
            if(obstacles === "yes"){ minObstacles = 5, maxObstacles = 10; }
            break; 
    }

    // Gestion de la taille de la grille  (mode personnalisé) + nombre d'obstacles + mur
    var grid_perso_width = $('#grid_width').val();
    var grid_perso_height = $('#grid_height').val();
    $('#container').css('width', grid_perso_width + 'px').css('height', grid_perso_height + 'px');
    $('body').css('min-width', parseInt(grid_perso_width)+50 + 'px');
    var nb_obstacles = 0;
    if($(':radio[name="obstacles"]:checked').val() === 'yes') nb_obstacles = $('#nb_obstacles').val();
    if($(':radio[name="wall"]:checked').val() === 'no'){ wall = true; } else { wall=false;}

    // Gestion de la vitesse du serpent
    switch (animation_time_locale){
        case 'Très lent': 
            animation_time = 110;
        break;
        case 'Lent': 
            animation_time = 100;
        break;
        case 'Normal': 
            animation_time = 90;
            break;
        case 'Rapide': 
            animation_time = 80;
            break;
        case 'Très rapide': 
            animation_time = 70;
            break;
        case 'Très très rapide': 
            animation_time = 60;
            break;
    }

    // Gestion des couleurs
    snake_color =  convertColorFrtoEn($('#snake_color').val());
    var food_color =  convertColorFrtoEn($('#food_color').val());
    $('#food').css('backgroundColor', food_color);
    obstacles_color =  convertColorFrtoEn($('#obstacles_color').val());

    // On appelle la fonction d'initialisation pour prendre en compte toutes les nouvelles valeurs
    init(minObstacles, maxObstacles, obstacles_color, nb_obstacles);
}

/**
 * pauseOrStartGame(): met alternativement le jeu en pause ou le redémarre
 * @return void
 */
function pauseOrStartGame(){
    if(isPause) startGame(); else pauseGame();	
}

/**
 * pauseGame(): met le jeu en pause
 * @return void
 */
function pauseGame(){
    isPause = true;
    clearInterval(animation_snake);
    clearInterval(time);
}

/**
 * startGame(): (re)démarre le jeu
 * @return void
 */
function startGame(){
    isPause = false;

    // Toutes les 100ms, on fait appel à la fonction 'managingContainer' permettant la gestion générale du jeu
    animation_snake = setInterval(function(){ managingContainer(wall); }, animation_time);

    // On met à jour le temps toutes les secondes
    time = setInterval(function(){ getTime(); }, 1000);
}

/**
 * initForm(): crée un formulaire (le formulaire standard par défaut)
 * @return void
 */
function initForm(){
    createForm(default_form);
    $('li[data-click="form-default"]').addClass('actif');
}

/**
 * createOptionElement(): crée un formulaire par défaut
 * @param String - elmtClass (valeur à affecter: snake, food, obstacles)
 * @param String - defaultColor (couleur par défaut si le joueur n'a rien défini). Par défaut: noir
 * @return void
 */
function createOptionElement(elmtClass, defaultColor = 'black'){
    var color = ['black','blue','brown','coral','crimson','cyan','darkblue','fuchsia','gold','green','lime','magenta','orange','purple','red','yellow'];
    var colorFr = ['Noir','Bleu','Marron','Corail','Crimson','Cyan','Bleu foncé','Fuchsia','Or','Vert','Lime','Magenta','Orange','Violet','Rouge','Jaune'];
    var select = $('#' + elmtClass + '_color');
    var nbColor = color.length;

    for(var i=0; i < nbColor; i++){
        var option = '<option val="' + elmtClass + '_' + color[i] + '"';
        if(defaultColor === color[i]) option += ' selected';
        option += '>' + colorFr[i] + '</option>';
        select.append(option);
    }
}

/**
 * convertColorFrtoEn(): convertit la couleur entrée en paramètre de Français à Anglais
 * @param String - color (la couleur à convertir)
 * @return String - any (la couleur convertie)
 */
function convertColorFrtoEn(color){
    switch(color){
        case 'Noir': return 'black'; break;
        case 'Bleu': return 'blue'; break;
        case 'Marron': return 'brown'; break;
        case 'Corail': return 'coral'; break;
        case 'Crimson': return 'crimson'; break;
        case 'Cyan': return 'cyan'; break;
        case 'Bleu foncé': return 'darkblue'; break;
        case 'Fuchsia': return 'fuchsia'; break;
        case 'Or': return 'gold'; break;
        case 'Vert': return 'green'; break;
        case 'Lime': return 'lime'; break;
        case 'Magenta': return 'magenta'; break;
        case 'Orange': return 'orange'; break;
        case 'Violet': return 'purple'; break;
        case 'Rouge': return 'red'; break;
        case 'Jaune': return 'yellow'; break;
        default: return 'black';
    }
}

/**
 * createDefaultParameterForm(): crée les champs (niveau de difficulté et obstacles) du formulaire par défaut
 * @return String
 */
function createDefaultParameterForm(){
    return `<fieldset>
                <legend>Niveau de difficulté</legend>
                <div>
                    <label for="difficulty">Niveau :</label>
                    <select id="difficulty" autocomplete="off">
                        <option val="small">Expert</option>
                        <option val="medium" selected>Normal</option>
                        <option val="large">Facile</option>
                    </select>
                </div>
                <div>
                    <label>Obstacles ?</label>
                    <input type="radio" name="obstacles" value="yes" autocomplete="off">Oui
                    <input type="radio" name="obstacles" value="no" checked autocomplete="off">Non
                </div>
            </fieldset>`;
}

/**
 * createPersonalParameterForm(): crée les champs (niveau de difficulté, obstacles, nombre d'obstacles, mur) du formulaire personnalisé
 * @return String
 */
function createPersonalParameterForm(){
    return `<fieldset>
                <legend>Niveau de difficulté</legend>
                <div>
                    <label for="grid_width">Taille de la grille :</label>
                    <input type="number" id="grid_width" autocomplete="off" placeholder="longueur" min="100" max="1000" step="20" value="400"> X
                    <input type="number" id="grid_height" autocomplete="off" placeholder="largeur" min="100" max="500" step="20" value="200"> px
                </div>
                <div>
                    <label>Traverser les murs ?</label>
                    <input type="radio" name="wall" value="yes" checked autocomplete="off">Oui
                    <input type="radio" name="wall" value="no" autocomplete="off">Non
                </div>	
                <div>
                    <label>Obstacles ?</label>
                    <input type="radio" name="obstacles" value="yes" autocomplete="off">Oui
                    <input type="radio" name="obstacles" value="no" checked autocomplete="off">Non
                </div>	
                <div>
                    <label for="nb_obstacles">Nombre d'obstacles : </label>
                    <input type="number" id="nb_obstacles" name="nb_obstacles" min="1" max="50" value="5" disabled>
                </div>
            </fieldset>`;
}

/**
 * createColorForm(): crée les champs (couleurs du serpent, de la nourriture et des obstacles) des formulaires
 * @return String
 */
function createColorForm(){
    return `<fieldset>
                <legend>Couleurs</legend>
                <div>
                    <label for="snake_color">Serpent:</label>
                    <select id="snake_color" autocomplete="off">
                    </select>

                    <label for="food_color">Nourriture:</label>
                    <select id="food_color" autocomplete="off">
                    </select>	

                    <label for="obstacles_color"> Obstacles:</label>
                    <select id="obstacles_color" autocomplete="off">
                    </select>
                </div>	
            </fieldset>`;
}

/**
 * createSpeedForm(): crée les champs (vitesse du serpent) des formulaires
 * @return String
 */
function createSpeedForm(){
    return `<fieldset>
                <legend>Vitesse du serpent</legend>
                <div>
                    <label for="animation_time">Vitesse : </label>
                    <select id="animation_time" autocomplete="off">
                        <option val="very_slow" selected>Très lent</option>
                        <option val="slow" selected>Lent</option>
                        <option val="normal" selected>Normal</option>
                        <option val="fast">Rapide</option>
                        <option val="very_fast">Très rapide</option>
                        <option val="flash">Très très rapide</option>
                    </select>
                </div>
            </fieldset>`;
}

/**
 * createSubmitForm(): crée les champs (bouton de validation) des formulaires
 * @return String
 */
function createSubmitForm(){
    return `<div id="form-submit">
                <button type="submit">Enregistrer</button>
            </div>`;
}

/**
 * createForm(): crée les formulaires
 * @param String - param (le nom du formulaire à créer). Par défaut, on crée le formulaire standard 'form-default'
 * @return void
 */
function createForm(param = 'form-default'){
    if(param === 'form-default') $('#' + param + ' form').append(createDefaultParameterForm());
    else $('#' + param + ' form').append(createPersonalParameterForm())
    $('#' + param + ' form').append(createSpeedForm());
    $('#' + param + ' form').append(createColorForm());
    $('#' + param + ' form').append(createSubmitForm());
    $('#' + param + ' form').append(createOptionElement('snake', 'black'));
    $('#' + param + ' form').append(createOptionElement('food', 'red'));
    $('#' + param + ' form').append(createOptionElement('obstacles', 'blue'));
}

/**
 * createArticleRecord(): crée les articles. Un article correspondant à un tableau comprenant les 10 meilleurs scores du niveau de difficulté
 * @param String - numonglet (le nom de l'article à créer). Par défaut, on crée l'article correspondant au niveau 'Normal'
 * @return String
 */
function createArticleRecord(numonglet = 'Normal'){
    var newArticle = `<article id="${numonglet}">
                <h2>TOP 10: Niveau ${numonglet}</h2>
                <div></div>
                <table id="scores_${numonglet}">
                    <thead>
                        <tr>
                            <th>Score</th>
                            <th>Temps</th>
                            <th>Obstacles</th>`	
                            if(numonglet === 'Personnalise'){
                                newArticle +=`<th>Grille</th>
                                <th>Murs</th>`
                            }
                            newArticle += `</tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </article>`;
    return newArticle;
}

/**
 * initWindowRecord(): crée les articles, initialise les variables lorsque le menu 'TOP 10 scores' est sélectionné (met en pause le jeu et affiche les records du niveau 'Normal')
 * @return void
 */
function initWindowRecord(){
    keyboardOff = true;
    pauseGame();
    if ( typeof localStorage != "undefined" && JSON){
        var articles = ['Expert', 'Normal', 'Facile', 'Personnalise'];
        articles.forEach(function(value){
            var article = createArticleRecord(value);
            $('#section-score .modal-content').append(article);
        });
        $('article div').html('Il n\'y a aucun record actuellement dans ce mode de jeu');
        writeRecord();	
        $("article").hide();
        $("#Normal").show();
    } else{
        $('#section-score li, #section-score button').remove();
        $('#section-score ul').css('justify-content', 'flex-end');
        $('#section-score').css('display', 'block');
        $('#section-score .modal-content').append('<article><h2>Votre navigateur ne supporte pas le localStorage.</h2> <div>Les scores ne peuvent pas être sauvegardés</div></article>'); 
    }

}

/**
 * closeWindowRecord(): réinitialise les meilleurs scores lorsque l'on ferme la fenêtre ou supprime l'historique
 *				 on se replace dans le mode "Normal" par défaut
    * @return void
    */
function closeWindowRecord()
{
    $('#section-score').css('display', 'none');
    if ( typeof localStorage != "undefined" && JSON) {
        $('#section-score .onglets li').removeClass("actif");
        $('li[data-click="Normal"]').addClass('actif');
        $('table').css('display', 'none');
    }
}

/**
 * writeLocalStorage(): remplit l'objet "newRecord" (niveau de difficulté, temps mis, score obtenu, obstacles, nombre d'obstacles, mur)
 *                      et stocke les données dans le WebStorage (ici localStorage)
 * @return void
 */
function writeLocalStorage(){
    if ( typeof localStorage != "undefined" && JSON) {
        newRecord.push({
            grid : $('#difficulty').val(),
            time : $('#time').html(),
            scoring :  $('#score').html(),
            obstacles: $('input[name=obstacles]:checked').val(),
            grid_length: $('#grid_width').val(),
            grid_height: $('#grid_height').val(),
            nb_obstacles: $('#nb_obstacles').val(),
            wall: $('input[name=wall]:checked').val(),
        });
        localStorage.setItem("NewScore", JSON.stringify(newRecord));
    }
}

/**
 * writeRecord(): on récupère les données 'en localStorage', on les trient, et on les affichent dans les tableaux selon le mode de difficulté
 * @return void
 */
function writeRecord(){
    if ( typeof localStorage != "undefined" && JSON) {
        // On récupère les données stockées dans le localStorage
        var scores = JSON.parse(localStorage.getItem("NewScore"));
        $('#section-score').css('display', 'block');
        if(scores != null){
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
    var grid_length = scores.grid_length;
    var grid_height = scores.grid_height;
    var nb_obstacles = scores.nb_obstacles;
    var wall = scores.wall;

    if( typeof grid === "undefined") { grid = "Personnalise";}
    var nblines = $('table#scores_' +  grid + ' tbody tr');

    var points = scoring > 1 ? 'points' : 'point';
    if(nblines.length < 10){	
        var newline = '<tr><td>' +  scoring + ' ' + points + '</td><td>' + time + '</td><td>';
        if(obstacles === "yes") newline += '<span style="color:green; font-weight: bold;">&check;</span>';
        else newline += '<span style="color:red; font-weight: bold;">&cross;</span>';

        if(grid === "Personnalise"){
            if(obstacles === "yes"){
                newline += '  (' + nb_obstacles + ')</td>';
            }
            newline += '<td>' + grid_length + ' x ' + grid_height + ' px</td><td>';
            if(wall === "no") newline += '<span style="color:green; font-weight: bold;">&check;<span>';
            else newline += '<span style="color:red; font-weight: bold;">&cross;<span>';
        }
        newline += '</td></tr>';
        $('table#scores_' +  grid).css('display', 'table');
        $('table#scores_' +  grid).append(newline);
        $('#' + grid + ' div').html('');
    }
}