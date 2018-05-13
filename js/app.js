/*
 * Create a list that holds all of your cards

 */


let ContentOfCards = document.querySelectorAll('.card i');
    ContentOfCards = toArray(ContentOfCards);
let cards = document.querySelectorAll('.card');
    cards = toArray(cards);
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below

 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 
 
const restartIcon = document.querySelector('.restart');

restartIcon.addEventListener('click',function(){
	reset();
});

//shuffle the cards
ContentOfCards = shuffle(ContentOfCards);

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
let numberOfMatches = 0 ;

// submit button to start new game
const newGame = document.querySelector('input');
newGame.addEventListener('click',function(){
	reset();
	document.querySelector('.congrat').style.cssText = 'display : none';
} );

// listen to each click on card
for(let i = 0 ;i< cards.length ;i++){
    cards[i].addEventListener('click',function(){
			if(openCards.length!==0){
				if (openCards.length === 1){
					// to make sure he didn't click the same card
				    if(cardIndex[0]!= i) {
						openCard(cards,i);
						holdCards(cards , i);
						incrementMove();
						//check if the clicked card matched with the open card or not
			            if(openCards[0] === openCards[1]){
			            	matchedCardsLock(i);
			            	 
					   }
					   else{
					   
					    	setTimeout(function hide() {
							   hideCards();
							   
							},500); 

							setTimeout(function removeAnimation(){
								cards[cardIndex[0]].classList.remove('animated','shake');
	                            cards[cardIndex[1]].classList.remove('animated','shake');
	                            openCards = [];
						       cardIndex = [] ;
							},1500);
					   }
				    }
			    }
			 }
			else{
				openCard(cards,i);
				holdCards(cards , i);
			}
	
	});
}



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
//function to reset everything
function reset(){
	for(let i=0 ; i<cards.length ; i++){
		cards[i].classList.remove('open','show','match');
	}
	numberOfMatches=0;
	resetMoves();
	resetStars();
	shuffle(ContentOfCards);
	openCards = [];
	cardIndex = [];
	clearInterval(intervalId);
	totalSeconds = 0;
	intervalId = setInterval(setTime, 1000);
}
//function to reset the number of moves to zero
function resetMoves(){
	moves = 0;
	const moveStatus = document.querySelector('.moves');
    moveStatus.textContent = moves ;
}
//function to reset the number of given stars to 3
function resetStars(){
	numberOfStars = 3;
	let stars = document.querySelectorAll('.stars li');
	stars = toArray(stars);
	for (let i = 0; i < numberOfStars; i++) {
		stars[i].children[0].classList.remove('fa-star-o');
		stars[i].children[0].classList.add('fa-star');
	}
}
//function to convert node list to array and token from this link 
 //:https://stackoverflow.com/questions/3836582/how-to-translate-prototypes-a-function-into-jquery/3836622#3836622
function toArray(obj) {
  var array = [];
  // iterate backwards ensuring that length is an UInt32
  for (var i = obj.length >>> 0; i--;) { 
    array[i] = obj[i];
  }
  return array;
}
//function to display the clicked card
function openCard(arrOfCards,index){
	cards[index].classList.add('open','show','animated','flipInY');
}
//function to hold the cards symbol and it's index
function holdCards(arrOfCards,index){
	openCards.push(cards[index].children[0].classList.item(1));
	cardIndex.push(index);
}
//function to lock the cards in open position in case of matching
function matchedCardsLock(index){
    cards[index].classList.remove('open','show','flipInY');
    cards[index].classList.add('match','animated','rubberBand');
	cards[cardIndex[0]].classList.remove('open','show','flipInY');
	cards[cardIndex[0]].classList.add('match','animated','rubberBand');
	setTimeout(function(){
		    cards[index].classList.remove('animated','rubberBand');
	        cards[cardIndex[0]].classList.remove('animated','rubberBand');
	        openCards = [];
			cardIndex = [];
	},700);
     numberOfMatches++;
     //check if he finished the game or not
     if(numberOfMatches === 8){
     	clearInterval(intervalId);
     	document.querySelector('.details').textContent = 'with ' + moves + ' moves and ' + numberOfStars + ' star in ' + totalSeconds + ' seconds';
     	document.querySelector('.congrat').style.cssText = 'display : block';
     }
}
// function to hide not matched cards
function hideCards(){
	    //animation add for wrong match
	    cards[cardIndex[0]].classList.remove('flipInY');
	    cards[cardIndex[1]].classList.remove('flipInY');
	    cards[cardIndex[0]].classList.add('shake');
	    cards[cardIndex[1]].classList.add('shake');
	    cards[cardIndex[0]].setAttribute('style', 'background-color: red;');
	    cards[cardIndex[1]].setAttribute('style', 'background-color: red;');
        //remove animation classes
        setTimeout(function (){
        	cards[cardIndex[0]].classList.remove('open','show');
	   cards[cardIndex[1]].classList.remove('open','show');
	   	    cards[cardIndex[0]].removeAttribute('style');
	    cards[cardIndex[1]].removeAttribute('style');
	    },800);
       
}
// function to increment number of moves
function incrementMove(){
	moves++;
	const moveStatus = document.querySelector('.moves');
    moveStatus.textContent = moves ;
    changeStar();
}
//function to decrement the number of stars depends on the number of moves
function changeStar(){
	let stars = document.querySelectorAll('.fa-star');
    stars = toArray(stars);
    // keep 3 stars tii make 9 moves
	if(moves == 9){
	    stars[2].classList.remove('fa-star');
	    stars[2].classList.add('fa-star-o')
        numberOfStars--;
	}
	//keep 2 stars till make 17 moves
	else if(moves == 17){
		stars[1].classList.remove('fa-star');
	    stars[1].classList.add('fa-star-o');
	    numberOfStars--;
	}

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