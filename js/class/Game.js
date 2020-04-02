/**
 * Main class of the snake game
 * @author Cédric Dedenon
 * @version 2.0.0
 */
class Game{
	/**
	 * Constructor
	 */ 
	constructor(){
		this.grid = new Grid('white');						// Create a game grid with a predefined height and width
		this.food = new Food('red');						// Create a food 
		this.specialFood = new FoodSpecial('red');			// Create a special food	
		this.snake = new Snake('grey','black');				// Create a snake
		this.form = new Form('default-form');		// Create a default-form with the predefined parameters (hidden by default)
		this.allScores = new Scores();				// Create an object which store all score done (hidden by default)
		this.windowEndGame = new EndWindow();		// Create the end game window (hidden by default)

		this.score = 0;					// The actual score of the game
		this.time = 0;					// The actual time of the game

		this.animationTime = 100;		// The time used to call execute method every 100ms (can be changed in the option menu)  
		this.animationSnake = null;		// Timer to move the snake
		this.timer = null;				// Timer to update time every 1 second
		this.timerInterSpecialFood  = null;		// Timer interval used to generate special food 
		this.timerSpecialFood = null;			// Hide the special food after the time is timeout

    	this.startx = 0;				// startx and starty are used to capture coordinates when the player touch the screen with his finger
    	this.starty = 0;
		this.isPause = false;			// Check if the game is on pause or not
		this.wall = false;				// Check is the wall of the grid is activated
		this.keyboardOff = false;		// Activate or desactivate the keyboard touch
		this.difficulty = 'normal';		// The difficulty mode. Normal is the default mode
		this.specialFoodActivated = false;		// Detect if the player has chosen to add the special food or not

		this.tabObstacles = [];			// An array of obstacles objects if the player want to add them, empty else

		this.init();			
		this.events();
	}

	/**
	 * Initialisation method: apply initialisation to all parameters, place snake head and food in the grid
	 */ 
	init(){
		this.reset();
		this.snake.removeBody();
		this.removeObstacles();

		this.options();

		this.snake.placeHead(this.grid);
		this.food.placeFood(this.grid, this.tabObstacles, true, 'food');
		this.snake.setDirection = null;
		this.specialFood.hideFood();	
	}
	
	/**
	 * Start the game
	 */ 
	start(){
		this.isPause = false;
		this.animationSnake = setInterval(() => this.execute(), this.animationTime);
		this.timer = setInterval(() => this.updateTime(), 1000);
		if(this.specialFoodActivated) this.timerInterSpecialFood = setInterval(() => this.generateSpecialFood(), 20000);
	}

	/**
	 * Stop the game
	 */
	stop(){
    	clearInterval(this.animationSnake);
    	clearInterval(this.timer);
    	clearTimeout(this.timerSpecialFood);
    	clearInterval(this.timerInterSpecialFood);
    	this.specialFood.hideFood();
	}

	/**
	 * Pause the game 
	 */
	pause(){
		this.isPause = true;
    	this.stop();
	}

	/**
	 * Pause or restart the game
	 */
	pauseOrStart(){
		if(this.isPause) this.start(); else this.pause();	
	}

	/**
	 * Execute method
	 */
	execute(){
		// Get the current snake'head coordinates
		let snakeHeadX = this.snake.getHeadX;
		let snakeHeadY = this.snake.getHeadY;

		// Test if the snake head touch his body, an obstacle or the wall of the grid. The player lost the game
		if(this.testCollision(snakeHeadX, snakeHeadY)){
			this.keyboardOff = true;
	      	this.stop();
 			if(this.score >= 1) this.allScores.addScore(this.difficulty, this.time, this.score, this.grid, this.tabObstacles.length, this.wall);
        	this.windowEndGame.displayWindowEndGame(this.score, this.time, this.difficulty, this.allScores);
		}else{
			// Test if the snake takes the food
			if(snakeHeadX === this.food.getX && snakeHeadY === this.food.getY){
				// Place another food in the grid (randomly), update score and body' snake length
				this.food.placeFood(this.grid, this.tabObstacles, false, 'food');
				this.updateScore(1);
				this.snake.grow(snakeHeadX, snakeHeadY);
		    }

			// Test if the snake takes the special food (the player wins 3 points)
		  	if(snakeHeadX === this.specialFood.getX && snakeHeadY === this.specialFood.getY){
	    		this.updateScore(3);
				this.snake.grow(snakeHeadX, snakeHeadY);
				this.specialFood.hideFood();
				clearTimeout(this.timerSpecialFood);
		    }

		    // Update both coordinates and css of the body' snake
	        this.snake.updateBodyXY();

	        // Update both coordinates and css of the head' snake
	        this.snake.updateHeadXY(this.grid, this.wall);
		}
	}

	/**
 	 * Test if the x and y coordinates are collision coordinates with the body' snake, with one obstacle or with the wall of the grid
	 * @param x	x coordinate
	 * @param y	y coordinate 
	 * @return true if there is a collision else false
	 */
	testCollision(x, y){
		// Test Collision with the body' snake 
    	let length = this.snake.getBodyLength;
	    if(length >= 1){
	        for (let i=length; i >= 0; i--)
	            if(this.snake.getBodyX[i] === x && this.snake.getBodyY[i] === y) return true;	
	    }

		// Test Collision with obstacles into grid 
	    length = this.tabObstacles.length;
	    for (let i=0; i < length; i++)
	        if(x >= this.tabObstacles[i].getX  && x <= (this.tabObstacles[i].getX + this.tabObstacles[i].getWidth) && y >= this.tabObstacles[i].getY  && y <= (this.tabObstacles[i].getY + this.tabObstacles[i].getHeight)) return true;
	 
		// Test Collision with the wall of the grid
	    if(x < 0 || x >= this.grid.getWidth || y < 0 || y >= this.grid.getHeight) return true;
	    return false;
	}

	/**
 	 * Create randomly obstacles and place them into the grid
	 * @param obstaclesColor	the color of the obstacles 
 	 * @param nbObstacles	the obstacles number
	 */
	createObstacles(obstaclesColor = 'royalblue', nbObstacles){
	    for(let i=0, idObstacles = 1; i< nbObstacles; i++, idObstacles++)
	    {
	        let obstacle = new Obstacle(this.grid, obstaclesColor, idObstacles);
	        this.tabObstacles.push(obstacle);    	
	    }
	}

	/**
 	 * Remove all obstacles into the grid
	 */
	removeObstacles(){
		let length = this.tabObstacles.length;
	    for (let i=0; i < length; i++) this.tabObstacles[i].removeObstacle();
	    for (let i=0; i < length; i++) this.tabObstacles.pop();    	
	}

	/**
 	 * Update the time of the game
	 */
	updateTime(){
    	this.time++;
    	let second = 0, minute = 0;
    	minute = Math.floor(this.time / 60);
    	second = this.time % 60;

    	if(second < 10) second = '0' + second;
    	if(minute < 10) minute = '0' + minute;

    	document.querySelector('#seconds').innerHTML = second + ''; 
    	document.querySelector('#minutes').innerHTML = minute + '' ;
	}

	/**
 	 * Update the score of the game
  	 * @param score	add 1 point or several points to score
	 */
	updateScore(score){
		this.score += score;
		document.querySelector('#score').innerHTML = this.score;
	}

	/**
 	 * Reset the score and time of the game
	 */
	reset(){
		this.time = 0;
		this.score = 0
		document.querySelector('#score').innerHTML = this.score;
		document.querySelector('#seconds').innerHTML = '00';
		document.querySelector('#minutes').innerHTML = '00';
	}

	/**
	 * Generate a special food. Place it into the grid. Hide it when the player has eaten it or when the time is timeout 
	 */ 
	generateSpecialFood(){
		this.specialFood.placeFood(this.grid, this.tabObstacles, true);
		this.timerSpecialFood = setTimeout(() => { 
			this.specialFood.hideFood();		
			}, 4000);	
	}

	/**
 	 * Open the option window
	 * @param name	the name of the form (either the default form or the custom form) 
	 */
	openOptions(name = 'default-form'){
		this.keyboardOff = true;
	    if(this.form.getName != name){
	        this.form.hideForm(this.form.getName);
	        this.form.setName = name;
	    }
	    this.form.displayForm(name);
	}

	/**
 	 * options method: update parameters when the player save them or for all new game
	 */
	options(){
		let minObstacles = 0, maxObstacles = 0;

		// Get all parameters from the form of the option window
		let {difficulty, customWidth, customHeight, specialFood, obstacles, nbObstacles, wall, animationTime, bodySnakeColor, foodColor, 
			obstacleColor, headSnakeColor, gridColor, themeColor} = this.form.getAllParameters(this.form.name);

	    this.difficulty = difficulty;

	    // Update color properties of the snake body, the food, the obstacles, the grid and the theme
	    this.snake.setBodyColor = bodySnakeColor;
	    this.food.setColor =  foodColor;
	    this.snake.setHeadColor = headSnakeColor;
	    this.grid.setColor = gridColor;
	    document.querySelector('body').style.backgroundColor = themeColor;
	    let obstacle_color =  obstacleColor;

	    // Resize grid depending of the difficulty mode and initialiase variables for generate random obstacles 
	    switch(this.difficulty){
	        case 'expert': 
	            this.grid.resize('expert');
	            minObstacles = 1; maxObstacles = 2;
	            break;
	        case 'normal': 
	            this.grid.resize('normal');
	            minObstacles = 3, maxObstacles = 5;
	            break;
	        case 'easy': 
	            this.grid.resize('easy');
	            minObstacles = 5, maxObstacles = 10;
	            break;
	        default:
	         	this.difficulty = 'custom';
	         	this.grid.resize('custom', customWidth, customHeight); 
	         	break;
	    }

	    // Check if the wall is set to no (custom-form form only)
	    if(wall === 'true') this.wall = true; else this.wall = false;
	
	    // Update animation time property
	    this.animationTime = animationTime;

	    // Generate random obstacles if the player want them
	    if(obstacles === 'true'){
        	if(nbObstacles === 0) nbObstacles = Math.floor(Math.random() * (maxObstacles - minObstacles + 1) + minObstacles);
       		this.createObstacles(obstacle_color, nbObstacles);
        }

        // If the player has chosen to add the special food, set to true the 'specialFoodActivated' variable
        if(specialFood === 'true') this.specialFoodActivated = true; else this.specialFoodActivated = false; 
	}

	/**
 	 * Events method	
	 */
	events(){
		// Keyboard events 
		window.addEventListener('keyup', (e) => {
			e.preventDefault();
			if(!this.keyboardOff){
				this.snake.moveTo(e.key);	
				switch(e.key){
					case 'p':
						this.pauseOrStart();	
						break;	
					case 'n': 
						this.stop();
						this.init();
						this.start();
						break;
					case 'o': 
						this.stop();
						this.openOptions(this.form.getName);
						break;
					case 'b': 
						this.keyboardOff = true;
						this.pause();
						this.allScores.displayScores();
						break;
				}
			}
		});

		// Touch events for tactile device
		document.querySelector('#section-game').addEventListener('touchstart', (e) => {
			e.preventDefault();
			this.startx = parseInt(e.touches[0].clientX);
			this.starty = parseInt(e.touches[0].clientY);
		});

		document.querySelector('#section-game').addEventListener('touchmove', (e) => {
			e.preventDefault();
			let distx = parseInt(e.touches[0].clientX) - this.startx;
			let disty = parseInt(e.touches[0].clientY) - this.starty;
			if(distx >= 0 && Math.abs(distx) > Math.abs(disty)) this.snake.direction = 'RIGHT';
			if(distx < 0 && Math.abs(distx) > Math.abs(disty)) this.snake.direction = 'LEFT';
			if(disty >= 0 && Math.abs(disty) > Math.abs(distx)) this.snake.direction = 'TOP';
			if(distx < 0 && Math.abs(disty) > Math.abs(distx)) this.snake.direction = 'BOTTOM';
		});

		// Lauch a new game when the player click on the "Rejouer" button (both at the end of the game with the end window and everytime)
		let newSnakeGame = document.querySelectorAll('#new, #newgame');
		newSnakeGame.forEach((item) => {
			item.addEventListener('click', () => {		
				this.keyboardOff = false;
				this.windowEndGame.closeWindowEndGame();
				this.stop();
				this.init();
				this.start();
			});
		});

		// Open the option window when the user click on the "Option" button
		document.querySelector('#options').addEventListener('click', () => {	
			this.stop();
			this.openOptions(this.form.getName);
		});

		// In the option window, navigate between the two available form (default-form or custom-form)
		let liForm = document.querySelectorAll('#section-form .onglets li')
		liForm.forEach((li) => {
			li.addEventListener('click', (e) => {
			this.openOptions(e.target.getAttribute('data-click'));
			});
		});

		// Only for the custom form, if the player choose to add obstacles, the input will be disabled to enter the obstacles number
		document.querySelector('#obstacles-form').addEventListener('change', () => {
			this.form.customFormNbObstacles();
		});

		// When the player submit the form with the desired parameters, the option window will close and a new game is lauching 
		document.querySelector('form').addEventListener('submit', (e) => {
			e.preventDefault();
			this.keyboardOff = false;
			this.form.closeWindowForm();
			this.init();
			this.start();
		});

		// Reset the form (put all parameters at their default values)
		document.querySelector('form').addEventListener('reset', (e) => {
			document.querySelector('#nb_obstacles').setAttribute('disabled', true);
		});

		// Open the bestscores window when the user click on the "TOP 10" button. The game is put on pause
		document.querySelector('#bestscore').addEventListener('click', () => {
			this.keyboardOff = true;
			this.pause();
			this.allScores.displayScores();
		});

		// In the bestscores window, navigate between difficulties mode (expert, normal, easy and custom)
		let liScore = document.querySelectorAll('#section-score .onglets li')
		liScore.forEach((li) => {
			li.addEventListener('click', (e) => {
				this.allScores.displayScoresByDifficulty(e);
			});
		});

		// Quit the bestscores window by clicking on the red cross at the top right corner. The game is not on pause anymore and the player can continue to play
 		document.querySelector('#section-score .close').addEventListener('click', () => {
			this.keyboardOff = false;
			this.allScores.closeWindowScores();
			this.start();
		});

	 	// Delete all scores saved by clicking on the "Supprimer l'historique" button. The game is not on pause anymore and the player can continue to play 
		let allButtonHisto = document.querySelectorAll('.historique')
		allButtonHisto.forEach((histo) => {
			histo.addEventListener('click', () => {
				this.keyboardOff = false;
				this.allScores.deleteScores();
				this.allScores.closeWindowScores();
				this.start();
			});
	 	});	
	}
}