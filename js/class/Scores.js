/**
 * Scores class - contains all scores done by the player
 * @author Cédric Dedenon
 * @version 2.0.0
 */
class Scores {
	/**
	 * Constructor
	 */
	constructor(){
		this.scores = [];
	}  

	/**
 	 * Add the new score in a array 
	 * @param difficulty	the difficulty mode
	 * @param time	the time done 
	 * @param score	the score obtained 
	 * @param grid	the grid of the game
	 * @param nbObstacles	the number of obstacles 
	 * @param wall	detect if the wall is activated 
	 */
	addScore(difficulty, time, score, grid, nbObstacles, wall){
        this.scores.push({
            difficulty : difficulty,
            time : time,
            score :  score,
            gridWidth: grid.getWidth,
            gridHeight: grid.getHeight,
            nbObstacles: nbObstacles,
            wall: wall,
        });
        this.createScore();
    }

	/**
 	 * Create table containing all scores done 
	 */
	createScore(){
	    let articles = ['expert', 'normal', 'easy', 'custom'];

		// Delete all <tr> html tag created previously
		let allTr = document.querySelectorAll('#section-score tbody tr');
        allTr.forEach((item) => {
        	item.parentNode.removeChild(item)
        });  

        // Get all scores of each difficulty mode and create <tr> and <td> tags
        articles.forEach((difficulty) => {
            let scoreByDifficulty = this.sortScoresByDifficulty(difficulty);
	        let length = scoreByDifficulty.length;
	        if(length != 0)
    			for(let i=0; i<length; i++) this.fillScoresTable(scoreByDifficulty[i]);	            		
        });	
	}

	/**
 	 * Fill tables for the selected mode of difficulty
	 * @param scores	all score obtained for a selected mode of difficulty 
	 */
 	fillScoresTable(scores = null){
		const {difficulty, time, score, gridWidth, gridHeight, nbObstacles, wall} = scores;
	
    	let nblines = document.querySelectorAll('#scores_' +  difficulty + ' tbody tr');   
    	let points = score > 1 ? 'points' : 'point';
		let tdLength = 4;
		if(difficulty === 'custom') tdLength = 5;

		let styleObstacles = 'red', styleWall = 'red';
		let obstaclesSymbol = '&cross;', wallSymbol = '&cross;';
		if(nbObstacles != 0){ obstaclesSymbol = '&check;  (' + nbObstacles + ') '; styleObstacles = 'green'; }
		if(wall === true){ wallSymbol = '&check;'; styleWall = 'green'; }

		let data = [score + ' ' + points, this.getStringTime(time), gridWidth + ' x ' + gridHeight + ' px', obstaclesSymbol, wallSymbol];

    	if(nblines.length < 10){	
    		let newtr = document.createElement('tr');
    		document.querySelector('table#scores_' +  difficulty + ' tbody').appendChild(newtr);

    		for(let i = 0, index = 0; i < tdLength; i++, index++){
    			let newtd = document.createElement('td');
    			newtd.innerHTML = data[i];
    			if (i==3){
    				newtd.style.color = styleObstacles;
    			}
		 		if(i == 4){
 					newtd.style.color = styleWall;
		 		}
    			document.querySelector('#scores_' +  difficulty + ' tbody tr:last-of-type').appendChild(newtd);
    		}

    		document.querySelector('#scores_' +  difficulty).style.display = 'table';
    		document.querySelector('#' + difficulty + ' div').innerHTML = '';
    	}
	}

	/**
 	 * Delete all scores
	 */
	deleteScores(){
		let length = this.scores.length;
		for(let i=0; i < length; i++){
			this.scores.pop();
		}

		let allTr = document.querySelectorAll('#section-score tbody tr');
        allTr.forEach((item) => {
        	item.parentNode.removeChild(item)
        });

    	let allDiv = document.querySelectorAll('#section-score article div');
    	allDiv.forEach((item) => {
        	item.innerHTML = 'Il n\'y a aucun record actuellement dans ce mode de jeu';
        });
        
        let allThead = document.querySelectorAll('#section-score table');
     	allThead.forEach((item) => {
        	item.style.display = 'none';
        });
	}

	/**
 	 * Display bestscores window, including the four mode of difficulty 
	 */
	 displayScores(){
     	let allArticle = document.querySelectorAll('#section-score article');
     	allArticle.forEach((item) => {
     		item.style.display = 'none';
     	});
     	document.querySelector('#normal').style.display = 'block';
     	document.querySelector('#section-score').style.display = 'block';
	}

	/**
 	 * Navigate between difficulties mode in the bestscores window
	 * @param evt	the target event
	 */
	displayScoresByDifficulty(evt){
		// Hide all articles
		let allArticle = document.querySelectorAll('#section-score article');
     	allArticle.forEach((item) => {
     		item.style.display = 'none';
     	});

		// Remove the 'actif' class of all articles
		let allLi = document.querySelectorAll('#section-score .onglets li');
     	allLi.forEach((item) => {
     		item.classList.remove('actif');
     	});

     	// Display only the article selected
		document.querySelector('#' + evt.target.getAttribute('data-click')).style.display = 'block'; 

		// Add the 'actif' class for the selected article
     	evt.target.classList.add('actif'); 
	}

	/**
 	 * Close bestscores window
	 */
	closeWindowScores(){
		// Hide all articles
		document.querySelector('#section-score').style.display = 'none';

		// Remove the 'actif' class of all articles
		let allLi = document.querySelectorAll('#section-score .onglets li');
     	allLi.forEach((item) => {
     		item.classList.remove('actif');
     	});

		// Add the 'actif' class for the 'normal' mode of difficulty
     	document.querySelector('li[data-click="normal"]').classList.add('actif');
	}

	/**
 	 * Sort all scores depending of the difficulty mode
	 * @param difficulty	the difficulty mode selected
 	 * @return scores if there are scores in the difficulty mode selected, else 0
	 */
    sortScoresByDifficulty(difficulty = 'normal'){
    	let scores = [];
        this.scores.forEach((value) => {
            if(value.difficulty === difficulty) scores.push(value);
        });
        if(scores != null) return this.sortScores(scores);
       	return 0;
	}

	/**
 	 * Sort scores. Firstly with the score obtained and secondly with the time done
	 * @param scores	scores to sort
  	 * @return scores all scores sorted
	 */
	sortScores(scores){
	    scores.sort((a,b) => {
	        return b.time - a.time;
	    });

	    scores.sort((a,b) => {
	        return a.score - b.score;
	    });
	    return scores.reverse();
	}

	/**
 	 * Return a string with the time done in minute(s) and second
	 * @param time	the time in seconds done
	 * @return String containing the time done
	 */
	getStringTime(time){
    	let second = 0, minute = 0;
		minute = Math.floor(time / 60);
		second = time % 60;
		if(minute === 0) return `${second} sec`; else return `${minute} min et ${second} sec`;
	}
}