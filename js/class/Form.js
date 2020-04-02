/**
 * Form class - create a form to modify generic parameters
 * @author Cédric Dedenon
 * @version 2.0.0
 */
class Form{
	/**
	 * Constructor
	 */ 
	constructor(name = 'default-form'){
		this.name = name;
	}

	/**
	 * Getter of the name property
   	 * @return String the name of the form
	 */ 
	get getName(){
		return this.name;
	}

	/**
	 * Setter of the name property
 	 * @param name	the new name of the form (default-form or custom-form)
	 */ 
	set setName(name){
		this.name = name;
	}

	/**
 	 * Display the form
 	 * @param name	the form to display
	 */
	displayForm(name){
		document.querySelector('#section-form').style.display = 'block';
		let thisNameClass = document.querySelectorAll('.' + name);
		thisNameClass.forEach((item) => {
			item.style.display = 'flex';
		});
		document.querySelector('li[data-click="'+ name + '"]').classList.add('actif');

		let obstaclesId = document.querySelector('#obstacles-form');
		if(name === "custom-form") obstaclesId.classList.add('obstacles-custom');
		else obstaclesId.classList.remove('obstacles-custom');		
	}

	/**
 	 * Close the option window
	 */
	closeWindowForm(){
		document.querySelector('#section-form').style.display = 'none';
	}

	/**
 	 * Hide the form
 	 * @param name	the form to display
	 */
	hideForm(name){
		document.querySelector('li[data-click=' + name + ']').classList.remove('actif');
		let thisNameClass = document.querySelectorAll('.' + name);
		thisNameClass.forEach((item) => {
			item.style.display = 'none';
		});
	}

	/**
 	 * Activate or desactivate the number'obstacles input of the custom form if the player has chosen to add them
	 */
	customFormNbObstacles(){
		if(document.querySelector('input[name="obstacles"]:checked').value === 'true')
			document.querySelector('#nb_obstacles').disabled = false;
		else document.querySelector('#nb_obstacles').setAttribute('disabled', true);
	}

	/**
 	 * Return all parameters of the form
	 * @param name	the name of the form
	 * @return Object with all data from the form
	 */
	getAllParameters(name){
		let difficulty = document.querySelector('#difficulty').value;
		let nbObstacles = document.querySelector('#nb_obstacles').value;
		let wall = document.querySelector('input[name="wall"]:checked').value;

		if(name === "custom-form") difficulty = 'custom';
		if(name === "default-form") wall = 'false';
		if (!document.querySelector('#obstacles-form').classList.contains('obstacles-custom')) nbObstacles = 0;

		let params = {
			difficulty: difficulty,
			customWidth: document.querySelector('#grid_width').value,
	        customHeight: document.querySelector('#grid_height').value,
	        specialFood: document.querySelector('input[name="special-food"]:checked').value,
	        obstacles: document.querySelector('input[name="obstacles"]:checked').value,
	    	nbObstacles: nbObstacles,
			wall: wall,
			animationTime: document.querySelector('#animation_time').value,
			bodySnakeColor: document.querySelector('#snake_color').value,
	    	foodColor: document.querySelector('#food_color').value,
	    	obstacleColor: document.querySelector('#obstacles_color').value,
	    	headSnakeColor: document.querySelector('#head_color').value,
	    	gridColor: document.querySelector('#grid_color').value,
	    	themeColor: document.querySelector('#theme_color').value
		};			
		return params;
	}
}