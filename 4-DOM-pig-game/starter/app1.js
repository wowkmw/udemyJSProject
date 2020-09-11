//let dice = Math.floor(Math.random()*6) + 1; 
//let dice = Math.ceil(Math.random()*6); // same result as above
//document.querySelector("#current-" + activePlayer).textContent = dice;
//document.querySelector("#current-" + activePlayer).innerHTML = '<em><b>'+dice+'</b></em>';
//let x = document.querySelector('#score-0').textContent;
let scores, roundScore, activePlayer, gamePlaying, diceLast, winScore;
initialize();

document.getElementById('setScore').addEventListener('click', function(){
    winScore = document.getElementById('myNumber').value;
});

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //get a random number for each dice
        let dice = Math.ceil(Math.random()*6);
        //display result
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        //update score if score > 1
        if(dice === 6 && diceLast === 6){//if a player throw two six consecutively
            alert('You rolled two 6s in a roll, so you lose everything');
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).innerHTML = '0';
            nextPlayer();
            //diceDOM.style.display = 'none';
        }
        else if(dice !== 1){
            diceLast = dice;
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }else{
            alert('You rolled a \'one\'');
            nextPlayer();
            //diceDOM.style.display = 'none';
        }    
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //add current score to global score
        scores[activePlayer] += roundScore;
        //update webUI
        document.getElementById('score-' + activePlayer).innerHTML = scores[activePlayer];
        
        //check if player won
        if(scores[activePlayer] >= winScore){
            document.getElementById('name-' + activePlayer).innerHTML = '<b>Winner</b>';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            alert('Player ' + (activePlayer + 1) + ' has won the game!');
            gamePlaying = false;
            //document.querySelector('.btn-hold').style.display = 'none';
            //document.querySelector('.btn-roll').style.display = 'none';
        }else{
            nextPlayer();
            document.querySelector('.dice').style.display = 'none';
        } 
    }
});

document.querySelector('.btn-new').addEventListener('click', initialize);

function nextPlayer(){
    //activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    if (activePlayer === 1) activePlayer = 0; else activePlayer = 1;
    roundScore = 0;
    diceLast = null;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function initialize(){
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    winScore = 100;
    diceLast = null;
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    gamePlaying = true;
}