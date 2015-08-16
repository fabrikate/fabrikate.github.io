// set up structure for DOM
var body = document.querySelectorAll('body')[0];
body.style.backgroundColor = '#B8B89F';
body.style.color = '#CDFF00';
body.style.fontSize = '42px'
body.style.textAlign = 'center';

var header = document.createElement('header');
header.innerHTML = 'Memory Game';
body.appendChild(header);

var section = document.createElement('section');
section.innerHTML = 'Matched Pairs are: ' + '<span id="matchedPairNum">0</span>';
header.appendChild(section);

var div = document.createElement('div');
div.setAttribute('id', 'gameBoard');
body.appendChild(div);
var gameBoardStyle = document.getElementById('gameBoard');
gameBoardStyle.style.background = '#B8B89F';
gameBoardStyle.style.border = '#FF3B77 1px solid';
gameBoardStyle.style.width = '600px';
gameBoardStyle.style.height = '540px';
gameBoardStyle.style.padding = '24px';
gameBoardStyle.style.margin = '0px auto';

var memoryCards = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];
var cardValues = [];
var cardIds = [];
var cardsFlipped = 0;

//createArray that shuffles
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function newBoard(){
	cardsFlipped = 0;
	var output = '';
    memoryCards.memory_tile_shuffle();
	for(var i = 0; i < memoryCards.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memoryCards[i]+'\')"></div>';
	}
	document.getElementById('gameBoard').innerHTML = output;
}
newBoard();
function styleDivs() {
	var div = document.querySelectorAll('div:not(#gameBoard)');
	for(var i = 0; i < div.length; i++){
		div[i].style.backgroundColor = "#52656B";
		div[i].style.border = 'solid 3px #FF3B77';
		div[i].style.width = '88px';
		div[i].style.height = '88px';
		div[i].style.padding = '20px';
		div[i].style.textAlign = 'center';
		div[i].style.fontSize = '64px';
		div[i].style.float = 'left';
	}
}
styleDivs();

var count = 0;
function updateScore() {
	count += 1
	var score = document.getElementById('matchedPairNum');
	score.innerHTML = count;
}

function memoryFlipTile(tile,val){
	if(tile.innerHTML == "" && cardValues.length < 2){
		tile.style.background = '#B6B6B4';
		tile.innerHTML = val;
		//push the value of card picked to array
		if(cardValues.length == 0){
			cardValues.push(val);
			cardIds.push(tile.id);
			// if their is already a card picked pushed the second card picked into the array
		} else if(cardValues.length == 1){
			cardValues.push(val);
			cardIds.push(tile.id);
			if(cardValues[0] == cardValues[1]){
				cardsFlipped += 2;
				updateScore();
				// Clear both arrays
				cardValues = [];
            	cardIds = [];
				// Check to see if the whole board is cleared
				if(cardsFlipped == memoryCards.length){
					var score = document.getElementById('matchedPairNum');
					count = 'Congratulations! You got them all';
					score.innerHTML = count;
					document.getElementById('gameBoard').innerHTML = "";
					newBoard();
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(cardIds[0]);
				    var tile_2 = document.getElementById(cardIds[1]);
				    tile_1.style.backgroundColor = "#52656B";
            	    tile_1.innerHTML = "";
				    tile_2.style.backgroundColor = "#52656B";
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    cardValues = [];
            	    cardIds = [];
				}
				setTimeout(flip2Back, 800);
			}
		}
	}
}

function resetButton() {
	var button = document.createElement('button');
	button.innerHTML = 'Reset Board'
	button.addEventListener('click', function() {
		newBoard();
	})
	gameBoardStyle.appendChild(button);

}
resetButton();


