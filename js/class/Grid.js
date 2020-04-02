/**
 * Grid class: create a grid with a width and height
 * @author Cédric Dedenon
 * @version 2.0.0
 */
class Grid{
	/**
	 * Constructor
	 */ 
	constructor(color){
		this.width = parseInt(getComputedStyle(document.getElementById('container'), null).width);
		this.height = parseInt(getComputedStyle(document.getElementById('container'), null).height);
		this.color = color;
	}

	/**
	 * Getter of the width property
 	 * @return Integer the width of the grid
	 */ 
	get getWidth(){
		return this.width;
	}

	/**
	 * Getter of the height property
  	 * @return Integer the height of the grid
	 */ 
	get getHeight(){
		return this.height;
	}

	/**
	 * Getter of the color property
  	 * @return String the color of the grid
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
 	 * Resize the grid depending of the device's width and height
	 * @param difficulty	the difficulty mode (easy, normal, expert or custom)	 
	 * @param ...customGrid	contains custom width and custom height percentage (for custom-form only)
	 */
	resize(difficulty = 'normal', ...customGrid){
	    let windowWidth = parseInt(window.innerWidth);
      	let windowHeight = Math.round(parseInt(window.innerHeight) - document.querySelector('#section-game').offsetTop);
   
	    switch (difficulty) {
	        case 'expert':
	            if(windowWidth > windowHeight){
	                this.width = Math.floor(windowWidth * 0.3);
	                this.height = Math.floor(windowHeight * 0.3);
	            }
	            else{
	                this.width = Math.floor(windowHeight * 0.3);
	                this.height = Math.floor(windowWidth * 0.3);
	            }
	            break; 
	        case 'normal':
	            if(windowWidth > windowHeight){
	                this.width = Math.floor(windowWidth * 0.5);
	                this.height = Math.floor(windowHeight * 0.5);
	            }
	            else{
	                this.width = Math.floor(windowHeight * 0.5);
	                this.height = Math.floor(windowWidth * 0.5);
	            }
	            break;
	        case 'easy':
	            if(windowWidth > windowHeight){
	                this.width = Math.floor(windowWidth * 0.6);
	                this.height = Math.floor(windowHeight * 0.6);
	            }
	            else{
	                this.width = Math.floor(windowWidth * 0.7);
	                this.height = Math.floor(windowHeight * 0.7);
	            }
	            break;
	        case 'custom':
	            this.width = Math.floor(windowWidth * (customGrid[0]/100));
	            this.height = Math.floor(windowHeight * (customGrid[1]/100));
	            break;
	    }

	    do{
	        if(this.width%20 != 0) this.width+=1;
	        if(this.height%20 != 0) this.height+=1;
	    }while(this.width%20 != 0 || this.height%20 != 0);

	    this.applyCSS();
	}

	/**
 	 * Apply CSS style to the grid object 
	 */
	applyCSS(){
		document.querySelector('#container').style.width = this.width + 'px';
	    document.querySelector('#container').style.height = this.height + 'px';
		document.querySelector('#container').style.backgroundColor = this.color;   
	}
}