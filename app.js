/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

  if (gamePlaying) {
    // Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
      // Player looses all points.
    if(dice === 6 && lastDice === 6) {
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = '0';
      nextPlayer();
      document.querySelector('.next-player').style.display = 'block';
    } // Update the round score IF the rolled number is NOT 1
    else if (dice !== 1) {
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      document.querySelector('.next-player').style.display = 'none';
    }
    else {
      nextPlayer();
      document.querySelector('.next-player').style.display = 'block';
    }
    lastDice = dice;
  }

});

document.querySelector('.btn-hold').addEventListener('click', function() {

  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
      document.querySelector('.btn-roll').style.display = 'none';
      document.querySelector('.btn-hold').style.display = 'none';
    }
    else {
      nextPlayer();
    }
  }

});

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // If activePlayer = 0 then set activePlayer to 1 else set activePlayer to 0.
  roundScore = 0;

  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init () {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.next-player').style.display = 'none';
  //document.querySelector('.two-sixes').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'block';
}

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row.
After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100.
(Hint: you can read that value with the .value property in JavaScript.
This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now.
The player looses his current score when one of them is a 1.
(Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

/*
//Setter
document.querySelector('#current-' + activePlayer).textContent = dice;

// Getter
var x = document.querySelector('#score-0').textContent;
console.log(x);
*/
