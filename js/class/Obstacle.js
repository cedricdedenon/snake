/**
 * Obstacle class
 * @author Cédric Dedenon
 * @version 2.0.0
 */
class Obstacle {

	/**
	 * Constructor
	 */ 
	constructor(grid, color, idObstacles){
		this.color = color;
		this.generateRandomParameters(grid, idObstacles);
	}

	/**
	 * Getter of the length property
	 */ 
	get getLength(){
		return this.length;
	}

	/**
	 * Setter of the length property
 	 * @param length	value to apply to the length property
	 */
	set setLength(length){
		this.length = length;
	}

	/**
	 * Getter of the width property
   	 * @return Integer the width of the obstacles
	 */ 
	get getWidth(){
		return this.width;
	}

	/**
	 * Setter of the width property
 	 * @param width	value to apply to the width property
	 */
	set setWidth(width){
		this.width = width;
	}

	/**
	 * Getter of the height property
   	 * @return Integer the height of the obstacles
	 */ 
	get getHeight(){
		return this.height;
	}

	/**
	 * Setter of the height property
 	 * @param height	value to apply to the height property
	 */
	set setHeight(height){
		this.height = height;
	}

	/**
	 * Getter of the x coord property
   	 * @return Integer the x coordinate of the obstacles
	 */ 
	get getX(){
		return this.x;
	}

	/**
	 * Setter of the x coord property
 	 * @param x	value to apply to the x coord property
	 */
	set setX(x){
		this.x = x;
	}

	/**
	 * Getter of the y coord property
   	 * @return Integer the y coordinate of the obstacles
	 */ 
	get getY(){
		return this.y;
	}

	/**
	 * Setter of the y coord property
 	 * @param y	value to apply to the y coord property
	 */
	set setY(y){
		this.y = y;
	}

	/**
	 * Getter of the color property
   	 * @return String the color of the obstacles
	 */ 
	get getColor(){
		return this.color;
	}

	/**
	 * Setter of the color property
 	 * @param color	value to apply to the color property
	 */
	set setColor(color){
		this.color = color;
	}

	/**
 	 * Get a random number between min and max
	 * @param min	minimum number
	 * @param max	maximum number 
	 */
	getRandomNumber(min, max){
    	let nb = 0;
    	do{
        	nb = Math.ceil(Math.random() * (Math.floor(max) - Math.ceil(min) +1) + Math.ceil(min));
    	}while(nb%10 != 0);
    	return nb;
	}

	/**
 	 * Generate random coordinates, random length, random direction for an obstacle. Affect these values to the obstacle properties 
	 * @param grid	the grid object
 	 * @param idObstacles	the obstacle id
	 */
	generateRandomParameters(grid, idObstacles){	
		// For each obstacle, create an html element with the 'obstacle' class
        let newdiv = document.createElement('div');
        newdiv.id = 'obstacle_' + idObstacles;
     	newdiv.classList.add('obstacle');
        document.querySelector('#container').appendChild(newdiv);

        // Generate random length and random direction
        let direction = Math.floor(Math.random() *2 + 1) -1;
        let length = Math.floor(Math.random() *2 + 1) -1;
        let obstacleWidth = 0, obstacleHeight = 0, obstacleX = 0, obstacleY = 0;
		let coord_obstacle_OK = true;

        switch(direction + '' + length){
        	case '00': obstacleWidth = 3; obstacleHeight = 20; this.length = 20; this.width = 3; this.height = this.length; break;
         	case '01': obstacleWidth = 3; obstacleHeight = 40; this.length = 40; this.width = 3; this.height = this.length; break;
         	case '10': obstacleWidth = 20; obstacleHeight = 3; this.length = 20; this.width = this.length; this.height = 3; break;
         	case '11':obstacleWidth = 40; obstacleHeight = 3; this.length = 40; this.width = this.length; this.height = 3; break;
         	default: obstacleWidth = 3; obstacleHeight = 20; break;
        }
    
        // Generate random x and y coordinates. These coordinates mustn't be the same as neiher the snake head'coordinates or the food's coordinates 
        do{
            coord_obstacle_OK = true;
            obstacleX = this.getRandomNumber(-10, grid.getWidth -10);
            obstacleY = this.getRandomNumber(-10, grid.getHeight-10);
            if(grid.getWidth/2 >= obstacleX  && grid.getWidth/2 <= (obstacleX+grid.getWidth) && grid.getHeight/2 >= obstacleY  && grid.getHeight/2 <= (obstacleY+obstacleHeight)) {coord_obstacle_OK = false;}
        }while (!coord_obstacle_OK);

        this.width = obstacleWidth;
        this.height = obstacleHeight;
        this.x = obstacleX;
        this.y = obstacleY;

        this.applyCSS(idObstacles);
	}

	/**
 	 * Apply CSS style to the obstacle object
  	 * @param idObstacles	the obstacle id
	 */
	applyCSS(idObstacles){
 		document.querySelector('#obstacle_' + idObstacles).style.backgroundColor = this.color;
	    document.querySelector('#obstacle_' + idObstacles).style.left = this.x + 'px';
	    document.querySelector('#obstacle_' + idObstacles).style.top = this.y + 'px';
	    document.querySelector('#obstacle_' + idObstacles).style.width = this.width + 'px';
 		document.querySelector('#obstacle_' + idObstacles).style.height = this.height + 'px';
 		document.querySelector('#obstacle_' + idObstacles).style.display = 'block';
	}

	/**
 	 * Remove an obstacle and destroy the object
	 */
	removeObstacle(){
	    let obstacles = document.querySelector('.obstacle');
    	obstacles.parentNode.removeChild(obstacles); 
	    delete this; 
	}
}