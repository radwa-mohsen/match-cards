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
const restartIcon = document.querySelector('.restart')
restartIcon.addEventListener('click',function(){
	for(let i=0 ; i<cards.length ; i++){
	cards[i].classList.remove('open','show','match');
}
openCards = [];
cardIndex = [];
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



 // * set up the event listener for a card. If a card is clicked:
 // *  - display the card's symbol (put this functionality in another function that you call from this one)
 // *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 // *  - if the list already has another card, check to see if the two cards match
 // *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 // *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 // *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 // *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 
// let openCards = [] ;
// for(let i = 0 ;i< cards.length ;i++){
// cards[i].addEventListener('click',function(){
	
// 	if(openCards.length!==0){
// 		if(openCards.length === 2){
			
// 			openCards[0].classList.remove('open','show');
// 			openCards[1].classList.remove('open','show');
// 			openCards = [];
//          }
         
//      	else if(cards[i].children[0] === openCards[0]){
// 			cards[i].classList.add('match');
// 			openCards[0].classList.remove('open','show');
// 			openCards[0].classList.add('match');
// 		}
// 		else if (openCards.length<=1){
// 			cards[i].classList.add('open','show');
// 	openCards.push(cards[i].children[0]);
// 		}
// 	}
// 	else{
// 		cards[i].classList.add('open','show');
// 	openCards.push(cards[i].children[0]);
// 	}
    

// })
// }

// let openCards = [] ;
// let cardIndex = [] ;
// let match = false;
// function holdCards(arrOfCards , index){
// 	openCards.push(cards[i].children[0].classList.item(1));
// 	cardIndex.push(i);
// }
// for(let i = 0 ;i< cards.length ;i++){
//     cards[i].addEventListener('click',function(){
// 	if(openCards.length!==0){
// 		if(openCards.length === 2){
// 			if(match === true){
// 				openCards = [];
// 				cardIndex = [];
//                cards[i].classList.add('open','show');
// 	           openCards.push(cards[i].children[0].classList.item(1));
// 	           cardIndex.push(i);
// 	           match = false;
// 	         }
// 	        else{

// 	        	cards[cardIndex[0]].classList.remove('open','show');
// 			    cards[cardIndex[1]].classList.remove('open','show');

// 			    openCards = [];
// 			    cardIndex = [] ;
//                cards[i].classList.add('open','show');
// 	           openCards.push(cards[i].children[0].classList.item(1));
// 	           cardIndex.push(i);
// 	        }
// 		}
// 		else if (openCards.length === 1){
// 			cards[i].classList.add('open','show');
// 			openCards.push(cards[i].children[0].classList.item(1));
// 			cardIndex.push(i);
// 			console.log(openCards[0]);
// 			console.log(openCards[1]);
//             if(openCards[0] === openCards[1]){
// 			cards[i].classList.add('match');
// 			cards[cardIndex[0]].classList.remove('open','show');
// 			cards[cardIndex[0]].classList.add('match');
//              match = true;
// 		   }

// 	    }
// 	 }
// 	else{
// 		cards[i].classList.add('open','show');
// 		openCards.push(cards[i].children[0].classList.item(1));
// 		cardIndex.push(i);
// 	}
// })
// }

let index = 0 ;
let openCards = [] ;
let cardIndex = [] ;
let match = false;
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
     match = true;
}

for(let i = 0 ;i< cards.length ;i++){

    cards[i].addEventListener('click',function(){
	if(openCards.length!==0){
		if(openCards.length === 2){
			if(match === true){
				openCards = [];
				cardIndex = [];
               openCard(cards,i);
	           holdCards(cards , i);
	           match = false;
	         }
	        else{

	        	cards[cardIndex[0]].classList.remove('open','show');
			    cards[cardIndex[1]].classList.remove('open','show');

			    openCards = [];
			    cardIndex = [] ;
               openCard(cards,i);
	           holdCards(cards , i);
	        }
		}
		else if (openCards.length === 1){
			openCard(cards,i);
			holdCards(cards , i);
            if(openCards[0] === openCards[1]){
            	matchedCardsLock(i);
		   }
	    }
	 }
	else{
		openCard(cards,i);
		holdCards(cards , i);
	}
})
}