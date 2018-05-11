/*
 * Create a list that holds all of your cards

 */

let ContentOfCards = document.querySelectorAll('.card i');
function toArray(obj) {
  var array = [];
  // iterate backwards ensuring that length is an UInt32
  for (var i = obj.length >>> 0; i--;) { 
    array[i] = obj[i];
  }
  return array;
}
ContentOfCards = toArray(ContentOfCards);
console.log(ContentOfCards);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below

 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 let cards = document.querySelectorAll('.card');

 cards = toArray(cards);
//restart icon configuration
function resetMoves(){
	moves = 0;
	const moveStatus = document.querySelector('.moves');
    moveStatus.textContent = moves ;
}

function resetStars(){
	numberOfStars = 3;
	let stars = document.querySelectorAll('.stars li');
	stars = toArray(stars);
	for (let i = 0; i < numberOfStars; i++) {
		stars[i].children[0].classList.remove('fa-star-o');
		stars[i].children[0].classList.add('fa-star');
	}
}
const restartIcon = document.querySelector('.restart')
restartIcon.addEventListener('click',function(){
	for(let i=0 ; i<cards.length ; i++){
	cards[i].classList.remove('open','show','match');
}
resetMoves();
resetStars();
shuffle(ContentOfCards);
openCards = [];
cardIndex = [];
clearInterval(intervalId);
totalSeconds = 0;
intervalId = setInterval(setTime, 1000);
});

//shuffle the cards
ContentOfCards = shuffle(ContentOfCards);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    for(let i=0 ; i<cards.length ; i++){
	cards[i].innerHTML = ContentOfCards[i].outerHTML;
}
    return array;
}



 // * set up the event listener for a card. If a card is clicked: done
 // *  - display the card's symbol (put this functionality in another function that you call from this one) done
 // *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) done
 // *  - if the list already has another card, check to see if the two cards match done
 // *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one) done
 // *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one) done
 // *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one) done
 // *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)

let index = 0 ;
let openCards = [] ;
let cardIndex = [] ;
let match = false;
let moves = 0 ;
let numberOfStars = 3 ;
let numberOfMatches = 0
//function to display the clicked card
function openCard(arrOfCards,index){
	cards[index].classList.add('open','show');
}
//function to hold the cards symbol and it's index
function holdCards(arrOfCards,index){
	openCards.push(cards[index].children[0].classList.item(1));
	cardIndex.push(index);
}
//function to lock the cards in open position in case of matching
function matchedCardsLock(index){
    cards[index].classList.add('match');
	cards[cardIndex[0]].classList.remove('open','show');
	cards[cardIndex[0]].classList.add('match');
     numberOfMatches++;
     if(numberOfMatches === 8){
     	console.log('congratulations');
     	clearInterval(intervalId);
     }
}
// function to hide not matched cards
function hideCards(){
    	cards[cardIndex[0]].classList.remove('open','show');
	    cards[cardIndex[1]].classList.remove('open','show');
}
// function to increment number of moves
function incrementMove(){
	moves++;
	const moveStatus = document.querySelector('.moves');
    moveStatus.textContent = moves ;
    changeStar();
}
function changeStar(){
	let stars = document.querySelectorAll('.fa-star');
    stars = toArray(stars);
	if(moves == 9){
	    stars[2].classList.remove('fa-star');
	    stars[2].classList.add('fa-star-o')
        numberOfStars--;
	}
	else if(moves == 17){
		stars[1].classList.remove('fa-star');
	    stars[1].classList.add('fa-star-o');
	    numberOfStars--;
	}

}

for(let i = 0 ;i< cards.length ;i++){
    cards[i].addEventListener('click',function(){
			if(openCards.length!==0){
				
				if (openCards.length === 1){
					
				    if(cardIndex[0]!= i) {
						openCard(cards,i);
						holdCards(cards , i);
						incrementMove();
			            if(openCards[0] === openCards[1]){
			            	matchedCardsLock(i);
			            	 openCards = [];
						    cardIndex = [] ;
					   }
					   else{
					   	console.log('hi')
					    	setTimeout(function hide() {
							   hideCards();
							   openCards = [];
						       cardIndex = [] ;
							},500); 
					   }
				    }
			    }
			 }
			else{
				openCard(cards,i);
				holdCards(cards , i);
			}
	
})
}

// make a timer source of code : https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var intervalId = setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}