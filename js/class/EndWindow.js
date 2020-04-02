/**
 * WindowEndGame class - create the end game window
 * @author Cédric Dedenon
 * @version 2.0.0
 */
class EndWindow {
	/**
 	 * Display the end window (when the player lost the game)
	 * @param score	the score obtained
 	 * @param time	the time done 
 	 * @param difficulty	the difficulty mode selected
 	 * @param allScores	array of all scores done
	 */
    displayWindowEndGame(score, time, difficulty, allScores){
 	   	if(score === 0) document.querySelector('#endgame p').innerHTML = 'Vous n\'avez pas réussi à faire un seul point. DOMMAGE !';
	    else{
	    	let scores = allScores.sortScoresByDifficulty(difficulty);
            let bestScore = parseInt(scores[0].score);
            let bestTime = parseInt(scores[0].time);

		    if(difficulty === 'easy') difficulty='Facile';
		    if(difficulty === 'custom') difficulty='Personnalisé';
	    	difficulty = difficulty.toUpperCase();

	        document.querySelector('#endgame p').innerHTML = `[${difficulty}]: Votre score est de ${score} ${score > 1 ? 'points' : 'point'} en ${allScores.getStringTime(time)}`;
            if((score == bestScore && time <= bestTime) || score > bestScore)
                document.querySelector('#newrecord img').style.display = 'flex';
	    }
	    document.querySelector('#endgame').style.display = 'block';
	}

	/**
 	 * Close end game window
	 */
	closeWindowEndGame(){
		document.querySelector('#endgame').style.display = 'none';
		document.querySelector('#newrecord img').style.display = 'none';
	}
}