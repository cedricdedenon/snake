/**
 * Food class
 * @author Cédric Dedenon
 * @version 2.0.0
 */
class Food {
	/**
	 * Constructor
	 */ 
	constructor(color){
		this.color = color;
	}

	/**
	 * Getter of the color property
  	 * @return String the color of the food
	 */ 
	get getColor(){
		return this.color;
	}

	/**
	 * Setter of the color property
 	 * @param color	color to apply to the color property
	 */ 
	set setColor(color){
		this.color = color;
	}

	/**
	 * Getter of the x coordinate property
  	 * @return Integer the x coordinate of the food
	 */ 
	get getX(){
		return this.x;
	}

	/**
	 * Setter of the x coordinate property
  	 * @param x	value to apply to the x coordinate property
	 */ 
	set setX(x){
		this.x = x;
	}

	/**
	 * Getter of the y coordinate property
   	 * @return Integer the y coordinate of the food
	 */ 
	get getY(){
		return this.y;
	}

	/**
	 * Setter of the y coordinate property
   	 * @param y	value to apply to the y coordinate property
	 */ 
	set setY(y){
		this.y = y;
	}

	/**
 	 * Place food into the grid
	 * @param grid	the grid object
	 * @param tabObstacles	the obstacle objects array 
 	 * @param isFirst	boolean, if true, food mustn't place at the center of the grid else false, place everywhere  
	 */
	placeFood(grid, tabObstacles, isFirst){
		let coordFoodOK = true;
	    do{
	    	coordFoodOK = true;
        	this.x = this.getRandomNumber(-10, grid.getWidth -10);
        	this.y = this.getRandomNumber(-10, grid.getHeight-10);
        	for(let i=0; i< tabObstacles.length; i++)
                if(this.x >= tabObstacles[i].getX  && this.x <= (tabObstacles[i].getX + tabObstacles[i].getWidth) 
                	&& this.y >= tabObstacles[i].getY  && this.y <= (tabObstacles[i].getY + tabObstacles[i].getHeight)) coordFoodOK = false;
            if(isFirst && (this.x === grid.getWidth/2 && this.y === grid.getHeight/2)) coordFoodOK = false;	
    	}while(!coordFoodOK);
    	
    	this.applyCSS();
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
 	 * Apply CSS style to the food object 
	 */
	applyCSS(){
    	document.querySelector('#food').style.display = 'block';
	    document.querySelector('#food').style.left = this.x + 'px';
	    document.querySelector('#food').style.top = this.y + 'px';
		document.querySelector('#food').style.backgroundColor = this.color;    
	}
}