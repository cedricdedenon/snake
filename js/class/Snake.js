/**
 * Snake class: create a snake object
 * @author Cédric Dedenon
 * @version 2.0.0
 */
class Snake {
	/**
	 * Constructor
	 */ 
	constructor(colorHead, color){
		this.direction = null;
		this.head = new Object();
		this.head.color = 'grey';
		this.body = new Object();
		this.body.length = 0;
		this.body.x = [];
		this.body.y = [];
		this.body.color = color;
	}

	/**
	 * Getter of the direction property
   	 * @return String the direction of the snake
	 */ 
	get getDirection(){
		return this.direction;
	}

	/**
	 * Setter of the direction property
 	 * @param direction	direction to apply to the direction property
	 */ 
	set setDirection(direction){
		this.direction = direction;
	}

	/**
	 * Getter of the head x coordinate property
   	 * @return Integer the x coordinate of the snake'head
	 */ 
	get getHeadX(){
		return this.head.x = Math.round(document.querySelector('#snake_head').offsetLeft);
	}

	/**
	 * Setter of the head x coordinate property
 	 * @param x	value to apply to the head x coordinate property
	 */ 
	set setHeadX(x){
		this.head.x = x;
	}

	/**
	 * Getter of the head y coordinate property
   	 * @return Integer the y coordinate of the snake'head
	 */ 
	get getHeadY(){
		return this.head.y = Math.round(document.querySelector('#snake_head').offsetTop);	
	}

	/**
	 * Setter of the head y coordinate property
 	 * @param y	value to apply to the head y coordinate property
	 */ 
	set setHeadY(y){
		this.head.y = y;
	}

	/**
	 * Getter of the snake head color property
   	 * @return String the color of the snake'head
	 */ 
	get getHeadColor(){
		return this.head.color;
	}

	/**
	 * Setter of the snake head color property
 	 * @param color	color to apply to the color property
	 */
	set setHeadColor(color){
		this.head.color = color;
	} 

	/**
	 * Getter of the body length property
   	 * @return Integer the length of the snake'body
	 */ 
	get getBodyLength(){
		return this.body.length;
	}

	/**
	 * Setter of the body length property
 	 * @param length	value to apply to the body length property
	 */ 
	set setBodyLength(length){
		this.body.length = length;
	}

	/**
	 * Getter of the body x coordinate property
   	 * @return Integer the x coordinate of the snake'body
	 */
	get getBodyX(){
		return this.body.x;
	}

	/**
	 * Setter of the body x coordinate property	 
	 * @param x	value to apply to the body x property
	 */
	set setBodyX(x){
		this.body.x = x;
	}

	/**
	 * Getter of the body y coordinate property
   	 * @return Integer the y coordinate of the snake'body
	 */
	get getBodyY(){
		return this.body.y;
	}

	/**
	 * Setter of the body y coordinate property
 	 * @param y	value to apply to the body y property
	 */
	set setBodyY(y){
		this.body.y = y;
	}

	/**
	 * Getter of the body color of the snake'body
	 */ 
	get getBodyColor(){
		return this.body.color;
	}

	/**
	 * Setter of the body color property
 	 * @param color	color to apply to the color property
	 */
	set setBodyColor(color){
		this.body.color = color;
	}

	/**
 	 * Place the head at the center of the grid
	 * @param grid	the grid object
	 */
	placeHead(grid){
		this.head.x = grid.getWidth/2;
		this.head.y = grid.getHeight/2;
    	document.querySelector('#snake_head').style.left = this.head.x + 'px';
	    document.querySelector('#snake_head').style.top = this.head.y + 'px';
		document.querySelector('#snake_head').style.backgroundColor = this.head.color;	
	}

	/**
 	 * Remove both coordinates and css of the snake body
	 */
	removeBody(){
		let length = this.body.length;
		for (let i=length; i > 0; i--){
        	this.body.x.pop();
        	this.body.y.pop();

        	let snakeBody = document.querySelector('.snake_body');
        	snakeBody.parentNode.removeChild(snakeBody); 
    	}
    	this.body.length = 0;
	}

	/**
 	 * Push new coordinates in the body property (when the snake takes the food, he is growing up)
 	 * @param snakeHeadX	the new x coordinate
	 * @param snakeHeadY	the new y coordinate 
	 */
	grow(snakeHeadX, snakeHeadY){
        this.body.length++;
        this.body.x.push(snakeHeadX);
		this.body.y.push(snakeHeadY);

        let newdiv = document.createElement('div');
        newdiv.id = 'snake_body_' + this.body.length;
     	newdiv.classList.add('snake_body');
        document.querySelector('#container').appendChild(newdiv);    
	}

	/**
 	 * Update body x and body y properties. css is also modified 
	 */
	updateBodyXY(){
		this.body.x.shift();
	    this.body.y.shift();
	    this.body.x.push(this.head.x);
	    this.body.y.push(this.head.y);

    	let length = this.body.length;
	    let id = 1;
	    for (let i=length; i > 0; i--, id++){
        	document.querySelector('#snake_body_' + id).style.left = this.body.x[i] + 'px';
         	document.querySelector('#snake_body_' + id).style.top = this.body.y[i] + 'px';
	        document.querySelector('#snake_body_' + id).style.backgroundColor = this.body.color;
	    }
	}

	/**
 	 * Update head x and y properties. css is also modified 
	 * @param grid	the grid object
  	 * @param wall	wall parameter 
	 */
	updateHeadXY(grid, wall){
        switch (this.direction){
            case 'BOTTOM': 
                this.head.y -=  10;
                break;
            case 'LEFT':
                this.head.x -=  10;
                break;
            case 'TOP': 
                this.head.y +=  10;
                break;
            case 'RIGHT':
                this.head.x +=  10;
                break;
        }

	    document.querySelector('#snake_head').style.left = this.head.x + 'px';
     	document.querySelector('#snake_head').style.top = this.head.y + 'px';

	    // If there is no wall, ajust snake'head to the correct coordinates
		if(!wall){
			if(this.head.x >= grid.getWidth) document.querySelector('#snake_head').style.left = '0px';  		// Right
			if(this.head.x < 0) document.querySelector('#snake_head').style.left = grid.getWidth-10 + 'px'; 	// Left	
    		if(this.head.y >= grid.getHeight) document.querySelector('#snake_head').style.top = '0px';			// Bottom
        	if(this.head.y < 0) document.querySelector('#snake_head').style.top = grid.getHeight-10 + 'px';		// Top	
		}
	}

	/**
 	 * Update direction property when the player uses some keyboard touch
	 * @param evt	the event 
	 */
	moveTo(evt){
		switch (evt){
			case 'z':
			case 'ArrowUp': 
				this.direction = 'BOTTOM';
				break;
			case 'q':
			case 'ArrowLeft': 
				this.direction = 'LEFT';
				break;
			case 's':
			case 'ArrowDown': 
				this.direction = 'TOP';
				break;
			case 'd':
			case 'ArrowRight':
				this.direction = 'RIGHT';
				break;	
		}
	}
}