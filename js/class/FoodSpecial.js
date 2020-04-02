/**
 * Special Food class
 * @author Cédric Dedenon
 * @version 2.0.0
 */
class FoodSpecial extends Food {
	/**
	 * Constructor
	 */ 
	constructor(color){
		super(color);
	}

	/**
 	 * Redefine applyCSS method for the special food
	 */
	applyCSS(){
 		document.querySelector('#food-special').style.display = 'block';
	    document.querySelector('#food-special').style.left = this.x + 'px';
	    document.querySelector('#food-special').style.top = this.y + 'px';
		document.querySelector('#food-special').style.backgroundColor = this.color;        
	}

	/**
 	 * Hide the special food. Set x and y coordinates with non important values
	 */
	hideFood(){
		document.querySelector('#food-special').style.display = 'none';
		this.x = -100;
		this.y = -100;
	}
}